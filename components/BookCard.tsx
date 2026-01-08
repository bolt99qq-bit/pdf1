import React from 'react';
import { Book } from '../types';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
  layout?: 'grid' | 'list';
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick, layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(book)}
        className="flex gap-4 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-3"
      >
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-16 h-24 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">{book.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{book.author}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{book.language}</span>
            <span className="text-xs text-gray-400">{book.size}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(book)}
      className="flex flex-col gap-2 w-full"
    >
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{book.title}</h3>
        <p className="text-gray-500 text-xs truncate">{book.author}</p>
      </div>
    </motion.div>
  );
};