import React from 'react';
import { Play } from 'lucide-react';
import { StaminaDisplay } from './StaminaDisplay';
import { GAME_VERSION } from '../constants';
import { motion } from 'motion/react';

interface TitleScreenProps {
  stamina: number;
  nextRecoveryTime: number;
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ stamina, nextRecoveryTime, onStart }) => {
  const canPlay = stamina > 0;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center space-y-12">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div className="text-6xl mb-4">🐶</div>
        <h1 className="text-4xl font-black text-text-main leading-tight tracking-tight drop-shadow-sm">
          チワワ<br />
          <span className="text-primary">餌ゲット</span><br />
          ゲーム
        </h1>
        <div className="mt-2 text-sm text-text-muted font-mono">{GAME_VERSION}</div>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <StaminaDisplay stamina={stamina} nextRecoveryTime={nextRecoveryTime} />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-xs"
      >
        <button
          onClick={onStart}
          disabled={!canPlay}
          className={`
            w-full flex items-center justify-center gap-2 py-4 rounded-full text-xl font-bold shadow-button transition-all
            ${canPlay 
              ? 'bg-primary text-white hover:bg-primary-hover active:scale-95' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}
          `}
        >
          <Play className={canPlay ? 'fill-white' : 'fill-gray-500'} />
          ゲーム開始
        </button>
        {!canPlay && (
          <p className="text-sm text-danger mt-3 font-medium">
            スタミナが足りません
          </p>
        )}
      </motion.div>
    </div>
  );
};
