import { motion } from 'framer-motion';

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

export function StaticPage({ title, children }: StaticPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="p-6 rounded-xl bg-emerald-800/20 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-emerald-100 mb-6">{title}</h2>
        <div className="prose prose-invert prose-emerald max-w-none">
          {children}
        </div>
      </div>
    </motion.div>
  );
}