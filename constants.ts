import { Book } from './types';

// Using a reliable sample PDF for demonstration
const SAMPLE_PDF = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    coverUrl: 'https://picsum.photos/id/24/300/450',
    description: 'Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door.',
    pages: 368,
    size: '4.2 MB',
    language: 'EN',
    pdfUrl: SAMPLE_PDF,
    rating: 4.8,
    isPopular: true
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://picsum.photos/id/20/300/450',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    pages: 320,
    size: '3.1 MB',
    language: 'UZ',
    pdfUrl: SAMPLE_PDF,
    rating: 4.9,
    isPopular: true,
    isNew: true
  },
  {
    id: '3',
    title: 'Deep Work',
    author: 'Cal Newport',
    coverUrl: 'https://picsum.photos/id/3/300/450',
    description: 'Deep work is the ability to focus without distraction on a cognitively demanding task.',
    pages: 304,
    size: '2.8 MB',
    language: 'EN',
    pdfUrl: SAMPLE_PDF,
    rating: 4.7,
    isNew: true
  },
  {
    id: '4',
    title: 'Essentialism',
    author: 'Greg McKeown',
    coverUrl: 'https://picsum.photos/id/42/300/450',
    description: 'The Way of the Essentialist isn’t about getting more done in less time. It’s about getting only the right things done.',
    pages: 272,
    size: '2.5 MB',
    language: 'RU',
    pdfUrl: SAMPLE_PDF,
    rating: 4.6,
    isPopular: true
  },
  {
    id: '5',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: 'https://picsum.photos/id/56/300/450',
    description: 'The major New York Times bestseller that has made us see the world differently.',
    pages: 499,
    size: '5.1 MB',
    language: 'EN',
    pdfUrl: SAMPLE_PDF,
    rating: 4.5
  }
];