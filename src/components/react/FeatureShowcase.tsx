import { motion } from 'motion/react';

// ===== 产品图片导入 =====
import pvcImage from '@assets/pvc-decorative-film.jpg';
import lvtImage from '@assets/lvt-flooring.jpg';
import pvcPanelImage from '@assets/pvc-wall-panel.jpg';
import selfAdhesiveFilmImage from '@assets/interior-self-adhesive-film.jpg';
import foamWallpaperImage from '@assets/self-adhesive-foam-wall-roll.png';
import pvc3dImage from '@assets/3d-pvc-wall-panel.jpg';
import wallpapersImage from '@assets/peel-stick-wallpapers.png';

const features = [
  {
    id: 1,
    title: 'PVC Decorative Film',
    description: 'High-performance surface wrapping and vacuum pressing films for furniture, kitchen cabinets, and interior doors — available in wood grain, marble, and solid color finishes with superior scratch and stain resistance.',
    image: pvcImage,
    href: '/products/pvc-decorative-film',
  },
  {
    id: 2,
    title: 'Peel and Stick Vinyl Flooring',
    description: 'Premium luxury vinyl tile flooring — waterproof, scratch-resistant, with realistic wood and stone visuals for commercial and residential spaces.',
    image: lvtImage,
    href: '/products/lvt-flooring',
  },
  {
    id: 3,
    title: 'PVC Wall Panel',
    description: 'Stone plastic composite panels — 100% waterproof, moisture-proof, and quick-install with UV-coated surface protection for lasting beauty.',
    image: pvcPanelImage,
    href: '/products/pvc_wall_panel',
  },
  {
    id: 4,
    title: 'Self-Adhesive Decorative Film',
    description: 'Self-adhesive film for easy surface renovation — ideal for updating kitchen cabinets, furniture, and walls without the mess of traditional renovation.',
    image: selfAdhesiveFilmImage,
    href: '/products/interior-self-adhesive-film',
  },
  {
    id: 5,
    title: 'Self-adhesive Foam Wallpaper Roll',
    description: 'Lightweight 3D texture foam panels with sound absorption and thermal insulation — soft, impact-resistant, and easy to install.',
    image: foamWallpaperImage,
    href: '/products/self-adhesive-foam-wall-panels',
  },
  {
    id: 6,
    title: '3D PVC Wall Panel',
    description: 'Sculptural three-dimensional wall panels for feature walls, lobbies, and hospitality spaces — lightweight, durable, and available in modern geometric designs that create stunning visual impact.',
    image: pvc3dImage,
    href: '/products/3d-pvc-wall-panels',
  },
  {
    id: 7,
    title: 'Peel & Stick Wallpapers',
    description: 'Explore our complete range of decorative surface solutions — including custom patterns, specialty finishes, and tailored OEM/ODM options to meet your unique project requirements.',
    image: wallpapersImage,
    href: '/products/peel-and-stick-wallpapers',
  },
];

export default function FeatureShowcase() {
  // 统一卡片高度
  const cardHeight = 'h-56 md:h-64';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {features.map((feature, index) => {
        // 第1个产品占整行
        const colSpan = index === 0 
          ? 'col-span-2 lg:col-span-3' 
          : 'col-span-1';
        
        return (
          <a
            key={feature.id}
            href={feature.href}
            className={`group cursor-pointer ${colSpan} block`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
              <div className={`relative ${cardHeight} overflow-hidden`}>
                <motion.img
                  src={feature.image.src}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* 默认底部渐变遮罩 + 标题 */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white pointer-events-none">
                  <h3 className="text-base md:text-xl font-bold">{feature.title}</h3>
                </div>

                {/* 悬停覆盖层 */}
                <div className="absolute inset-0 bg-slate-800/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-white/90 leading-relaxed line-clamp-4 md:line-clamp-6">{feature.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
          </a>
        );
      })}
    </div>
  );
}