# DecoSupplier 方案 A：基于现有网站的文字替换修改方案（完整版）

> **目标：** 提升 Geo-targeted SEO（南美、中东、中亚、东南亚市场）+ 增强海外采购商信任与询盘转化
> **文档版本：** v2.1 | 2026-08-13
> **核心关键词：** PVC decorative film manufacturer, LVT flooring supplier, PVC wall panel factory, OEM/ODM surface materials, home décor supplier wholesale, factory direct decorative films
> **说明：** 方案 A 保持现有页面结构和布局不变，仅针对每处文案进行 SEO 优化和转化导向的替换，并配合图片优化建议。每个模块包含：文字替换表（含原文本翻译）、配套图片建议。

---

## A.1 全局配置修改

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| Global | Title | `src/config/site.ts` | DecoSupplier - PVC Decorative Film, LVT Flooring & Wall Panel Manufacturer | DecoSupplier——PVC装饰膜、LVT地板和墙板制造商 | DecoSupplier - PVC Decorative Film, LVT Flooring & PVC Wall Panel Factory | 全球标题：PVC装饰膜、LVT地板、PVC墙板工厂 | 增加"Factory"强化工厂直供定位；"PVC Wall Panel"替代"Wall Panel"更精准覆盖搜索词 |
| Global | Description | `src/config/site.ts` | Factory-direct manufacturer of PVC decorative films, LVT flooring, PVC wall panels, and self-adhesive surface materials. ISO-certified, OEM/ODM, 1000+ patterns in stock. Export to 30+ countries. | 工厂直供PVC装饰膜、LVT地板、PVC墙板和自粘表面材料制造商。ISO认证，支持OEM/ODM，1000+花型现货，出口30+国家。 | Factory-direct PVC decorative film, LVT flooring & PVC wall panel manufacturer from China. ISO 9001 certified, 52 patents, 1000+ in-stock patterns, OEM/ODM supported. Free samples & factory quotes. Serving 30+ countries. | 中国工厂直供PVC装饰膜、LVT地板、PVC墙板，ISO 9001认证，1000+花型现货，支持OEM/ODM，免费样品与报价，服务30+国家 | 加入"Free samples & factory quotes"直接触发CTA意图；"from China"符合采购商搜索习惯；缩短描述提升点击率 |

> 本节无图片需求。

---

## A.2 首页 — PremiumHero（主视觉区）

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| HomeHero | Capsule | `src/components/home/PremiumHero.astro` | Factory Manufacturing & Surface Materials | 工厂制造与表面材料 | China Factory-Direct Decorative Materials | 中国工厂直供装饰材料 | 更简洁有力，"China"锚定产地优势，"Factory-Direct"强化核心卖点 |
| HomeHero | Title_Line1 | `src/components/home/PremiumHero.astro` | Manufacturing decorative surfaces for | 为以下提供装饰表面制造 | Your Trusted Source for Premium | 您的可靠高品质材料源头 | 从"我们在制造"转变为"你是受益者"，以采购商视角切入 |
| HomeHero | Title_Line2 | `src/components/home/PremiumHero.astro` | real-world applications | 实际应用场景 | Decorative Surface Materials | 装饰表面材料 | 更直接的品类描述，覆盖搜索词 |
| HomeHero | Subtitle | `src/components/home/PremiumHero.astro` | From pattern development and printing to coating, embossing, and finishing — we manufacture PVC decorative films, LVT flooring, wall panels, and related surface materials for global projects. | 从花型开发、印刷到涂布、压花和表面处理——我们为全球项目制造PVC装饰膜、LVT地板、墙板及相关表面材料。 | One factory. 7 product lines. 1000+ patterns. Factory-direct pricing for distributors, contractors, and brands worldwide. | 一家工厂，七大产品线，1000+花型。从PVC装饰膜到LVT地板和PVC墙板——为全球经销商、承包商和品牌商提供稳定品质、有竞争力的工厂价格和一站式OEM/ODM服务。 | 突出"one factory, seven lines"数字记忆点；明确目标客户（distributors, contractors, brands）；"competitive factory pricing"直击采购商核心诉求 |
| HomeHero | Button_Primary | `src/components/home/PremiumHero.astro` | Request Product Info | 索取产品信息 | Get Free Samples & Factory Quote | 获取免费样品与工厂报价 | "Free"是强转化词；"Samples + Quote"覆盖两级意向（了解→询价） |
| HomeHero | Button_Secondary | `src/components/home/PremiumHero.astro` | View Product Range | 查看产品系列 | Explore 7 Product Lines | 探索七大产品线 | 数字增强确定性，降低浏览决策成本 |
| HomeHero | Stat_1 | `src/components/home/PremiumHero.astro` | 15+ Years Experience | 15+年经验 | 15+ / Years Manufacturing | 15+年制造经验 | "Manufacturing"比"Experience"更有工厂感 |
| HomeHero | Stat_2 | `src/components/home/PremiumHero.astro` | 1000+ Patterns Available | 1000+可用花型 | 1000+ / In-Stock Patterns | 1000+现货花型 | "In-Stock"暗示快速交付，解决采购商库存焦虑 |
| HomeHero | Stat_3 | `src/components/home/PremiumHero.astro` | 99.9% / Quality Rate | 99.9%品质合格率 | ISO 9001 / Certified Factory | ISO 9001认证工厂 | 用认证替代模糊质量指标，更可信 |
| HomeHero | Stat_4 | `src/components/home/PremiumHero.astro` | 200+ Countries Served | 200+服务国家 | 50,000+ m² / Production Base | 5万+平米生产基地 | 与 AnimatedStats 保持一致，真实数据更有说服力 |

### 配套图片

#### Hero 背景图

| 属性 | 内容 |
|------|------|
| **图片内容** | 工厂车间实景：高清印刷生产线正在运转，PVC 薄膜从机器中卷出，展示木纹/大理石纹理效果。前景微模糊，突出机器运转的金属质感和薄膜表面的纹理细节。灯光温暖，体现现代化工厂的专业感。 |
| **Alt 文本** | PVC decorative film production line in DecoSupplier factory — high-speed gravure printing with wood grain and marble patterns |
| **文件名** | `hero-factory-production-line.webp` |
| **竞品参考** | DILON 首页 Hero 使用工厂实景图而非产品图，强调"工厂直供"身份；Yunjia Decor 展示数字展厅 + 生产线场景。建议仿效 DILON 的"工厂场景+产品纹理"双重信息传递方式。 |
| **尺寸建议** | 1920×1080px，移动端通过 CSS object-cover 自动裁剪适配 |

---

## A.3 首页 — Product_all（产品展示区）

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| HomeProducts | Capsule | `src/components/home/Product_all.astro` | Our Products | 我们的产品 | 无需替换 | 无需替换 | 胶囊标签已保持简洁，无需修改 |
| HomeProducts | Title | `src/components/home/Product_all.astro` | Premium Surface Solutions | 优质表面解决方案 | 7 Product Lines, One Factory | 七大产品线，一家工厂 | 突出"一站式采购"优势，数字更有记忆点 |
| HomeProducts | Subtitle | `src/components/home/Product_all.astro` | DecoSupplier offers a comprehensive range of decorative surface materials — from resilient flooring and wall panels to self-adhesive films and wallpapers — engineered for quality, design, and durability. | DecoSupplier 提供全面的装饰表面材料——从弹性地板和墙板到自粘膜和墙纸——以品质、设计和耐久性为工程标准。 | From furniture films to flooring and wall panels — all from one factory. OEM/ODM available. Low MOQ. | 从家具贴面PVC装饰膜到商用LVT地板，再到快装PVC墙板——一家工厂满足所有需求。全系产品支持OEM/ODM定制，低起订量。 | 按应用场景分类，让采购商快速对号入座；"low MOQ"降低首次合作门槛 |
| HomeProducts | CTA | `src/components/home/Product_all.astro` | Explore All Products | 探索全部产品 | View All Products & Get Samples | 查看全部产品 & 获取样品 | 合并浏览+行动，缩短转化路径 |

### 配套图片

#### 产品卡片图片（7 张）

