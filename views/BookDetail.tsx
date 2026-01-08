import React, { useState } from 'react';
import { Book } from '../types';
import { Icons } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onRead: (book: Book) => void;
}

export const BookDetail: React.FC<BookDetailProps> = ({ book, onBack, onRead }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F2F2F7] relative"
    >
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-700 shadow-sm active:scale-95 transition-transform"
        >
          <Icons.ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <Icons.Heart 
            size={20} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"} 
          />
        </button>
      </div>

      {/* Hero Section */}
      <div className="pt-20 pb-8 px-8 flex flex-col items-center">
        {/* 3D Cover */}
        <div className="book-container mb-8">
          <motion.div 
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: -15, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="w-48 h-72 rounded-lg bg-white relative book-cover"
          >
            <img 
              src={book.coverUrl} 
              alt={book.title} 
              className="w-full h-full object-cover rounded-r-lg shadow-2xl"
            />
            {/* Spine effect */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/20 to-black/20 z-10 rounded-l-sm" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-2"
        >
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{book.title}</h1>
          <p className="text-lg text-gray-500 font-medium">{book.author}</p>
        </motion.div>
      </div>

      {/* Info Stats */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-6 mb-8"
      >
        <div className="bg-white rounded-2xl p-4 flex justify-between shadow-sm border border-gray-100">
          <div className="text-center flex-1 border-r border-gray-100">
            <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Sahifalar</p>
            <p className="text-gray-900 font-bold mt-1">{book.pages}</p>
          </div>
          <div className="text-center flex-1 border-r border-gray-100">
            <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Hajmi</p>
            <p className="text-gray-900 font-bold mt-1">{book.size}</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Til</p>
            <p className="text-gray-900 font-bold mt-1">{book.language}</p>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-6 mb-28"
      >
        <h3 className="font-bold text-gray-900 mb-2">Kitob haqida</h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {book.description}
        </p>
      </motion.div>

      {/* Sticky Bottom Actions */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] glass border-t-0 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 flex gap-4"
      >
        <button 
          onClick={() => onRead(book)}
          className="flex-1 bg-gray-900 text-white font-semibold py-4 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
        >
          <Icons.BookOpen size={20} />
          O'qish
        </button>
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 bg-gray-200 text-gray-900 font-semibold py-4 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Icons.Download size={20} />
              Yuklash
            </>
          )}
        </button>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 glass-dark px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl"
          >
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white font-medium text-sm">Muvaffaqiyatli yuklandi</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};