import React, { useState } from 'react';
import { Voter } from '../types';
import { motion } from 'motion/react';
import { Copy, Share2, CheckCircle } from 'lucide-react';
 
interface VoterCardProps {
  voter: Voter;
  index: number;
}
 
const VoterCard: React.FC<VoterCardProps> = ({ voter, index }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
 
  const handleCopy = () => {
    const text = `
নাম: ${voter.name}
ভোটার নং: ${voter.voter_no}
পিতার নাম: ${voter.father_name}
মাতার নাম: ${voter.mother_name}
জন্ম তারিখ: ${voter.date_of_birth}
ঠিকানা: ${voter.address}
    `.trim();
 
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${voter.name} - ভোটার তথ্য`,
        text: `${voter.name} - ভোটার নং: ${voter.voter_no}`,
      }).catch((err) => console.log('Share failed:', err));
    }
  };
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      <div
        className="relative bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-2xl overflow-hidden transition-all duration-300 transform"
        style={{
          boxShadow: hovered
            ? `0 35px 80px rgba(0, 0, 0, 0.12),
               inset 0 1px 2px rgba(255, 255, 255, 1),
               inset 0 0 0 1px rgba(0, 0, 0, 0.03)`
            : `0 20px 60px rgba(0, 0, 0, 0.08),
               inset 0 1px 2px rgba(255, 255, 255, 0.9),
               inset 0 0 0 1px rgba(0, 0, 0, 0.02)`,
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        {/* Decorative Gradient Border */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
 
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-200/10 to-purple-200/10 rounded-full blur-xl"></div>
 
        {/* Content */}
        <div className="relative z-10 p-5 sm:p-6">
          {/* Header with Serial Number and Gender */}
          <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-slate-200/50">
            {/* Left: Gender Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.1 }}
            >
              <span
                className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                style={{
                  background: voter.gender === 'মহিলা'
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: `0 4px 15px rgba(${voter.gender === 'মহিলা' ? '245, 87, 108' : '102, 126, 234'}, 0.3)`,
                }}
              >
                {voter.gender === 'মহিলা' ? '👩 মহিলা' : '👨 পুরুষ'}
              </span>
            </motion.div>
 
            {/* Right: Serial Number Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.15 }}
              className="flex-shrink-0"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center font-bold text-white text-lg sm:text-xl"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: `0 8px 20px rgba(102, 126, 234, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
                }}
              >
                #{voter.serial_no}
              </div>
            </motion.div>
          </div>
 
          {/* Voter Name */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.2 }}
            className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 break-words leading-tight"
          >
            {voter.name}
          </motion.h3>
 
          {/* Info Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.25 }}
            className="space-y-3 mb-5"
          >
            {/* Voter Number */}
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">ভোটার নং</span>
              <span className="text-sm sm:text-base font-medium text-slate-800 break-all">{voter.voter_no}</span>
            </div>
 
            {/* Father's Name */}
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">পিতার নাম</span>
              <span className="text-sm sm:text-base font-medium text-slate-800">{voter.father_name}</span>
            </div>
 
            {/* Mother's Name */}
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">মাতার নাম</span>
              <span className="text-sm sm:text-base font-medium text-slate-800">{voter.mother_name}</span>
            </div>
 
            {/* Date of Birth */}
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">জন্ম তারিখ</span>
              <span className="text-sm sm:text-base font-medium text-slate-800">{voter.date_of_birth}</span>
            </div>
 
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 my-3"></div>
 
            {/* Address */}
            <div className="grid grid-cols-[140px_1fr] gap-4">
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">ঠিকানা</span>
              <span className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed break-words">
                {voter.address}
              </span>
            </div>
          </motion.div>
 
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 + 0.3 }}
            className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-200/50"
          >
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="relative group/btn flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm text-slate-700 transition-all duration-300 overflow-hidden min-h-10"
              style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.8)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)`;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.8)`;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
              title="তথ্য কপি করুন"
            >
              {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
              <span className="hidden sm:inline">কপি</span>
            </button>
 
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="relative group/btn flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm text-slate-700 transition-all duration-300 overflow-hidden min-h-10"
              style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.8)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.9)`;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.8)`;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
              title="শেয়ার করুন"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">শেয়ার</span>
            </button>
          </motion.div>
        </div>
 
        {/* Copy Success Animation */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-700 font-bold text-sm sm:text-base backdrop-blur-sm"
          >
            ✓ কপি হয়েছে
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
 
export default VoterCard;