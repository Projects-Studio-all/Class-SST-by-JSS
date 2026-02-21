import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
  key?: string;
  title: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export function SubjectCard({ title, icon: Icon, color, onClick }: SubjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${color} p-6 rounded-2xl shadow-lg cursor-pointer text-white flex flex-col items-center justify-center gap-4 transition-all duration-300 border-b-4 border-black/20`}
    >
      <div className="bg-white/20 p-4 rounded-full">
        <Icon size={48} />
      </div>
      <h3 className="text-xl font-bold text-center font-sans">{title}</h3>
    </motion.div>
  );
}
