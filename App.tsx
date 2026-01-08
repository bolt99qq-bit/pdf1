import React, { useState } from 'react';
import { ViewState, Book } from './types';
import { BOOKS } from './constants';
import { BottomNav } from './components/BottomNav';
import { Home } from './views/Home';
import { BookDetail } from './views/BookDetail';
import { PDFReader } from './views/PDFReader';
import { BookCard } from './components/BookCard';
import { Icons } from './components/Icons';

// Placeholder views for simpler sections
const SimpleGrid: React.FC<{ title: string; filter?: (b: Book) => boolean; onBookClick: (b: Book) => void }> = ({ title, filter, onBookClick }) => {
  const books = filter ? BOOKS.filter(filter) : BOOKS;
  return (
    <div className="p-4 pb-32 pt-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="grid grid-cols-2 gap-4">
        {books.map(book => (
          <BookCard key={book.id} book={book} onClick={onBookClick} />
        ))}
      </div>
    </div>
  );
};

const SearchView: React.FC<{ onBookClick: (b: Book) => void }> = ({ onBookClick }) => {
  const [query, setQuery] = useState('');
  const filtered = BOOKS.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-4 pb-32 pt-4 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Qidirish</h1>
      <div className="relative mb-6">
        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Kitob, muallif..." 
          className="w-full bg-white rounded-xl py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>
      
      {query && (
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map(book => (
              <BookCard key={book.id} book={book} onClick={onBookClick} layout="list" />
            ))
          ) : (
             <div className="text-center text-gray-400 mt-10">
               <p>Hech narsa topilmadi</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setView(ViewState.DETAIL);
  };

  const handleBack = () => {
    setView(ViewState.HOME); // Or history back logic
    setSelectedBook(null);
  };

  const handleRead = (book: Book) => {
    setView(ViewState.READER);
  };

  const handleCloseReader = () => {
    setView(ViewState.DETAIL);
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return <Home onBookClick={handleBookClick} />;
      case ViewState.SEARCH:
        return <SearchView onBookClick={handleBookClick} />;
      case ViewState.POPULAR:
        return <SimpleGrid title="Mashhurlar" filter={b => !!b.isPopular} onBookClick={handleBookClick} />;
      case ViewState.NEW:
        return <SimpleGrid title="Yangilar" filter={b => !!b.isNew} onBookClick={handleBookClick} />;
      case ViewState.DETAIL:
        return selectedBook ? <BookDetail book={selectedBook} onBack={handleBack} onRead={handleRead} /> : null;
      case ViewState.READER:
        return selectedBook ? <PDFReader book={selectedBook} onClose={handleCloseReader} /> : null;
      default:
        return <Home onBookClick={handleBookClick} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      <main className="mx-auto w-full md:max-w-md bg-[#F5F5F7] min-h-screen relative md:shadow-2xl overflow-hidden">
        {renderContent()}
        <BottomNav currentView={view} onChangeView={setView} />
      </main>
    </div>
  );
};

export default App;