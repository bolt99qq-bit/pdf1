import React from 'react';
import { ViewState, NavigationProps } from '../types';
import { Icons } from './Icons';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: ViewState.HOME, label: 'Asosiy', icon: Icons.Home },
  { id: ViewState.SEARCH, label: 'Qidirish', icon: Icons.Search },
  { id: ViewState.POPULAR, label: 'Mashhurlar', icon: Icons.Flame },
  { id: ViewState.NEW, label: 'Yangilar', icon: Icons.Sparkles },
];

export const BottomNav: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  // Hide nav on Detail or Reader views
  if (currentView === ViewState.DETAIL || currentView === ViewState.READER) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pointer-events-none">
      <nav className="glass rounded-2xl flex justify-between items-center px-6 py-3 shadow-lg shadow-gray-200/50 pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className="relative flex flex-col items-center justify-center w-16"
            >
              <div className={`transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-3 w-1 h-1 bg-blue-600 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};