| 产品线 | 图片内容 | Alt 文本 | 文件名 |
|--------|---------|---------|--------|
| PVC Decorative Film | 一卷木纹 PVC 薄膜展开，表面纹理特写，旁边放置家具板材包覆效果对比 | PVC decorative film roll with wood grain texture for furniture wrapping and lamination — factory direct from China | `product-pvc-decorative-film.webp` |
| LVT Flooring | LVT 地板铺设效果实景（商业空间），展示大理石纹理和锁扣结构细节 | LVT luxury vinyl tile flooring with marble texture — click-lock system, commercial grade, factory price | `product-lvt-flooring.webp` |
| PVC Wall Panel | PVC 墙板安装效果实景（浴室/厨房），展示防水性能和快速安装 | PVC rigid core wall panel installed in bathroom — waterproof, click-lock, DIY-friendly | `product-pvc-wall-panel.webp` |
| Interior Refinishing Film | 自粘膜翻新效果对比（旧橱柜 → 翻新后），展示 DIY 操作场景 | Self-adhesive interior refinishing film for kitchen cabinet makeover — peel and stick, removable | `product-interior-refinishing-film.webp` |
| Self-Adhesive Foam Wall Panel | 泡沫墙板安装效果（卧室/客厅），展示 3D 纹理和隔音效果 | Self-adhesive foam wall panel with 3D texture — soundproof, thermal insulation, peel and stick | `product-foam-wall-panel.webp` |
| 3D PVC Wall Panel | 3D 墙板效果特写，展示立体纹理和光影效果 | 3D PVC wall panel with embossed geometric texture — modern interior wall decoration | `product-3d-pvc-wall-panel.webp` |
| Peel & Stick Wallpaper | 自粘墙纸铺贴效果（卧室/客厅），展示花色和施工便利性 | Peel and stick wallpaper with floral pattern — removable, DIY home decoration | `product-peel-stick-wallpaper.webp` |

> **竞品参考：** KL Decorative 产品卡片图片展示"产品+应用场景"二合一，既有产品特写又有使用效果，优于单纯白底产品图。Yunjia Decor 注重场景化展示。建议每张产品图同时呈现产品纹理+应用场景效果。

---

## A.4 首页 — Trust_data（信任数据区）

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| HomeTrust | Capsule | `src/components/home/Trust_data.astro` | Production Strength | 生产能力 | Why Global Buyers Choose Us | 全球采购商选择我们的原因 | 从"我们有什么"转变为"你得到什么" |
| HomeTrust | Title | `src/components/home/Trust_data.astro` | Capacity and Consistency | 产能与一致性 | 15 Years. 50,000+ m². 1000+ Patterns. | 15年，5万平米，1000+花型 | 数字展示比抽象标题更有冲击力 |
| HomeTrust | Subtitle | `src/components/home/Trust_data.astro` | Our factory combines technical experience, production capacity, and quality control to support dependable manufacturing for decorative surface materials. | 我们的工厂融合了技术经验、生产能力和质量控制，为装饰表面材料提供可靠的制造支持。 | Every roll shipped from our factory is backed by ISO-certified processes, three-tier quality inspection, and a dedicated account team — no middlemen, no surprises. | 每一卷出厂产品都经过ISO认证流程、三级质检和专属客户团队保障——无中间商，无意外。 | 采购商最怕"不确定性"，"no surprises"直击痛点 |
| HomeTrust | Item1_Desc | `src/components/home/Trust_data.astro` | Manufacturing and export experience in surface decoration materials | 表面装饰材料的制造和出口经验 | Deep expertise in PVC film formulation, printing, and embossing — serving global furniture and flooring industries | 深耕PVC薄膜配方、印刷和压花工艺，服务全球家具和地板行业 | 更具体地描述专业领域而非泛泛而谈 |
| HomeTrust | Item2_Feature3 | `src/components/home/Trust_data.astro` | Custom design support | 定制设计支持 | OEM/ODM pattern development | OEM/ODM花型开发 | 精确描述定制能力 |
| HomeTrust | Item3_Title | `src/components/home/Trust_data.astro` | 100% Factory-Direct | 100%工厂直供 | Factory-Direct Pricing | 工厂直供价格 | 简化，利落 |
| HomeTrust | Item3_Desc | `src/components/home/Trust_data.astro` | No middlemen – full cost and quality control from source | 无中间商——从源头全面控制成本与品质 | Eliminate 20-40% intermediary markup. You communicate directly with our production team, not trading agents. | 消除20-40%中间商加价。您直接与生产团队沟通，而非贸易代理商。 | 量化中间商成本，增强"工厂直供"的说服力 |
| HomeTrust | Item4_Title | `src/components/home/Trust_data.astro` | 50,000+ m² | 5万+平米 | 50,000+ m² Production Base | 5万+平米生产基地 | 增加"Production Base"语境 |
| HomeTrust | Item5_Title | `src/components/home/Trust_data.astro` | 200+ Countries | 200+国家 | 30+ Export Markets | 30+出口市场 | 修正为真实数据，与 AnimatedStats 保持一致 |
| HomeTrust | Item5_Desc | `src/components/home/Trust_data.astro` | Exporting to over 200 countries, serving global brands and contractors | 出口至200+国家，服务全球品牌和承包商 | Trusted by distributors and contractors across Middle East, Central Asia, Southeast Asia, South America, Russia, Ukraine, and Africa | 深受中东、中亚、东南亚、南美、俄罗斯、乌克兰和非洲经销商和承包商信赖 | 具体区域列表比数字更有说服力 |
| HomeTrust | Item5_Feature1 | `src/components/home/Trust_data.astro` | Europe / Americas / Southeast Asia / Middle East | 欧洲/美洲/东南亚/中东 | Middle East, Central Asia, Southeast Asia, South America, Russia, Ukraine, Africa | 中东、中亚、东南亚、南美、俄罗斯、乌克兰、非洲 | 与实际情况一致，覆盖真实出口市场 |
| HomeTrust | Item5_Feature2 | `src/components/home/Trust_data.astro` | International certifications | 国际认证 | ISO 9001 certified quality system | ISO 9001 认证质量体系 | 工厂仅有 ISO 9001，删除不存在的认证暗示 |
| HomeTrust | Item5_Feature3 | `src/components/home/Trust_data.astro` | Localised service support | 本地化服务支持 | Dedicated account manager for every client | 每位客户配备专属客户经理 | 更具体可感知，比"本地化"更接地气 |
| HomeTrust | Item6_Title | `src/components/home/Trust_data.astro` | 24/7 Support | 24/7支持 | 52 Patents | 52项专利 | 用可验证的专利数据替代服务承诺，竞品普遍展示专利数量 |
| HomeTrust | Item6_Desc | `src/components/home/Trust_data.astro` | Dedicated technical team – rapid response, custom solutions, and after-sales care | 专属技术团队——快速响应、定制方案、售后支持 | 52 granted patents in decorative surface engineering — demonstrating continuous R&D investment and technical leadership | 52项装饰表面工程授权专利——体现持续研发投入和技术领先地位 | 专利数是硬实力证明，比"24/7 Support"更具说服力；竞品HIMEI展示166项、LCLFilm展示30+项 |
| HomeTrust | Item6_Feature1 | `src/components/home/Trust_data.astro` | Quick inquiry response | 快速询价响应 | PVC film formulation & embossing technology | PVC薄膜配方与压花工艺 | 替换为专利相关技术点，更具体可信 |
| HomeTrust | Item6_Feature2 | `src/components/home/Trust_data.astro` | Free sample delivery | 免费样品寄送 | Surface wear-resistant coating innovations | 表面耐磨涂层创新 | 展示具体技术方向，增强研发实力感知 |
| HomeTrust | Item6_Feature3 | `src/components/home/Trust_data.astro` | Technical guidance after sales | 售后技术指导 | Continuous R&D investment & new product development | 持续研发投入与新品开发 | 体现持续创新能力 |
| HomeTrust | CTA | `src/components/home/Trust_data.astro` | View Manufacturing Capabilities | 查看制造能力 | See Our Factory & Production Lines | 查看工厂与生产线 | 强化"工厂参观"暗示，提升信任 |

### 配套图片

#### 信任卡片背景图（6 张）

