import React from 'react';
import { Book } from '../types';
import { BOOKS } from '../constants';
import { BookCard } from '../components/BookCard';
import { motion } from 'framer-motion';

interface HomeProps {
  onBookClick: (book: Book) => void;
}

export const Home: React.FC<HomeProps> = ({ onBookClick }) => {
  const featured = BOOKS.filter(b => b.isPopular);
  const newReleases = BOOKS.filter(b => b.isNew);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="pb-32 pt-4 px-4 space-y-8"
    >
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kutubxona</h1>
          <p className="text-gray-500 text-sm">Bugun nima o'qiymiz?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
          <img src="https://picsum.photos/id/64/100/100" alt="Avatar" />
        </div>
      </header>

      {/* Featured Section */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tavsiya etamiz</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 no-scrollbar snap-x">
          {featured.map((book) => (
            <div key={book.id} className="min-w-[140px] w-[140px] snap-start">
               <BookCard book={book} onClick={onBookClick} />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-800">Yangi kitoblar</h2>
        </div>
        <div className="space-y-3">
          {newReleases.map((book) => (
            <motion.div key={book.id} variants={item}>
              <BookCard book={book} onClick={onBookClick} layout="list" />
            </motion.div>
          ))}
        </div>
      </section>
      
       {/* General List Section */}
       <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-800">Barchasi</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {BOOKS.map((book) => (
            <motion.div key={book.id} variants={item}>
              <BookCard book={book} onClick={onBookClick} />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};