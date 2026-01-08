import React, { useState, useEffect } from 'react';
import { Book, Theme } from '../types';
import { Icons } from '../components/Icons';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFReaderProps {
  book: Book;
  onClose: () => void;
}

export const PDFReader: React.FC<PDFReaderProps> = ({ book, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [theme, setTheme] = useState<Theme>('light');
  const [loading, setLoading] = useState(true);

  // Auto-hide controls
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (controlsVisible) {
      timeout = setTimeout(() => setControlsVisible(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [controlsVisible]);

  const toggleControls = () => setControlsVisible(!controlsVisible);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      return Math.max(1, Math.min(newPage, numPages || 1));
    });
  };

  const getThemeColors = () => {
    switch(theme) {
      case 'dark': return 'bg-gray-900 text-gray-300';
      case 'sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      default: return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${getThemeColors()} transition-colors duration-300`}>
      {/* Top Bar */}
      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 p-4 glass z-50 flex justify-between items-center"
          >
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100/20">
              <Icons.X size={24} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
            </button>
            <div className="flex gap-4">
               <button onClick={() => setTheme('light')} className={`w-6 h-6 rounded-full border border-gray-300 bg-white ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`} />
               <button onClick={() => setTheme('sepia')} className={`w-6 h-6 rounded-full border border-gray-300 bg-[#f4ecd8] ${theme === 'sepia' ? 'ring-2 ring-blue-500' : ''}`} />
               <button onClick={() => setTheme('dark')} className={`w-6 h-6 rounded-full border border-gray-500 bg-gray-900 ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`} />
            </div>
            <div className="flex gap-2">
               <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-2">
                 <Icons.ZoomOut size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}/>
               </button>
               <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="p-2">
                 <Icons.ZoomIn size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-900'}/>
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        className="flex-1 overflow-auto flex items-center justify-center pt-20 pb-20 no-scrollbar touch-pan-x"
        onClick={toggleControls}
      >
        {loading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
             <p className="text-sm opacity-60">Kitob yuklanmoqda...</p>
           </div>
        )}
        
        <Document
          file={book.pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          error={
             <div className="text-center p-8">
                <p className="text-red-500 mb-2">Xatolik yuz berdi</p>
                <p className="text-sm opacity-60">PDF faylni ochib bo'lmadi.</p>
             </div>
          }
          className="shadow-2xl"
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            width={window.innerWidth * 0.95}
            className="shadow-xl"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Bottom Progress Bar */}
      <AnimatePresence>
        {controlsVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-6 glass z-50 pb-8"
          >
            <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); changePage(-1); }}
                disabled={pageNumber <= 1}
                className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30"
              >
                <Icons.ChevronLeft size={24} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
              </button>
              
              <div className="flex-1 flex flex-col items-center gap-2">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                   {pageNumber} / {numPages || '--'}
                </span>
                <input 
                  type="range" 
                  min={1} 
                  max={numPages || 1} 
                  value={pageNumber} 
                  onChange={(e) => setPageNumber(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); changePage(1); }}
                disabled={pageNumber >= (numPages || 1)}
                className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30 rotate-180"
              >
                <Icons.ChevronLeft size={24} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};