| 卡片 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| Expertise | PVC 薄膜印刷工艺特写：凹版印刷滚筒在薄膜上印制木纹纹理 | PVC film gravure printing cylinder creating wood grain pattern — deep expertise in decorative film formulation | `trust-expertise-printing.webp` |
| Customization | 设计师与工厂技术人员在电脑前讨论花型设计稿 | OEM/ODM pattern development — designer and factory technician collaborating on custom decorative film design | `trust-customization-design.webp` |
| Factory-Direct Pricing | 工厂车间全景，工人正在操作设备，无中间商标识 | Factory-direct manufacturing — no middlemen, transparent pricing from DecoSupplier production floor | `trust-factory-direct.webp` |
| Production Base | 工厂航拍全景，展示 50,000+ m² 厂区规模 | 50,000+ square meter production base of DecoSupplier — aerial view of manufacturing facilities | `trust-production-base.webp` |
| Export Markets | 世界地图标注出口区域（中东、中亚、东南亚、南美、俄罗斯、乌克兰、非洲），配集装箱装货场景 | DecoSupplier export markets across Middle East, Central Asia, Southeast Asia, South America, Russia, Ukraine, and Africa | `trust-export-markets.webp` |
| Patents | 专利证书墙或专利号展示，配研发实验室场景 | 52 granted patents in decorative surface engineering — DecoSupplier R&D laboratory | `trust-patents.webp` |

> **竞品参考：** DILON 在信任数据区使用高质量工厂实拍图叠加数据，wanbofilm.com 使用航拍图展示产能。建议采用"大图叠底+数据浮层"的呈现方式。

---

## A.5 首页 — Core_Competencies（核心竞争力区）

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| HomeCore | Capsule | `src/components/home/Core_Competencies.astro` | Manufacturing Capability | 制造能力 | What Makes Us Different | 我们的差异化优势 | 制造能力是"手段"，差异化是"结果" |
| HomeCore | Title | `src/components/home/Core_Competencies.astro` | Built for Production and Consistency | 为生产与一致性而建 | Not Just a Supplier — Your Production Partner | 不仅是供应商——更是您的生产伙伴 | 从"设备导向"转变为"关系导向"，更符合B2B采购心理 |
| HomeCore | Subtitle | `src/components/home/Core_Competencies.astro` | Our factory combines pattern development, printing, coating, embossing, and finishing capacity to support reliable production for decorative films, flooring, and wall panels. | 我们的工厂融合了花型开发、印刷、涂布、压花和表面处理能力，为装饰膜、地板和墙板提供可靠的生产支持。 | 3 factories. 1000+ print cylinders. 52 patents. 50,000+ m² production base. Talk directly to the factory — from sampling to shipment. | 不同于贸易公司，我们拥有3座工厂、1000+印刷版辊和5万+平米生产基地。与DecoSupplier合作，从打样到出货，您直接对话工厂。 | 明确区分"工厂"与"贸易商"，消除采购商的选择顾虑 |
| HomeCore | Feature1_Title | `src/components/home/Core_Competencies.astro` | Direct Manufacturing Support | 直接制造支持 | Factory-Direct Communication | 工厂直联沟通 | 更简洁，更直接 |
| HomeCore | Feature1_Desc | `src/components/home/Core_Competencies.astro` | From sample development to bulk production, our team works directly with your project requirements instead of relying on layers of intermediaries. | 从样品开发到批量生产，我们的团队直接对接您的项目需求，无需依赖层层中间商。 | Skip the trading agent. Your project requirements go straight to our production manager — faster response, accurate quoting, no information loss. | 跳过贸易商。您的需求直达生产经理——响应更快，报价更准，信息不失真。 | 场景化描述解决了B2B采购中常见的"信息传递损耗"痛点 |
| HomeCore | Feature2_Title | `src/components/home/Core_Competencies.astro` | Pattern Development & Custom Production | 花型开发与定制生产 | OEM/ODM — Your Design, Our Production | OEM/ODM——您的设计，我们的生产 | 开门见山，直接用OEM/ODM关键词 |
| HomeCore | Feature2_Desc | `src/components/home/Core_Competencies.astro` | We support custom patterns, color matching, surface effects, and product development for PVC films and related decorative materials. | 我们支持PVC膜及相关装饰材料的定制花型、颜色匹配、表面效果和产品开发。 | Send us your design file or physical sample. We'll match the color, texture, and finish — cylinder engraving costs are deductible from your bulk order. | 发来您的设计文件或实物样品，我们匹配颜色、纹理和表面处理——版辊雕刻费可从大货订单中抵扣。 | 具体化定制流程，降低客户"定制成本高"的心理障碍 |
| HomeCore | Feature3_Title | `src/components/home/Core_Competencies.astro` | Process Control From Raw Material to Finished Product | 从原料到成品的流程控制 | 3-Tier Quality Control, Zero Compromise | 三级品控，零妥协 | 数字+承诺，更有力 |
| HomeCore | Feature3_Desc | `src/components/home/Core_Competencies.astro` | Inspection and control are built into each stage of production, from incoming material to finished rolls and shipment preparation. | 检验和控制贯穿每个生产阶段，从来料、成品卷材到出货准备。 | Raw material → In-line → Pre-shipment. Every batch tested for scratch resistance, colorfastness, and VOC emissions. Test reports shared with you. | 原材料检验→产线在线监控→出货前核查。每批次测试耐刮擦、色牢度和VOC排放——并向您共享检测报告。 | 透明化QC流程，暗示可提供检测报告（竞品调研发现无人提供TDS下载，这是差异化机会） |

### 配套图片

#### 核心竞争力卡片图片（3 张）

| 卡片 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| Factory-Direct Communication | 采购商与工厂生产经理面对面沟通的场景（或视频会议截图风格） | Direct communication with production manager at DecoSupplier — no trading agents, faster response | `core-factory-direct-communication.webp` |
| OEM/ODM — Your Design | 客户设计稿 → 工厂打样 → 成品薄膜的"三步对比"展示 | OEM/ODM custom PVC film — from design file to sample to finished product roll | `core-oem-odm-process.webp` |
| 3-Tier Quality Control | 质检人员正在使用仪器检测薄膜样品（色差仪/耐刮擦测试仪） | 3-tier quality control — scratch resistance, colorfastness, and VOC emission testing at DecoSupplier lab | `core-quality-control-testing.webp` |

> **竞品参考：** B-TRUST 在核心竞争力区使用"全景+特写"组图展示全链条生产。MSD Group 展示质检场景。建议每张卡片配 1 张高清图。

---

