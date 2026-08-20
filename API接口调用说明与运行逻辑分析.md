# API 接口调用说明与运行逻辑分析

## 总览

| 页面 | 数据来源 | 接口调用 | 渲染模式 |
|------|---------|---------|---------|
| 产品列表页 | 静态数据 | 无 | SSG |
| 产品分类列表页 | NocoBase API | 2 个接口 | SSG + 动态路由 |
| 产品详情页 | NocoBase API | 2 个接口 | SSG (getStaticPaths) |
| 博客列表页 | 本地静态数据 | 无 | SSG |
| 博客详情页 | 本地静态数据 | 无 | SSG (getStaticPaths) |

---

## 1. 产品列表页 / Products Page

**文件**: `src/pages/products.astro`

**数据来源**: 完全静态，无 API 调用。

**运行逻辑**:
- 页面内容（Hero、FAQ、产品展示等）均为硬编码在 `.astro` 文件中
- 7 个产品图片通过 Astro 的 `import` 从 `src/assets/` 直接导入
- 产品缩略图从 `public/assets/product/` 以静态路径引用
- FAQ 数据为组件内硬编码的数组

**关键代码**:
```
// 产品主图 - 静态导入
import pvcFilmImg from '@assets/pvc-decorative-film.jpg';
import lvtFlooringImg from '@assets/lvt-flooring.jpg';
// ...

// 产品缩略图 - 静态路径
const productImagePaths = [
  '/assets/product/product (1).jpg',
  // ...
];
```

---

## 2. 产品分类列表页 / Product Category Page

分为两类：

### 2.1 静态分类页（4 个主要品类）

| 文件 | 对应品类 |
|------|---------|
| `src/pages/products/pvc-decorative-film.astro` | PVC Decorative Film |
| `src/pages/products/lvt-flooring.astro` | Peel and Stick Vinyl Flooring |
| `src/pages/products/pvc_wall_panel.astro` | PVC Wall Panel |
| `src/pages/products/interior-self-adhesive-film.astro` | Self-Adhesive Decorative Film |

### 2.2 动态分类页（3 个品类）

**文件**: `src/pages/products/[categorySlug].astro`

覆盖品类: Self-adhesive Foam Wallpaper Roll, 3D PVC Wall Panel, Peel & Stick Wallpapers

### 接口调用（两种分类页共用）

均通过 `src/utils/nocobaseCategories.ts` 调用 **2 个 NocoBase API**:

#### 接口 1: 获取产品分类

```
GET {NOCObase_API_BASE_URL}/api/deco_category:list?page=1&pageSize=100&appends=Category_Img
```

| 参数 | 说明 |
|------|------|
| `page=1` | 第 1 页 |
| `pageSize=100` | 每页 100 条 |
| `appends=Category_Img` | 关联加载分类图片 |

**请求头**:
```
Authorization: Bearer {NOCObase_API_TOKEN}
Accept: application/json
```

**超时**: 8 秒 (`AbortSignal.timeout(8000)`)

**响应处理** (`fetchProductCategories`, L180-210):
1. 过滤 `is_enabled` = 启用 的分类
2. 过滤必须有 `id`, `category_name_EN`, `category_slug`
3. 通过 `LOCAL_CATEGORY_ROUTES` 映射 slug 到实际路径:
   ```
   'pvc-wall-panel' → 'pvc_wall_panel'
   'self-adhesive-foam-wall-roll' → 'self-adhesive-foam-wall-panels'
   '3d-pvc-wall-panel' → '3d-pvc-wall-panels'
   'peel-stick-wallpapers' → 'peel-and-stick-wallpapers'
   ```
4. 输出 `ProductCategory[]` 数组

#### 接口 2: 获取分类下产品

```
GET {NOCObase_API_BASE_URL}/api/deco_product:list?page={N}&pageSize=100&filter[deco_category_id][$eq]={categoryId}&filter[web_active][$eq]=上架&appends=main_image_id,related_img,pattern_collection_id
```

| 参数 | 说明 |
|------|------|
| `page` | 页码（自动遍历所有页） |
| `pageSize=100` | 每页 100 条 |
| `filter[deco_category_id][$eq]` | 按分类 ID 过滤 |
| `filter[web_active][$eq]` | 只取上架产品 |
| `appends` | 关联加载主图、相关图片、花型系列 |

**响应处理** (`fetchProductsByCategory`, L238-305):
1. 先请求第 1 页，获取 `meta.totalPage`
2. 并发请求剩余所有页 (`Promise.all`)
3. 过滤 `web_active` = 上架 的产品
4. 通过 `filterMatchingRelatedImages` 按产品编码筛选关联图片
5. 生成产品 slug: `{productCode}-{id}` (小写、去特殊字符)
6. 输出 `ProductListItem[]` 数组

