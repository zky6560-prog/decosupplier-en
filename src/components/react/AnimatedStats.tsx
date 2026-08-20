import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: '15', label: 'Years of Manufacturing Excellence', suffix: '+' },
  { value: '3', label: 'In-house Manufacturing Facilities', suffix: '' },
  { value: '1000', label: 'In-Stock Print Cylinders', suffix: '+' },
  { value: '30', label: 'Export Markets', suffix: '+' },
];

export default function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
            className="text-4xl lg:text-5xl font-bold text-white mb-2"
          >
            {stat.value}{stat.suffix}
          </motion.div>
          <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}