## A.6 首页 — Factory_Capabilities + PremiumCTA

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| HomeFactory | Capsule | `src/components/home/Factory_Capabilities.astro` | Factory Capabilities | 工厂能力 | How We Make It | 制造流程 | 简洁有力，客户视角 |
| HomeFactory | Title | `src/components/home/Factory_Capabilities.astro` | Manufacturing From Print to Finish | 从印刷到成品的制造 | Your Order, Step by Step | 您的订单，逐步透明 | 以客户视角描述流程 |
| HomeFactory | Subtitle | `src/components/home/Factory_Capabilities.astro` | Our production flow covers material preparation, printing, coating, embossing, finishing, and shipment preparation. | 我们的生产流程涵盖原料准备、印刷、涂布、压花、表面处理和出货准备。 | See exactly how your order moves through our factory — from raw material to container loading. | 清晰了解您的订单如何在工厂流转——从原料到装柜。 | 透明化=信任 |
| HomeFactory | Item1_Desc | `src/components/home/Factory_Capabilities.astro` | We source premium PVC resins, plasticizers, and stabilizers from certified global suppliers. All raw materials undergo rigorous incoming inspection to ensure consistency and compliance with international standards. | 我们从认证的全球供应商采购优质PVC树脂、增塑剂和稳定剂。所有原材料都经过严格的进货检验，以确保一致性和符合国际标准。 | Premium PVC resins & stabilizers, inspected before production | 优质PVC树脂与稳定剂，生产前检验 | 原2句精简为1句 |
| HomeFactory | Item2_Desc | `src/components/home/Factory_Capabilities.astro` | Our advanced production lines feature high-definition rotogravure printing, multi-layer co-extrusion, embossing, and adhesive coating. Fully automated processes ensure consistent quality across every batch. | 我们的先进生产线配备高清凹版印刷、多层共挤、压花和胶粘涂层。全自动化流程确保每批次质量一致。 | Gravure printing, embossing, coating — automated for batch consistency | 凹版印刷、压花、涂布——自动化确保批次一致 | 原一段废话精简为核心工艺 |
| HomeFactory | Item3_Desc | `src/components/home/Factory_Capabilities.astro` | Every roll undergoes three-tier inspection: raw material testing, in-line production monitoring, and pre-shipment finished goods inspection. We test for scratch resistance, colorfastness, waterproof bonding, and VOC/aldehyde emissions. | 每卷产品经过三级检验：原材料测试、在线生产监控和出货前成品检验。测试项目包括耐刮擦、色牢度、防水粘合及VOC/醛类排放。 | Three-tier inspection: incoming, in-line, and pre-shipment | 三级检验：来料、产线、出货前 | 去技术细节，保留核心结构 |
| HomeFactory | Item4_Desc | `src/components/home/Factory_Capabilities.astro` | Our efficient supply chain and flexible production scheduling ensure stable lead times. We coordinate container loading, customs documentation, and international shipping to deliver products to over 200 countries worldwide. | 我们高效的供应链和灵活的生产排程确保稳定的交货周期。协调装柜、报关文件和国际运输，将产品送达全球200+国家。 | Container loading, customs docs, and shipping to 30+ countries | 装柜、报关文件、发往30+国家 | 缩短并修正市场数据 |
| HomeFactory | Item_LearnMore | `src/components/home/Factory_Capabilities.astro` | Learn more | 了解更多 | → | 箭头 | 无意义文本，替换为箭头图标 |
| HomeCTA | Title | `src/components/home/PremiumCTA.astro` | Need Samples or Custom Production? | 需要样品或定制生产？ | Ready to Test Our Quality? | 准备测试我们的品质？ | 改为行动导向的提问 |
| HomeCTA | Subtitle | `src/components/home/PremiumCTA.astro` | Contact our production and sales team for samples, custom specifications, and factory-direct quotations tailored to your project. | 联系我们的生产和销售团队，获取样品、定制规格和针对您项目的工厂直供报价。 | Get free sample swatches shipped to your door within 3-7 days. No commitment required — test our quality before you buy. | 免费样品3-7天送达，无需承诺——先测试品质再决定。 | 消除"联系=被骚扰"的心理抗拒；明确时间预期 |
| HomeCTA | Button_Primary | `src/components/home/PremiumCTA.astro` | Request Factory Quote | 索取工厂报价 | Request Free Samples Now | 立即申请免费样品 | 降低行动门槛，先用样品建立信任 |
| HomeCTA | Button_Secondary | `src/components/home/PremiumCTA.astro` | Learn About Our Factory | 了解我们的工厂 | Talk to Our Factory Team | 与工厂团队直接沟通 | 对话比浏览更有转化力 |
| HomeFactory | Benefit1_Title | `src/components/home/Factory_Capabilities.astro` | Stable Production Capacity | 稳定生产能力 | Stable Production Capacity | 稳定产能 | 无需替换 |
| HomeFactory | Benefit1_Desc | `src/components/home/Factory_Capabilities.astro` | Consistent manufacturing capability for repeat orders and larger project requirements | 为重复订单和大型项目需求提供一致的制造能力 | Consistent output for repeat orders and large-scale projects | 重复订单和大型项目持续稳定产出 | 精简，去冗余 |
| HomeFactory | Benefit2_Title | `src/components/home/Factory_Capabilities.astro` | Reliable Delivery Coordination | 可靠的交付协调 | Reliable Delivery Coordination | 可靠交付 | 无需替换 |
| HomeFactory | Benefit2_Desc | `src/components/home/Factory_Capabilities.astro` | Production scheduling and shipment support are coordinated to meet delivery needs across global markets | 协调生产排程和发货支持，以满足全球市场的交付需求 | Coordinated scheduling and shipment support across global markets | 全球市场协调排产与发货 | 精简 |
| HomeFactory | Benefit3_Title | `src/components/home/Factory_Capabilities.astro` | Quality Built Into Each Stage | 品质贯穿每个阶段 | Quality Built Into Each Stage | 每阶段品质管控 | 无需替换 |
| HomeFactory | Benefit3_Desc | `src/components/home/Factory_Capabilities.astro` | Inspection and control are applied throughout production to support consistent output | 检验和控制贯穿生产全过程，以支持一致的产出 | Inspection and control applied throughout production | 贯穿生产全程的检验与控制 | 精简 |

### 配套图片

#### 工厂流程步骤图（4 张）

| 步骤 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| Raw Material | 原材料仓库：PVC 树脂粉、增塑剂、色母粒等原料整齐码放 | Raw material preparation — PVC resin, plasticizers, and color masterbatch at DecoSupplier warehouse | `process-raw-material.webp` |
| Printing & Coating | 印刷生产线：凹版印刷机在运转，薄膜表面正在被印制纹理 | High-speed gravure printing and coating line — PVC film pattern transfer at DecoSupplier factory | `process-printing-coating.webp` |
| Embossing & Finishing | 压花设备：薄膜表面正在被压出立体纹理，光泽表面效果 | Embossing and surface finishing — creating wood grain texture and matte/gloss finish on PVC film | `process-embossing-finishing.webp` |
| QC & Shipment | 质检人员正在检查成品卷膜，旁边是打包完成的托盘和集装箱 | Quality inspection and export packaging — PVC film rolls palletized and ready for container loading | `process-qc-shipment.webp` |

#### PremiumCTA 背景图

| 属性 | 内容 |
|------|------|
| **图片内容** | 样品盒特写：精致的样品盒打开，展示多种花型的薄膜样品块（木纹/大理石/纯色），旁边放置产品目录册。暖色调光线，营造"开箱体验"感。 |
| **Alt 文本** | Free PVC decorative film sample swatches from DecoSupplier — request samples shipped in 3-7 days |
| **文件名** | `cta-sample-swatches.webp` |
| **竞品参考** | Yunjia Decor 的 CTA 区使用样品展示图激发采购欲望。建议突出"样品盒"的实物感，降低采购商的心理门槛。 |

---

## A.7 About 页面修改

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| About | SEO_Title | `src/pages/about.astro` | About DecoSupplier - Factory-Grounded Manufacturer of PVC Films, LVT & PVC | 关于DecoSupplier——扎根工厂的PVC膜、LVT和PVC制造商 | About DecoSupplier - PVC Film, LVT & PVC Manufacturer from China | 关于我们：中国PVC膜、LVT地板、PVC墙板制造商 | 缩短标题，置入"China"产地关键词 |
| About | Hero_Title | `src/pages/about.astro` | About DecoSupplier | 关于DecoSupplier | From One Printing Line to a 50,000 m² Factory | 从一条印刷线到5万平米工厂 | 故事化标题，更有吸引力 |
| About | Hero_Desc | `src/pages/about.astro` | A manufacturing base in China specializing in decorative surface materials for the global market. | 位于中国的制造基地，专注于为全球市场提供装饰表面材料。 | Not traders. A factory team with 15+ years in PVC film manufacturing, 52 patents, serving 30+ countries. | 我们不是贸易商。我们是一支拥有15年PVC装饰膜制造经验的工厂团队，服务30+国家的经销商、承包商和品牌商。 | 明确身份定位，强化信任 |
| About | Story_Title | `src/pages/about.astro` | It Started with One Printing Line | 从一条印刷线开始 | 15 Years, One Focus | 15年，一个专注 | 更简洁有力 |
| About | Story_P1 | `src/pages/about.astro` | DecoSupplier started with one printing line and a small team of workers who had spent over a decade in the PVC film industry. | DecoSupplier 从一条印刷线和一个小团队开始，怀揣着对优质表面材料的热情。 | In 2010, a small team of PVC technicians built a factory to sell directly to overseas buyers — no middlemen, no inflated pricing, just quality materials at fair factory rates. | 2010年，一群PVC薄膜技术人员决定做一件不同的事：建一座直接面向海外买家销售的工厂——无中间商，无虚高价格，只有优质材料和公平的工厂价格。 | 具体年份+明确动机，比"started with one line"更有故事性 |
| About | WhyChoose_Title | `src/pages/about.astro` | What You Get When You Work with Us | 与我们合作，您将获得什么 | 6 Reasons Global Buyers Partner with DecoSupplier | 全球采购商选择DecoSupplier的6个理由 | 加上"Global Buyers"暗示已被广泛认可 |
| About | Values_1 | `src/pages/about.astro` | Quality materials don't need middlemen. | 优质材料不需要中间商。 | Factory-direct quality cuts 20-40% off your landed cost. | 工厂直供品质可降低20-40%到岸成本 | 量化价值主张 |
| About | Values_5 | `src/pages/about.astro` | Made in China doesn't mean cheap — it can be both quality and fair. | 中国制造不等于廉价——它可以同时兼顾品质和公道。 | Chinese manufacturing, global standards — ISO 9001 compliant. | 中国制造，国际标准——ISO 9001合规 | 用认证背书替代情感表达 |
| About | CTA_Title | `src/pages/about.astro` | Ready to Work with DecoSupplier? | 准备好与DecoSupplier合作了吗？ | Ready to Visit Our Factory — or Start with a Sample? | 准备参观工厂——还是先从一个样品开始？ | 提供两个选择，降低行动门槛 |
| About | CTA_Button | `src/pages/about.astro` | Contact Us | 联系我们 | Get Free Samples | 获取免费样品 | 更具体的CTA |

