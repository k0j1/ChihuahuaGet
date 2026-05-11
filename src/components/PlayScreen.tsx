import React from 'react';
import { GameItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';

interface PlayScreenProps {
  score: number;
  timeLeft: number;
  currentItems: { id: string; item: GameItem; x: number; y: number }[];
  onTapItem: (id: string) => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({ score, timeLeft, currentItems, onTapItem }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Header Info */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-card flex items-center gap-2 pointer-events-auto">
          <Clock className={`w-5 h-5 ${timeLeft <= 3 ? 'text-danger animate-pulse' : 'text-primary'}`} />
          <span className={`text-xl font-mono font-bold ${timeLeft <= 3 ? 'text-danger' : 'text-text-main'}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-card flex flex-col items-end pointer-events-auto">
          <span className="text-xs text-text-muted font-bold tracking-wide">SCORE</span>
          <span className="text-xl font-mono font-black text-text-main">{score} <span className="text-sm font-sans font-bold">CHH</span></span>
        </div>
      </div>

      {/* Play Area */}
      <div className="flex-1 relative w-full h-full">
        <AnimatePresence>
          {currentItems.map(currentItem => (
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute flex flex-col items-center justify-center tap-highlight-transparent"
              style={{
                left: `${currentItem.x}%`,
                top: `${currentItem.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
              }}
              onPointerDown={(e) => {
                e.preventDefault(); // Prevent touch delay / scroll
                onTapItem(currentItem.id);
              }}
            >
              <div className="w-20 h-20 bg-white shadow-card rounded-full flex items-center justify-center text-5xl cursor-pointer active:scale-90 transition-transform select-none">
                {currentItem.item.icon}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
