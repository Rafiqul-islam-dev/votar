import React, { useState } from 'react';
import { SearchCriteria } from '../types';
import { Search, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
 
interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  onReset: () => void;
  isLoading: boolean;
}
 
interface ValidationError {
  show: boolean;
  message: string;
}
 
export default function SearchForm({ onSearch, onReset, isLoading }: SearchFormProps) {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    father_name: '',
    mother_name: '',
    date_of_birth: '',
  });
 
  const [error, setError] = useState<ValidationError>({ show: false, message: '' });
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError({ show: false, message: '' });
 
    const isAnyFieldFilled = Object.values(criteria).some(val => val.trim() !== '');
    if (!isAnyFieldFilled) {
      setError({
        show: true,
        message: 'অনুগ্রহ করে অন্তত একটি ক্ষেত্র পূরণ করুন।',
      });
      return;
    }
 
    onSearch(criteria);
  };
 
  const handleReset = () => {
    setCriteria({
      name: '',
      father_name: '',
      mother_name: '',
      date_of_birth: '',
    });
    setError({ show: false, message: '' });
    onReset();
  };
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value }));
    if (error.show) {
      setError({ show: false, message: '' });
    }
  };
 
  const inputFields = [
    { id: 'name', label: 'নাম (Name)', placeholder: 'উদাঃ আব্দুল করিম', icon: '📝', delay: 0.1 },
    { id: 'father_name', label: 'পিতার নাম (Father\'s Name)', placeholder: 'পিতার নাম লিখুন', icon: '👨', delay: 0.2 },
    { id: 'mother_name', label: 'মাতার নাম (Mother\'s Name)', placeholder: 'মাতার নাম লিখুন', icon: '👩', delay: 0.3 },
    { id: 'date_of_birth', label: 'জন্ম তারিখ (Date of Birth)', placeholder: 'DD/MM/YYYY', icon: '📅', delay: 0.4 },
  ];
 
  return (
    <>
      {/* Error Toast */}
      {error.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 right-4 sm:bottom-auto sm:relative sm:mb-4 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg text-sm font-medium z-50 sm:z-auto shadow-lg"
          role="alert"
        >
          <div className="flex items-start gap-2">
            <span className="text-red-500 font-bold flex-shrink-0">⚠</span>
            <span>{error.message}</span>
          </div>
        </motion.div>
      )}
 
      {/* Main Form Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-3xl shadow-2xl border border-white/80 mb-8 relative overflow-hidden"
        style={{
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.08),
            inset 0 1px 2px rgba(255, 255, 255, 0.9),
            inset 0 0 0 1px rgba(0, 0, 0, 0.02)
          `,
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
 
        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              🔍 ভোটার খুঁজুন
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">দ্রুত এবং নির্ভরযোগ্য অনুসন্ধান সেবা</p>
          </motion.div>
 
          <form onSubmit={handleSubmit} className="mt-8">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {inputFields.map((field) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: field.delay, duration: 0.5 }}
                  className="col-span-1"
                >
                  <label
                    htmlFor={field.id}
                    className="block text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider mb-2.5 ml-1"
                  >
                    {field.icon} {field.label}
                  </label>
                  <div className="relative group">
                    <input
                      id={field.id}
                      type={field.id === 'date_of_birth' ? 'text' : 'text'}
                      name={field.id}
                      value={criteria[field.id as keyof SearchCriteria]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-b from-white to-slate-50 text-slate-800 font-medium text-sm sm:text-base border border-slate-200/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 focus:shadow-lg hover:shadow-lg group-hover:border-slate-300/50"
                      style={{
                        boxShadow: `
                          0 4px 15px rgba(0, 0, 0, 0.08),
                          inset 0 1px 3px rgba(0, 0, 0, 0.05),
                          inset 0 0 0 1px rgba(0, 0, 0, 0.03)
                        `,
                      }}
                      aria-label={field.label}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
 
            {/* Buttons Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10"
            >
              {/* Search Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative group px-6 py-3.5 sm:py-4 rounded-xl font-bold text-white text-sm sm:text-base transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: `
                    0 8px 20px rgba(102, 126, 234, 0.4),
                    inset 0 1px 2px rgba(255, 255, 255, 0.2)
                  `,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `
                    0 12px 30px rgba(102, 126, 234, 0.6),
                    inset 0 1px 2px rgba(255, 255, 255, 0.3)
                  `;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `
                    0 8px 20px rgba(102, 126, 234, 0.4),
                    inset 0 1px 2px rgba(255, 255, 255, 0.2)
                  `;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <Search size={18} />}
                  <span>অনুসন্ধান করুন</span>
                </div>
              </button>
 
              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="relative group px-6 py-3.5 sm:py-4 rounded-xl font-bold text-slate-700 text-sm sm:text-base transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
                  boxShadow: `
                    0 4px 15px rgba(0, 0, 0, 0.08),
                    inset 0 1px 2px rgba(255, 255, 255, 0.8)
                  `,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `
                    0 8px 25px rgba(0, 0, 0, 0.12),
                    inset 0 1px 2px rgba(255, 255, 255, 0.9)
                  `;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `
                    0 4px 15px rgba(0, 0, 0, 0.08),
                    inset 0 1px 2px rgba(255, 255, 255, 0.8)
                  `;
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw size={18} />
                  <span>রিসেট</span>
                </div>
              </button>
            </motion.div>
 
            {/* Helper Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-xs sm:text-sm text-slate-500 mt-6 font-medium"
            >
              ✨ অন্তত একটি ক্ষেত্র পূরণ করে অনুসন্ধান শুরু করুন
            </motion.p>
          </form>
        </div>
      </motion.div>
    </>
  );
}