### 缓存机制

| 缓存级别 | 策略 | TTL |
|---------|------|-----|
| 分类缓存 | 内存单例 + 去重请求 | 60 秒 |
| 产品缓存 | 按 categoryId 分桶 | 60 秒 |

- 并发请求去重：同一请求进行中时，后续调用共享同一个 Promise
- 降级策略：API 失败时返回上一次缓存数据，不阻断页面渲染

### 数据流图

```
NocoBase API
    │
    ├─ /api/deco_category:list ──→ getProductCategories()
    │                                    │
    │                              ProductCategory[]
    │                                    │
    │                              ┌─────┴─────┐
    │                              │ 静态分类页  │  动态分类页
    │                              │ (4个文件)  │  [categorySlug].astro
    │                              └─────┬─────┘
    │                                    │
    └─ /api/deco_product:list ──→ getProductsByCategory(categoryId)
                                        │
                                  ProductListItem[]
                                        │
                                  ┌──────┴──────┐
                                  │ ProductGrid  │ (React 组件)
                                  │ 产品卡片渲染  │
                                  └─────────────┘
```

---

## 3. 产品详情页 / Product Detail Page

**文件**: `src/pages/products/[categorySlug]/[productSlug].astro`

**渲染模式**: SSG — 通过 `getStaticPaths` 在构建时生成所有产品详情页。

### 运行逻辑

```typescript
// L7-21
export const getStaticPaths = async () => {
  const categories = await getProductCategories();          // ① 获取所有分类
  const paths = await Promise.all(
    categories.map(async (category) => {
      const products = await getProductsByCategory(category.id); // ② 获取每个分类的产品
      return products.map((product) => ({
        params: {
          categorySlug: getCategorySlug(category.href),
          productSlug: product.slug,                        // ③ 生成产品 slug
        },
        props: { category, product },
      }));
    })
  );
  return paths.flat(); // ④ 展平所有路径
};
```

### 页面渲染数据

从 `Astro.props` 获取 `category` 和 `product` 对象，渲染：
- 产品主图 + 缩略图库
- 产品详情表（product code, supply code, pattern type, color family, collection）
- 设计关键词标签
- 产品描述 + 补充说明
- 结构化数据 (Product Schema)

### 路由结构

```
/products/{categorySlug}/{productSlug}
例如: /products/pvc-decorative-film/wood-grain-oak-42
```

---

## 4. 博客列表页 / Blog List Page

**文件**: `src/pages/blog.astro`

**数据来源**: `src/data/blogPosts.ts` — 本地静态 TypeScript 数组。

**运行逻辑**:
```
import { blogPosts } from '@/data/blogPosts';

const postsPerPage = 6;
const posts = blogPosts.slice(0, postsPerPage); // 取前 6 篇
```

- 无 API 调用
- 分页在客户端通过 `BlogListPage` 组件处理
- SEO 结构化数据 (ItemList Schema) 在服务端生成

---

## 5. 博客详情页 / Blog Detail Page

**文件**: `src/pages/blog/[slug].astro`

**数据来源**: 同上 `src/data/blogPosts.ts`。

**运行逻辑**:
```typescript
export const getStaticPaths = () => {
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
};
```

- 构建时遍历所有博客文章，为每篇生成静态页面
- 通过 `getRelatedBlogPosts()` 获取相关文章（同分类的其他文章）
- 渲染文章标题、封面图、元信息、内容、相关文章

---

## 6. 环境变量

| 变量名 | 用途 | 必需 |
|--------|------|------|
| `NOCObase_API_BASE_URL` | NocoBase API 地址 | 是 |
| `NOCObase_API_TOKEN` | API 认证 Token | 是 |

**读取方式** (`getEnvValue`, L98-104):
```
import.meta.env.NOCObase_API_BASE_URL  // Astro 环境变量
process.env.NOCObase_API_BASE_URL      // Node.js 环境变量（降级）
```

---

## 7. 核心工具文件

| 文件 | 职责 |
|------|------|
| `src/utils/nocobaseCategories.ts` | NocoBase API 封装、缓存、数据转换 |
| `src/utils/productCategorySeo.ts` | 产品分类 SEO Schema 生成 |
| `src/data/blogPosts.ts` | 博客文章静态数据 |
| `src/components/react/ProductGrid.tsx` | 产品网格 React 组件 |