### 配套图片

#### About Hero 区

| 属性 | 内容 |
|------|------|
| **图片内容** | 工厂外景 + 团队合影，展示公司门面。"DecoSupplier"品牌标识清晰可见。 |
| **Alt 文本** | DecoSupplier headquarters and manufacturing facility — PVC film, LVT flooring, and PVC wall panel factory in China |
| **文件名** | `about-hero-factory.webp` |

#### Story 故事区

| 属性 | 内容 |
|------|------|
| **图片内容** | 时间线配图：左侧放置 2010 年旧工厂/旧设备照片（黑白或做旧色调），右侧放置当前现代化工厂照片（全彩），形成对比叙事。 |
| **Alt 文本** | DecoSupplier journey — from one printing line in 2010 to a 50,000 m² modern factory today |
| **文件名** | `about-story-timeline.webp` |
| **竞品参考** | DILON 使用时间线+里程碑配图叙述品牌故事。建议采用"Before/After"对比式布局，强化成长叙事。 |

#### Facilities 设施区

| 设施 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| Factory 1 (浙江) | 浙江工厂外景/车间全景 | DecoSupplier Zhejiang factory — PVC film printing and coating facility | `facility-zhejiang.webp` |
| Factory 2 (安徽) | 安徽工厂（黄山）外景/车间全景 | DecoSupplier Anhui Huangshan factory — LVT and PVC production base | `facility-anhui.webp` |
| Factory 3 (宁波) | 宁波工厂/仓库/物流中心 | DecoSupplier Ningbo logistics and warehousing center | `facility-ningbo.webp` |

#### Equipment 设备区

| 设备 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| 凹版印刷线 | 高速凹版印刷机全貌，展示印刷滚筒和薄膜走料 | High-speed gravure printing line for PVC decorative film — precision pattern transfer | `equipment-gravure-printing.webp` |
| 宽幅压延线 | 宽幅压延设备，展示薄膜成型过程 | Wide-width calendering line for PVC film production — expanded capacity | `equipment-calendering.webp` |
| 多层共挤线 | 多层共挤生产线，展示多层结构薄膜制造 | Multi-layer co-extrusion line for PVC and LVT core layer production | `equipment-co-extrusion.webp` |
| 压花贴合线 | 压花+贴合设备，展示纹理压制和复合工艺 | Embossing and lamination line — surface texture finishing for decorative films | `equipment-embossing.webp` |

#### Global Network 全球网络区

| 属性 | 内容 |
|------|------|
| **图片内容** | 世界地图，标注 DecoSupplier 出口区域（中东、中亚、东南亚、南美、俄罗斯、乌克兰、非洲），用不同颜色标记。旁边配区域代表性项目/客户案例缩略图。 |
| **Alt 文本** | DecoSupplier global export network — serving 30+ countries across Middle East, Central Asia, Southeast Asia, South America, Russia, Ukraine, and Africa |
| **文件名** | `about-global-network-map.webp` |
| **竞品参考** | XIETE 在区域展示上使用地图+区域分类。DILON 使用世界地图标注出口国家。建议采用互动式地图（可 hover 显示区域详情）。 |

#### Team 团队区

| 属性 | 内容 |
|------|------|
| **图片内容** | 管理团队合影 + 生产团队合影 + 质检团队工作照，展示专业性。建议 3-4 张图轮播或网格排列。 |
| **Alt 文本** | DecoSupplier team — management, production, and quality control professionals |
| **文件名** | `about-team-photo.webp`（建议多张：`about-team-management.webp`, `about-team-production.webp`, `about-team-qc.webp`） |

#### Values 价值观区

| 价值观 | 图片内容 | Alt 文本 | 文件名 |
|--------|---------|---------|--------|
| Factory-Direct Quality | 工厂车间+质检人员场景 | Factory-direct quality — cutting 20-40% landed cost for global buyers | `values-factory-direct.webp` |
| Global Standards | 认证证书展示：ISO 9001 证书 | Chinese manufacturing, global standards — ISO 9001 certified | `values-certifications.webp` |

---

## A.8 Products 页面修改

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| Products | SEO_Title | `src/pages/products.astro` | Product Series - DecoSupplier | 产品系列——DecoSupplier | 7 Product Lines - PVC Film, LVT Flooring, PVC Wall Panels | DecoSupplier | 七大产品线：PVC膜、LVT地板、PVC墙板 | 包含关键词，提升搜索匹配 |
| Products | Hero_Title | `src/pages/products.astro` | Our Product Collections | 我们的产品系列 | 7 Product Lines. One Factory. | 七大产品线。一家工厂。 | 更简洁，数字+核心卖点 |
| Products | Hero_Desc | `src/pages/products.astro` | Explore DecoSupplier's comprehensive range of surface materials for furniture, flooring, and interior decoration. | 探索DecoSupplier全面的家具、地板和室内装饰表面材料系列。 | Every product line manufactured in our own factory. In-house printing, coating, embossing, and QC. OEM/ODM across all categories. | 每条产品线都在自有工厂内完成印刷、涂布、压花和品控。全品类支持OEM/ODM定制。 | 强调"in our own factory"，区别于贸易公司 |
| Products | FAQ10_Q | `src/pages/products.astro` | Are PVC wall panels suitable for bathrooms and kitchens? | PVC墙板适用于浴室和厨房吗？ | Are PVC wall panels suitable for bathrooms, kitchens, and basements? | PVC墙板适用于浴室、厨房和地下室吗？ | 增加"basements"覆盖俄罗斯、乌克兰等市场地下室场景搜索词 |
| Products | CTA_Subtitle | `src/pages/products.astro` | Let's discuss your project requirements and discover how our surface solutions can bring your vision to life. | 让我们讨论您的项目需求，探索我们的表面解决方案如何实现您的愿景。 | Let's discuss your project requirements and discover how our surface solutions can meet your needs. | 讨论您的项目需求，探索我们的表面解决方案如何满足您的需求。 | 原文本已为英文，仅微调措辞 |

### 配套图片

#### Products Hero 区

| 属性 | 内容 |
|------|------|
| **图片内容** | 七大产品线"全家福"：每种产品的一个代表性样品按扇形排列，展示产品线的丰富性。背景为浅色中性。 |
| **Alt 文本** | 7 product lines from DecoSupplier — PVC film, LVT flooring, PVC wall panel, refinishing film, foam wall panel, 3D wall panel, peel and stick wallpaper |
| **文件名** | `products-hero-collection.webp` |
| **竞品参考** | innovatepvc.com 在首页展示 10 大品类全家福，视觉冲击力强。建议将 7 个产品按统一风格拍摄，体现"一站式采购"优势。 |

#### 产品分类卡片（复用 A.3 产品卡片图片，共 7 张）

---

## A.9 Product Detail 页面修改（PVC Decorative Film 为例）

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| PVC_Film | SEO_Title | `src/pages/products/pvc-decorative-film/Product_detail.astro:...` | PVC Decorative Film for Furniture & Cabinet Wrapping - Manufacturer | DecoSupplier | PVC装饰膜——家具与橱柜包覆——制造商 | PVC Decorative Film Manufacturer - Furniture Wrapping, Vacuum Press, Lamination Films | PVC装饰膜制造商——家具包覆、真空吸塑、平贴膜 | 增加"vacuum press"和"lamination"覆盖更多搜索场景 |
| PVC_Film | Hero_Desc | `src/pages/products/pvc-decorative-film/Product_detail.astro:...` | Manufactured in our factory with in-house printing, coating, embossing, and slitting capability. Suitable for furniture wrapping, vacuum press, and flat lamination applications. | 在我们的工厂制造，具有内部印刷、涂布、压花和分切能力。适用于家具包覆、真空吸塑和平贴应用。 | Factory-direct PVC decorative films with 1000+ in-stock patterns. Wood grain, marble, solid color, and custom designs. Thickness: 0.12-0.45mm. Width: custom slitting available. Free samples in 3-7 days. | 工厂直供PVC装饰膜，1000+花型现货。木纹、大理石、纯色、定制设计。厚度0.12-0.45mm，宽度可定制分切。免费样品3-7天送达。 | 将技术参数和商业承诺整合到Hero区，采购商一目了然 |

