import { useState, useCallback } from 'react';
import { Voter, SearchCriteria } from './types';
import { VoterService } from './services/voterService';
import SearchForm from './components/SearchForm';
import VoterCard from './components/VoterCard';
import EmptyState from './components/EmptyState';
import { motion, AnimatePresence } from 'motion/react';
import { Info, UserCheck } from 'lucide-react';

export default function App() {
  const [results, setResults] = useState<Voter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const searchResults = await VoterService.search(criteria);
      setResults(searchResults);
      
      // Smooth scroll to results on mobile
      if (window.innerWidth < 640) {
        const resultsElement = document.getElementById('results-section');
        setTimeout(() => {
          resultsElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-bg-main flex flex-col" id="main-app">
      {/* Header - Responsive Padding & Typography */}
      <header className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark pt-6 sm:pt-8 md:pt-12 pb-4 sm:pb-6 md:pb-8 px-3 sm:px-4 md:px-6 text-center text-white shadow-lg" id="app-header">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Icon + Title Container */}
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
            <UserCheck size={20} className="text-white opacity-90 flex-shrink-0 sm:w-6 sm:h-6" />
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              {hasSearched && !isLoading 
                ? 'অনুসন্ধানের ফলাফল'
                : '১নং ওয়ার্ড ভোটার তথ্য অনুসন্ধান'
              }
            </h1>
          </div>

          {/* Subtitle - Result Count */}
          <AnimatePresence mode="wait">
            {hasSearched && !isLoading && results.length > 0 && (
              <motion.p
                key="result-count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs sm:text-sm text-white/90 font-medium"
              >
                মোট <span className="font-bold">{results.length}</span>টি ফলাফল পাওয়া গেছে
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Main Content Area - Responsive Container */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} onReset={handleReset} isLoading={isLoading} />

        {/* Results Badge - Visible only on desktop when showing results */}
        <AnimatePresence mode="wait">
          {hasSearched && !isLoading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hidden sm:flex text-xs font-bold text-text-muted uppercase tracking-widest mb-4 items-center gap-2"
              id="results-counter"
            >
              <Info size={14} className="text-primary flex-shrink-0" />
              <span>মোট ফলাফল: {results.length.toString().padStart(2, '0')} টি</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area - Results, Loading, or Empty State */}
        <main className="relative" id="results-section" id="app-content-area">
          {/* Loading State */}
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 sm:py-24 space-y-4"
              >
                {/* Loading Spinner */}
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-600 rounded-full animate-pulse opacity-40"></div>
                  </div>
                </div>

                {/* Loading Text - Bengali */}
                <div className="text-center">
                  <p className="text-gray-600 font-bold text-sm sm:text-base animate-pulse">
                    ডাটাবেস অনুসন্ধান করছে...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    অনুগ্রহ করে অপেক্ষা করুন
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Grid - Responsive */}
          <AnimatePresence mode="wait">
            {!isLoading && results.length > 0 && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              >
                {results.map((voter, index) => (
                  <VoterCard key={voter.serial_no + index} voter={voter} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          <AnimatePresence mode="wait">
            {!isLoading && results.length === 0 && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState hasSearched={hasSearched} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Results Info Text - Mobile Only */}
        <AnimatePresence mode="wait">
          {hasSearched && !isLoading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden mt-6 text-center text-xs text-text-muted"
            >
              মোট <span className="font-bold text-text-main">{results.length}</span> টি ফলাফল পাওয়া গেছে
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - Responsive Padding */}
      <footer className="mt-auto py-6 sm:py-8 px-3 sm:px-4 md:px-6 text-center text-gray-400 text-xs sm:text-sm border-t border-gray-200">
        <p className="max-w-3xl mx-auto">
          © ২০২৬ সর্বস্বত্ব সংরক্ষিত। এই সিস্টেমটি তৈরি করেছেন{' '}
          <span className="font-semibold text-gray-500">
            <a 
              href="https://www.facebook.com/rafiqulislamsohelme/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              সোহেল
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
}
