import React from 'react';
import { Home, Grid, FileText } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavigationProps {
  currentScreen: ScreenType;
  onChangeScreen: (screen: ScreenType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onChangeScreen }) => {
  return (
    <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        <button 
          onClick={() => onChangeScreen('title')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${currentScreen === 'title' ? 'text-primary' : 'text-gray-400'}`}
        >
          <Home size={24} strokeWidth={currentScreen === 'title' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button 
          onClick={() => onChangeScreen('paper')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${currentScreen === 'paper' ? 'text-primary' : 'text-gray-400'}`}
        >
          <FileText size={24} strokeWidth={currentScreen === 'paper' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Paper</span>
        </button>
        <button 
          onClick={() => onChangeScreen('apps')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${currentScreen === 'apps' ? 'text-primary' : 'text-gray-400'}`}
        >
          <Grid size={24} strokeWidth={currentScreen === 'apps' ? 2.5 : 2} />
          <span className="text-[10px] font-bold">Apps</span>
        </button>
      </div>
    </div>
  );
};
