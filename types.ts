export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  pages: number;
  size: string;
  language: string;
  pdfUrl: string;
  rating: number;
  isNew?: boolean;
  isPopular?: boolean;
}

export enum ViewState {
  HOME = 'ASOSIY',
  SEARCH = 'QIDIRISH',
  POPULAR = 'MASHHURLAR',
  NEW = 'YANGILAR',
  DETAIL = 'DETAIL',
  READER = 'READER'
}

export interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export type Theme = 'light' | 'sepia' | 'dark';