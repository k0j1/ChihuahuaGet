import React from 'react';
import { Home, RotateCcw } from 'lucide-react';
import { StaminaDisplay } from './StaminaDisplay';
import { motion } from 'motion/react';

interface ResultScreenProps {
  score: number;
  stamina: number;
  nextRecoveryTime: number;
  balance: number;
  onReplay: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ score, stamina, nextRecoveryTime, balance, onReplay, onHome }) => {
  const canReplay = stamina > 0;

  return (
    <div className="flex flex-col h-full w-full justify-between pb-8">
      {/* Top Header */}
      <div className="flex justify-between items-start px-4 pt-4 shrink-0">
        <StaminaDisplay stamina={stamina} nextRecoveryTime={nextRecoveryTime} />
        
        {/* Balance Display */}
        <div className="bg-[#fff9e6] border-2 border-orange-200 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm min-w-[120px] justify-between">
          <div className="flex justify-center items-center bg-yellow-400 rounded-full w-8 h-8 border-2 border-yellow-200 shadow-inner">
            <span className="text-white font-black text-sm">C</span>
          </div>
          <div className="flex flex-col items-end leading-none">
            <span className="text-[10px] font-bold text-text-brown">CHH残高</span>
            <span className="text-lg font-black text-text-brown font-pop tracking-tight">
              {balance.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="w-full relative z-20"
        >
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-4xl font-black text-text-main text-outline-white mb-6">タイムアップ！</h2>
          
          <div className="bg-[#fff9e6] rounded-3xl p-6 shadow-button-sm border-2 border-orange-200 w-full max-w-sm mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-50 z-0" />
            <div className="relative z-10">
              <p className="text-sm font-bold text-text-muted mb-2 tracking-widest bg-orange-100 rounded-full inline-block px-3 py-1">獲得報酬</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-6xl font-pop font-black text-secondary drop-shadow-sm">{Math.max(0, score)}</span>
                <span className="text-2xl font-bold text-text-brown mt-4">CHH</span>
              </div>
              {score < 0 && (
                <p className="text-xs text-red-500 mt-3 font-bold bg-white/80 rounded-full py-1">⚠️ マイナスは0CHHとなります</p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xs space-y-4 z-20"
        >
          <button
            onClick={onReplay}
            disabled={!canReplay}
            className={`
              w-full flex items-center justify-center gap-2 py-4 rounded-full text-xl font-pop font-black border-4 border-white transition-transform
              ${canReplay 
                ? 'bg-primary text-white shadow-button-pink active:translate-y-2 active:shadow-button-sm' 
                : 'bg-gray-400 text-gray-200 border-gray-300 shadow-none cursor-not-allowed'}
            `}
          >
            <RotateCcw strokeWidth={3} className={canReplay ? 'text-white' : 'text-gray-200'} />
            もう一度遊ぶ
          </button>
          
          <button
            onClick={onHome}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-lg font-bold bg-[#fff9e6] border-4 border-[#ffdf4d] text-text-brown shadow-[0_4px_0_#dcb31c] hover:bg-yellow-50 active:translate-y-1 active:shadow-[0_2px_0_#dcb31c] transition-all"
          >
            <Home strokeWidth={2.5} />
            トップへ戻る
          </button>
        </motion.div>
      </div>
    </div>
  );
};