> **注意：** InteriorFilm 产品详情页当前内容与 PVC_Film 完全相同，必须替换为独立内容，聚焦"Interior Refinishing Film"品类的独特卖点（自粘、可移除、DIY友好、厨房/浴室翻新场景）。

### 配套图片

#### 产品详情 Hero 区

| 属性 | 内容 |
|------|------|
| **图片内容** | 产品 Hero 大图：一卷 PVC 装饰膜从设备中拉出，展示木纹纹理细节，光线从侧面打来凸显纹理立体感。 |
| **Alt 文本** | PVC decorative film for furniture wrapping — wood grain pattern, 0.12-0.45mm thickness, factory direct from DecoSupplier |
| **文件名** | `pvc-film-hero-detail.webp` |

#### 产品画廊（6 张）

| 序号 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| 1 | 产品纹理特写：木纹纹理、手指触摸质感 | PVC decorative film wood grain texture close-up — matte finish, scratch-resistant surface | `pvc-film-gallery-texture.webp` |
| 2 | 应用场景：家具厂工人正在将 PVC 膜包覆到 MDF 板材上 | PVC film application — furniture wrapping on MDF board using vacuum press | `pvc-film-gallery-application-1.webp` |
| 3 | 应用场景：橱柜门板包覆效果展示 | PVC film on kitchen cabinet doors — finished furniture wrapping result | `pvc-film-gallery-application-2.webp` |
| 4 | 花型展示：色卡/花型册翻开展示，多种木纹+大理石纹排列 | 1000+ PVC film patterns — wood grain, marble, stone, solid color catalog | `pvc-film-gallery-patterns.webp` |
| 5 | 产品卷材：不同宽度/厚度的成品卷膜在仓库货架上 | PVC film rolls in stock — various widths and thicknesses ready for shipment | `pvc-film-gallery-rolls.webp` |
| 6 | 质检场景：质检员使用色差仪检测薄膜颜色一致性 | PVC film quality inspection — spectrophotometer color matching and scratch resistance testing | `pvc-film-gallery-qc.webp` |

> **竞品参考：** GreatK2 在产品详情页展示详细的产品参数和实物图片，但缺少应用场景图。建议在画廊中"产品+应用+质检"三要素齐全，形成完整说服链。

#### 应用场景图标（4 个 SVG）

| 场景 | 图标内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| 家具包覆 | 家具板材+薄膜包覆示意图标 | Furniture wrapping application icon | `icon-app-furniture.svg` |
| 室内门 | 室内门包覆示意图标 | Interior door lamination application icon | `icon-app-door.svg` |
| 墙面装饰 | 墙面装饰应用图标 | Wall panel decoration application icon | `icon-app-wall.svg` |
| 地板 | 地板应用图标 | Flooring application icon | `icon-app-flooring.svg` |

---

## A.10 Contact 页面修改

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| Contact | SEO_Title | `src/pages/contact.astro` | Contact DecoSupplier - Get a Quote for Surface Materials | 联系DecoSupplier——获取表面材料报价 | Contact DecoSupplier - Get Free Samples, Factory Quotes & OEM/ODM Support | 联系我们——获取免费样品、工厂报价和OEM/ODM支持 | 加入更多转化关键词 |
| Contact | Hero_Desc | `src/pages/contact.astro` | Get a customized quote for decorative films, flooring, and wall panels tailored to your project specifications. We typically respond within 24 hours. | 获取针对您项目规格的装饰膜、地板和墙板定制报价。我们通常在24小时内回复。 | Tell us about your project. Free samples in 3-7 days. Factory-direct quote in 24 hours. No commitment. | 告诉我们您的项目需求。我们将在3-7天内寄送免费样品，24小时内提供工厂直供报价——无中间商，无承诺压力。 | 将"样品+报价"作为核心承诺，降低首次联系的心理门槛 |
| Contact | Email_Note | `src/pages/contact.astro` | 24-hour response guaranteed | 保证24小时回复 | We reply within 24 hours — guaranteed | 24小时内回复——保证 | 动作化描述 |
| Contact | HowWeWork_Title | `src/pages/contact.astro:...` | How We Work | 我们的工作方式 | 4 Steps from Inquiry to Delivery | 从询盘到交货的4步流程 | 数字化流程 |
| Contact | Step1_Desc | `src/pages/contact.astro:...` | We discuss your project needs and specifications | 我们讨论您的项目需求和规格 | You tell us your requirements — product type, pattern, quantity, target market | 您告知需求——产品类型、花型、数量、目标市场 | 具体化客户需要准备的信息 |
| Contact | CTA_Button | `src/pages/contact.astro:...` | Get Your Quote Now | 立即获取报价 | Send Inquiry & Get Free Samples | 发送询盘并获取免费样品 | 将样品承诺嵌入CTA按钮 |

### 配套图片

#### Contact Hero 区

| 属性 | 内容 |
|------|------|
| **图片内容** | 工厂办公室+样品展示厅场景：明亮的接待区，样品展示架排列整齐，体现专业、开放、欢迎合作的氛围。 |
| **Alt 文本** | Contact DecoSupplier — factory showroom and office, ready to serve your project needs |
| **文件名** | `contact-hero-showroom.webp` |

#### 联系信息侧边栏

| 位置 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| 工厂地址 | 工厂外景/门牌特写 | DecoSupplier factory address — Huangshan, Anhui, China | `contact-factory-location.webp` |
| 办公室地址 | 杭州办公室外景/写字楼 | DecoSupplier office — Hangzhou, Zhejiang, China | `contact-office-location.webp` |

#### Contact Trust Section

| 属性 | 内容 |
|------|------|
| **图片内容** | 信任徽章墙：ISO 9001 认证徽章 + 15年经验 + 30+ 出口市场 + 1000+ 花型，用图标+数据可视化呈现。 |
| **Alt 文本** | DecoSupplier trusted by global buyers — ISO 9001 certified, 15+ years, 30+ export markets |
| **文件名** | `contact-trust-badges.webp` |

---

## A.11 Service 页面修改

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| Service | SEO_Title | `src/pages/Service.astro:...` | OEM/ODM Service & Custom Manufacturing for PVC Films, LVT & Wall Panels | PVC膜、LVT和墙板的OEM/ODM服务与定制制造 | OEM/ODM Custom Manufacturing - PVC Film, LVT Flooring, PVC Wall Panel Factory | OEM/ODM定制制造——PVC膜、LVT地板、PVC墙板工厂 | 简化，关键词前置 |
| Service | Hero_Title | `src/pages/Service.astro:...` | Manufacturing & Custom Production | 制造与定制生产 | OEM/ODM Made Simple | OEM/ODM，简单化 | 采购商怕复杂流程，"simple"解痛点 |
| Service | Hero_Desc | `src/pages/Service.astro:...` | Factory-based production for PVC decorative films, LVT flooring, and wall panels with flexible customization options. | 工厂化生产PVC装饰膜、LVT地板和墙板，提供灵活的定制选项。 | From your design concept to container-loading: 8 transparent steps, one dedicated project manager, real-time progress tracking. | 从您的设计概念到装箱出货：8个透明步骤，一位专属项目经理，实时进度追踪。 | 突出"8 steps"数字和"one project manager"专人服务 |
| Service | Pillar_Title | `src/pages/Service.astro:...` | Three Core Manufacturing Capabilities | 三大核心制造能力 | What Our OEM/ODM Service Includes | 我们的OEM/ODM服务包含什么 | 更直接说明价值 |

### 配套图片

#### Service Hero 区

| 属性 | 内容 |
|------|------|
| **图片内容** | 定制化流程示意：从设计稿 → 打样 → 生产 → 出货的流程可视化，配合实际车间场景。 |
| **Alt 文本** | OEM/ODM custom manufacturing — from design to delivery at DecoSupplier |
| **文件名** | `service-hero-oem-odm.webp` |

#### 三大服务支柱卡片

| 支柱 | 图片内容 | Alt 文本 | 文件名 |
|------|---------|---------|--------|
| 直接制造+全品类匹配 | 工厂车间全景，展示 7 条产品线并行生产 | Direct manufacturing and full category matching — 7 product lines, one factory | `service-pillar-manufacturing.webp` |
| 灵活 OEM/ODM 定制 | 设计师与客户沟通花型设计稿的场景 | Flexible OEM/ODM customization — custom pattern, color matching, private labeling | `service-pillar-customization.webp` |
| 端到端项目支持 | 装箱出货场景，展示成品托盘和集装箱 | End-to-end project support — from sampling to container loading at DecoSupplier | `service-pillar-support.webp` |

---

## A.12 全局导航与 Footer

