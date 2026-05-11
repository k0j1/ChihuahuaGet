import React from 'react';
import { Home, RotateCcw } from 'lucide-react';
import { StaminaDisplay } from './StaminaDisplay';
import { motion } from 'motion/react';

interface ResultScreenProps {
  score: number;
  stamina: number;
  nextRecoveryTime: number;
  onReplay: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, stamina, nextRecoveryTime, onReplay, onHome }) => {
  const canReplay = stamina > 0;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-6 text-center space-y-8">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full"
      >
        <h2 className="text-3xl font-black text-text-main mb-6">タイムアップ！</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-sm mx-auto mb-8 border border-amber-100">
          <p className="text-sm font-bold text-text-muted mb-2 tracking-widest">獲得報酬</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-mono font-black text-primary">{Math.max(0, score)}</span>
            <span className="text-xl font-bold text-text-main mt-3">CHH</span>
          </div>
          {score < 0 && (
            <p className="text-xs text-danger mt-2 font-bold">マイナスは0CHHとして扱われます</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StaminaDisplay stamina={stamina} nextRecoveryTime={nextRecoveryTime} />
      </motion.div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-xs space-y-4"
      >
        <button
          onClick={onReplay}
          disabled={!canReplay}
          className={`
            w-full flex items-center justify-center gap-2 py-4 rounded-full text-lg font-bold transition-all shadow-button
            ${canReplay 
              ? 'bg-primary text-white hover:bg-primary-hover active:scale-95' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}
          `}
        >
          <RotateCcw className={canReplay ? 'text-white' : 'text-gray-500'} />
          もう一度遊ぶ
        </button>
        
        <button
          onClick={onHome}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-lg font-bold bg-white text-text-main shadow-card hover:bg-gray-50 active:scale-95 transition-all"
        >
          <Home className="text-text-muted" />
          トップへ戻る
        </button>
      </motion.div>
    </div>
  );
};
