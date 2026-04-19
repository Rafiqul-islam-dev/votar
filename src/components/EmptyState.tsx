import { SearchX, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

interface EmptyStateProps {
  hasSearched: boolean;
}

export default function EmptyState({ hasSearched }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      id="empty-state"
    >
      <div className="mb-6 opacity-20">
        {hasSearched ? (
          <SearchX size={64} className="text-text-muted" />
        ) : (
          <UserPlus size={64} className="text-text-muted" />
        )}
      </div>
      <h3 className="text-[16px] font-bold text-text-main mb-2">
        {hasSearched ? "কোন তথ্য পাওয়া যায়নি (No Records Found)" : "অনুসন্ধান শুরু করুন (Start Searching)"}
      </h3>
      <p className="text-[12px] text-text-muted max-w-sm mx-auto leading-relaxed">
        {hasSearched
          ? "আপনার দেয়া তথ্যের সাথে মিল আছে এমন কোন ভোটার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে নাম বা জন্ম তারিখ পুনরায় পরীক্ষা করুন।"
          : "ভোটারের প্রাথমিক তথ্যগুলো উপরে প্রদান করে আমাদের স্থানীয় ডাটাবেজে অনুসন্ধান শুরু করুন।"}
      </p>
    </motion.div>
  );
}