### 文字替换

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| Header | Logo | `src/components/Header.astro` | Deco Supplier | 分开写的品牌名 | DecoSupplier | DecoSupplier | 品牌名统一（无空格） |
| Header | CTA | `src/components/Header.astro` | Request Quote | 索取报价 | Get Free Samples | 获取免费样品 | 降低CTA门槛 |
| Footer | Logo | `src/components/Footer.astro` | Deco Supplier | 分开写的品牌名 | DecoSupplier | DecoSupplier | 品牌名统一 |
| Footer | CTA | `src/components/Footer.astro` | Get Started | 开始 | Request Free Samples | 申请免费样品 | 更具体的行动引导 |

> 导航与 Footer 无需新增图片。Logo 建议保持现有设计，但统一为"DecoSupplier"（无空格）。

---

## 图片规格汇总

| 属性 | 建议值 |
|------|--------|
| 格式 | WebP（优先）/ JPEG（备选） |
| 色彩空间 | sRGB |
| 桌面 Hero 图尺寸 | 1920×1080px |
| 卡片图尺寸 | 800×600px 或 1:1 正方形 |
| 缩略图尺寸 | 400×300px |
| 移动端适配 | 使用 Astro `<Image>` 的 `densities` 或 `widths` 属性自动生成多尺寸 |
| 压缩策略 | 建议使用 `sharp` 或 `squoosh` 压缩，Hero 图控制在 200KB 以内，卡片图 80KB 以内 |

---

## 图片需求总览

| 模块 | 图片类型 | 数量 |
|------|---------|------|
| A.2 HomeHero | Hero 背景 + 统计卡片背景 | 5 张 |
| A.3 Product_all | 产品卡片 | 7 张 |
| A.4 Trust_data | 信任卡片背景 | 6 张 |
| A.5 Core_Competencies | 核心竞争力卡片 | 3 张 |
| A.6 Factory_Capabilities + CTA | 流程步骤 + CTA 背景 | 5 张 |
| A.7 About | Hero、Story、Facilities、Equipment、Global、Team、Values | 14+ 张 |
| A.8 Products | Hero 全家福 | 1 张（+ 复用 A.3） |
| A.9 Product Detail | Hero、画廊、应用图标 | 11 张 |
| A.10 Contact | Hero、地址、信任徽章 | 4 张 |
| A.11 Service | Hero、服务支柱 | 4 张 |
| **合计** | | **56+ 张** |

---

## 竞品视觉参考总结

| 竞品 | 评分 | 视觉特点 | 借鉴建议 |
|------|------|---------|---------|
| **DILON** | 9/10 | 工厂实景为主，产品图为辅，色彩偏深蓝+白，专业冷静 | Hero 区使用工厂场景图，传递"工厂直供"身份 |
| **Yunjia Decor** | 9/10 | 数字展厅+产品场景化，色彩明亮，展示丰富 | 产品图使用"产品+应用场景"组合，模拟展厅体验 |
| **XIETE** | 9/10 | 行业分类导航，视觉分区清晰，数据可视化好 | 数据展示使用图标+数字可视化，替代纯文字 |
| **KL Decorative** | — | 产品线极全，图片展示"产品+应用"二合一 | 产品卡片展示应用场景，帮助采购商对号入座 |
| **GreatK2** | — | 技术参数详实，但视觉呈现偏传统 | 产品详情页补充实物图+参数可视化 |
| **wanbofilm.com** | — | 航拍图+产能数据，视觉冲击力强 | 工厂规模用航拍图展示，叠加产能数据 |

> **核心建议：** DecoSupplier 的视觉策略应遵循"工厂实景为主、产品场景为辅、数据可视化点缀"的原则。优先拍摄工厂实景图（建议委托专业工业摄影师），其次补拍产品应用场景图，最后制作数据可视化图标。所有图片需统一色调（建议暖白+品牌蓝），避免风格杂乱。

---

## A.13 遗漏修改项补充（代码中已存在但方案未覆盖的文本）

以下为逐文件核对后发现的遗漏修改项，这些文本在代码中硬编码，需要在方案中补充。

### A.13.1 AnimatedStats 组件（首页 Core_Competencies 中使用）

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| AnimatedStats | Stat_Label4 | `src/components/react/AnimatedStats.tsx` | 50+ Countries Exported To | 出口至50+国家 | 30+ Export Markets | 30+出口市场 | 与全局数据保持一致（30+ Countries），避免数据矛盾 |

### A.13.2 MobileMenu 组件（移动端导航菜单）

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| MobileMenu | CTA_Button | `src/components/react/MobileMenu.tsx` | Request Quote | 索取报价 | Get Free Samples | 获取免费样品 | 与 Header CTA 按钮保持一致 |

### A.13.3 RFQForm 组件（询盘表单）

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| RFQForm | Submit_Button | `src/components/react/RFQForm.tsx` | Send Inquiry to Factory | 发送询盘至工厂 | Send Inquiry & Get Free Samples | 发送询盘并获取免费样品 | 将样品承诺嵌入提交按钮，提升转化 |
| RFQForm | Success_Msg | `src/components/react/RFQForm.tsx` | Inquiry Sent Successfully! / We will respond within 24 hours. | 询盘发送成功！/ 我们将在24小时内回复。 | 无需替换 | 无需替换 | 已符合优化要求 |
| RFQForm | Footer_Note | `src/components/react/RFQForm.tsx` | We respond to all inquiries within 24 hours. Your information is protected by our Privacy Policy. | 我们会在24小时内回复所有询盘。您的信息受隐私政策保护。 | 无需替换 | 无需替换 | 已符合优化要求 |

### A.13.4 FloatingCTA 组件（右侧浮动快捷入口）

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| FloatingCTA | Tooltip_Samples | `src/components/react/FloatingCTA.tsx` | Free Samples | 免费样品 | 无需替换 | 无需替换 | 已符合优化要求 |
| FloatingCTA | Tooltip_WhatsApp | `src/components/react/FloatingCTA.tsx` | WhatsApp | WhatsApp | 无需替换 | 无需替换 | 通用品牌名，无需修改 |
| FloatingCTA | Card_Title | `src/components/react/FloatingCTA.tsx` | Contact Us | 联系我们 | 无需替换 | 无需替换 | 通用联系标签 |
| FloatingCTA | Card_Subtitle | `src/components/react/FloatingCTA.tsx` | Click any info to copy | 点击任意信息复制 | 无需替换 | 无需替换 | 功能提示，无需修改 |
| FloatingCTA | Tooltip_Chat | `src/components/react/FloatingCTA.tsx` | Live Chat | 在线沟通 | 无需替换 | 无需替换 | 通用功能标签 |
| FloatingCTA | Contact_Phone | `src/components/react/FloatingCTA.tsx` | +86 574 8888-6688 | 占位电话 | 替换为真实号码 | 替换为真实号码 | 当前为占位数据，需替换为真实工厂电话 |
| FloatingCTA | Contact_WhatsApp | `src/components/react/FloatingCTA.tsx` | +86 138 8888 8888 | 占位 WhatsApp | 替换为真实号码 | 替换为真实号码 | 当前为占位数据，需替换为真实 WhatsApp |

### A.13.5 Product Detail 页面（pvc-decorative-film）

| Section | Type | 文件路径:行号 | 原文本 (Original Text) | 原文本翻译 (Translation) | 替换文本 (Replacement) | 中文参考 | 为什么这么改 |
|---------|------|-------------|----------------------|------------------------|----------------------|---------|------------|
| ProductDetail | CTA_Button | `src/pages/products/pvc-decorative-film/Product_detail.astro` | Send Inquiry | 发送询盘 | Get Free Samples & Quote | 获取免费样品与报价 | 降低首次联系门槛 |
| ProductDetail | CTA_Bottom | `src/pages/products/pvc-decorative-film/Product_detail.astro` | Get Free Samples | 获取免费样品 | 无需替换 | 无需替换 | 已符合优化要求 |
| ProductDetail | CTA_Bottom2 | `src/pages/products/pvc-decorative-film/Product_detail.astro` | Send Inquiry | 发送询盘 | 无需替换 | 无需替换 | 作为辅助CTA保留 |
| ProductDetail | CTA_Subtitle | `src/pages/products/pvc-decorative-film/Product_detail.astro` | Contact the DecoSupplier sales team for samples and factory-direct quotes. | 联系 DecoSupplier 销售团队获取样品和工厂直供报价。 | 无需替换 | 无需替换 | 已符合优化要求 |
| ProductDetail | Privacy_Note | `src/pages/products/pvc-decorative-film/Product_detail.astro` | We respond to all inquiries within 24 hours. | 我们会在24小时内回复所有询盘。 | 无需替换 | 无需替换 | 已符合优化要求 |

---

## A.14 未在首页使用但含硬编码文本的组件（仅记录，暂不修改）

以下组件在代码中存在但未在 `index.astro` 首页中使用，其中的硬编码文本为占位/模板内容，当前无需修改。

| 文件 | 组件名 | 关键硬编码文本 | 状态 | 说明 |
|------|--------|--------------|------|------|
| `src/components/home/Hero.astro` | Hero（旧版） | "Industry-Leading Solutions", "Transform Your Supply Chain Excellence", "500+ Global Clients", "50M+ Units Shipped" | 未使用 | 首页已替换为 PremiumHero，此组件为旧版模板残留 |
| `src/components/home/CTA.astro` | CTA（旧版） | "Ready to Start Your Production Project?", "25+ Years Experience", "15 Global Facilities", "24/7 Factory Support" | 未使用 | 首页已使用 PremiumCTA，此组件数据与当前定位不符 |
| `src/components/home/Features.astro` | Features | "Our Core Capabilities", "Comprehensive logistics and manufacturing solutions..." | 未使用 | 首页使用 Core_Competencies 替代，此组件为旧版模板 |
| `src/components/home/Testimonials.astro` | Testimonials | "Client Success Stories", "Trusted by Industry Leaders", 含 AstroFlow 占位评价 | 未使用 | 客户评价为模板占位内容，后续需真实客户案例替换 |
| `src/components/home/TechnologyInnovation.astro` | TechnologyInnovation | "Technology & Innovation", "AI-Powered Optimization", "IoT Integration", "Enterprise Security" | 未使用 | 技术描述为通用模板，与装饰材料工厂定位不符 |

---

## A.15 博客/文档页面静态文本核对（仅记录，暂不修改）

以下为博客列表页、博客详情页、文档页的硬编码 UI 文本（标签、按钮、提示等），这些页面属于内容营销/支持类页面，非核心转化路径，当前无需修改。

### A.15.1 博客列表页 — Blog.astro

| Type | 文件路径:行号 | 原文本 | 翻译 | 是否需要修改 |
|------|-------------|--------|------|------------|
| Hero_Title | `src/pages/Blog.astro` | Factory Updates & Technical Guides | 工厂动态与技术指南 | 否，内容页面标题合理 |
| Hero_Desc | `src/pages/Blog.astro` | Frontline factory updates, technical guides, and industry trend analysis from DecoSupplier — providing deep content reference for global buyers. | 来自 DecoSupplier 的一线工厂动态、技术指南和行业趋势分析——为全球采购商提供深度内容参考。 | 否，SEO 描述合理 |
| Sidebar_Categories | `src/pages/Blog.astro` | Categories | 分类 | 否，UI 标签 |
| Sidebar_Popular | `src/pages/Blog.astro` | Popular Articles | 热门文章 | 否，UI 标签 |
| Sidebar_CTA_Title | `src/pages/Blog.astro` | Stay Connected | 保持联系 | 否，CTA 标题合理 |
| Sidebar_CTA_Desc | `src/pages/Blog.astro` | Have questions about our products or need expert advice? Reach out to our team today. | 对我们的产品有疑问或需要专家建议？立即联系我们的团队。 | 否 |
| Sidebar_CTA_Btn | `src/pages/Blog.astro` | Contact Our Team | 联系我们的团队 | 否 |
| Bottom_CTA_Title | `src/pages/Blog.astro` | Want to Learn More? | 想了解更多？ | 否 |
| Bottom_CTA_Desc | `src/pages/Blog.astro` | Browse our product range or contact our sales team for expert advice. | 浏览我们的产品系列或联系销售团队获取专家建议。 | 否 |
| Bottom_CTA_Btn1 | `src/pages/Blog.astro` | View Products | 查看产品 | 否 |
| Bottom_CTA_Btn2 | `src/pages/Blog.astro` | Contact Us | 联系我们 | 否 |
| Badge_Featured | `src/pages/Blog.astro` | Featured | 精选 | 否，UI 标签 |
| Pagination_Prev | `src/pages/Blog.astro` | Previous | 上一页 | 否，UI 标签 |
| Pagination_Next | `src/pages/Blog.astro` | Next | 下一页 | 否，UI 标签 |
| Empty_State | `src/pages/Blog.astro` | No articles found / Try selecting a different category | 未找到文章 / 尝试选择其他分类 | 否，UI 提示 |

### A.15.2 博客详情页 — Blog_detail.astro

| Type | 文件路径:行号 | 原文本 | 翻译 | 是否需要修改 |
|------|-------------|--------|------|------------|
| Breadcrumb_Home | `src/pages/Blog/Blog_detail.astro` | Home | 首页 | 否，面包屑导航 |
| Breadcrumb_Blog | `src/pages/Blog/Blog_detail.astro` | Blog | 博客 | 否，面包屑导航 |
| Badge_Featured | `src/pages/Blog/Blog_detail.astro` | Featured Article | 精选文章 | 否，UI 标签 |
| FAQ_Title | `src/pages/Blog/Blog_detail.astro` | Frequently Asked Questions | 常见问题 | 否 |
| Sidebar_Share | `src/pages/Blog/Blog_detail.astro` | Share | 分享 | 否，UI 标签 |
| Sidebar_TOC | `src/pages/Blog/Blog_detail.astro` | Table of Contents | 目录 | 否，UI 标签 |
| Related_Title | `src/pages/Blog/Blog_detail.astro` | Related Articles | 相关文章 | 否 |
| Related_Link | `src/pages/Blog/Blog_detail.astro` | Read More → | 阅读更多 → | 否 |
| Footer_CTA_Title | `src/pages/Blog/Blog_detail.astro` | Want to Learn More? | 想了解更多？ | 否 |
| Footer_CTA_Btn1 | `src/pages/Blog/Blog_detail.astro` | View Products | 查看产品 | 否 |
| Footer_CTA_Btn2 | `src/pages/Blog/Blog_detail.astro` | Contact Us | 联系我们 | 否 |
| Tags_For | `src/pages/Blog/Blog_detail.astro` | For: | 适用对象： | 否，UI 标签 |
| Tags_Stage | `src/pages/Blog/Blog_detail.astro` | Stage: | 阶段： | 否，UI 标签 |
| Tags_Keywords | `src/pages/Blog/Blog_detail.astro` | Keywords: | 关键词： | 否，UI 标签 |

### A.15.3 文档页 — documentation.astro

| Type | 文件路径:行号 | 原文本 | 翻译 | 是否需要修改 |
|------|-------------|--------|------|------------|
| Hero_Capsule | `src/pages/documentation.astro` | Factory Documents & Product Resources | 工厂文档与产品资源 | 否 |
| Hero_Title | `src/pages/documentation.astro` | Technical Documentation | 技术文档 | 否 |
| Hero_Desc | `src/pages/documentation.astro` | Access product information, technical specifications, quality documents, and factory support resources for PVC decorative films and related materials. | 访问 PVC 装饰膜及相关材料的产品信息、技术规格、质量文件和工厂支持资源。 | 否 |
| Hero_Stats | `src/pages/documentation.astro` | 100+ Documents / Regular Updates / 24/7 Access | 100+文档 / 定期更新 / 全天候访问 | 否 |
| Search_Placeholder | `src/pages/documentation.astro` | Search documentation, guides, and resources... | 搜索文档、指南和资源... | 否 |
| Quick_Links | `src/pages/documentation.astro` | Getting Started / API Docs / Compliance / FAQ | 入门指南 / API文档 / 合规 / 常见问题 | 否 |
| FAQ_Title | `src/pages/documentation.astro` | Frequently Asked Questions | 常见问题 | 否 |
| Help_Title | `src/pages/documentation.astro` | Need More Help? | 需要更多帮助？ | 否 |
| Help_Cards | `src/pages/documentation.astro` | Need Support? / Training Resources / Stay Updated | 需要支持？/ 培训资源 / 保持更新 | 否，为文档页通用功能卡片 |

> **说明：** 博客和文档页面的 UI 文本属于内容营销/支持类页面的通用标签，不影响核心转化路径，且英文表达准确，无需修改。后续如需优化，可考虑将博客 CTA 区域的 "Contact Us" 统一为 "Get Free Samples" 以保持全站 CTA 一致性，但优先级较低。