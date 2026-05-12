import React, { useState } from 'react';
import { GameItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause } from 'lucide-react';

interface PlayScreenProps {
  score: number;
  combo: number;
  timeLeft: number;
  isPaused: boolean;
  currentItems: { id: string; item: GameItem; x: number; y: number }[];
  onTapItem: (id: string) => void;
  onPause: () => void;
  onResume: () => void;
  onQuit: () => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({ 
  score, 
  combo, 
  timeLeft, 
  isPaused,
  currentItems, 
  onTapItem,
  onPause,
  onResume,
  onQuit
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleGiveUpClick = () => {
    onPause();
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    onQuit();
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
    // 戻った時、明示的に「一時停止状態」になるようにそのまま（onResumeは呼ばない）
    // もしくは仕様に応じて onResume() を呼ぶ。元の指示は「一時停止状態のゲーム画面に戻って」
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* HUD Header */}
      <div className="flex justify-between items-center px-4 pt-6 pb-2 gap-2 z-20">
        <div className="bg-white border-4 border-[#ffdf4d] rounded-2xl px-4 py-2 flex flex-col items-center shadow-md">
          <span className="text-[10px] font-black text-[#663d23]">TIME</span>
          <span className="text-2xl font-black text-[#663d23] font-pop mt-[-2px]">{(timeLeft).toFixed(1).padStart(4, '0')}</span>
        </div>
        <div className="bg-white border-4 border-[#ff8fb0] rounded-2xl px-4 py-2 flex flex-col items-center shadow-md flex-1">
          <span className="text-[10px] font-black text-[#663d23]">SCORE</span>
          <span className="text-4xl font-black text-primary text-outline-white font-pop mt-[-4px] tracking-tight">{score}</span>
        </div>
        <div className="bg-white border-4 border-[#ffad33] rounded-2xl px-4 py-2 flex flex-col items-center shadow-md">
          <span className="text-[10px] font-black text-[#663d23]">COMBO</span>
          <span className="text-2xl font-black text-[#ffad33] text-outline-white font-pop mt-[-2px]">x{combo}</span>
        </div>
      </div>

      {/* Tap Ribbon */}
      <div className="relative z-20 flex justify-center -mt-2 pointer-events-none">
        <div className="bg-[#ff8fb0] border-4 border-[#cc4a64] rounded-full px-8 py-2 text-white font-black text-xl shadow-md rotate-[-2deg]">
          タップでゲット！
        </div>
      </div>

      {/* Play Area */}
      <div className="flex-1 relative w-full overflow-hidden">
        {/* Background Dog */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-[220px] pointer-events-none">
          <img 
            src="https://getfood-chihuahua.k0j1.v2002.coreserver.jp/images/Chihuahua_Back01.png" 
            alt="Chihuahua" 
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>

        <AnimatePresence>
          {currentItems.map(currentItem => (
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute flex flex-col items-center justify-center z-30"
              style={{
                left: `${currentItem.x}%`,
                top: `${currentItem.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                onTapItem(currentItem.id);
              }}
            >
              <div className="text-6xl drop-shadow-md select-none transform hover:scale-110 transition-transform">
                {currentItem.item.icon}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Pause Overlay */}
        <AnimatePresence>
          {isPaused && !showConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl font-black text-white drop-shadow-md mb-8 tracking-wider">PAUSE</h2>
              <button 
                onClick={onResume}
                className="pink-button text-2xl !py-4 !px-12 shadow-button-pink"
              >
                <span>ゲーム再開</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Give Up Confirm Overlay */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm flex flex-col items-center shadow-2xl border-4 border-orange-200">
                <div className="text-5xl mb-4">😢</div>
                <h3 className="text-2xl font-black text-text-main mb-2">あきらめますか？</h3>
                <p className="text-text-muted font-bold mb-8 text-center text-sm">
                  あきらめると、<br/>獲得したCHHはリセットされます。
                </p>
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={handleConfirmNo}
                    className="flex-1 py-4 bg-gray-200 rounded-full text-text-main font-bold border-b-4 border-gray-300 active:translate-y-1 active:border-b-0"
                  >
                    いいえ
                  </button>
                  <button 
                    onClick={handleConfirmYes}
                    className="flex-1 py-4 bg-primary text-white rounded-full font-bold border-b-4 border-primary-shadow active:translate-y-1 active:border-b-0"
                  >
                    はい
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer HUD */}
      <div className="bg-[#fff9e6] p-4 flex gap-4 items-center z-20 border-t-4 border-[#ffd966]">
        <button 
          onClick={isPaused ? onResume : onPause}
          className="bg-[#ff8fb0] p-4 rounded-2xl border-4 border-[#cc4a64] text-white active:translate-y-1 transition-transform shadow-sm"
        >
          {isPaused ? <Play size={24} className="fill-white" /> : <Pause size={24} className="fill-white" />}
        </button>
        <div className="flex-1 bg-white border-4 border-[#ffdf4d] rounded-2xl px-4 py-3 flex justify-between items-center shadow-inner">
          <span className="text-[10px] sm:text-xs font-bold text-[#663d23]">獲得CHH（予定）</span>
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-yellow-400 rounded-full w-6 h-6 border-2 border-yellow-200 shadow-inner">
              <span className="text-white font-black text-[10px]">C</span>
            </div>
            <span className="text-2xl font-black text-[#ff8fb0] font-pop tracking-tight">{score}</span>
          </div>
        </div>
        <button 
          onClick={handleGiveUpClick}
          className="bg-[#7dc4ff] border-4 border-[#4d9de0] rounded-2xl px-4 py-3 text-white justify-center items-center font-bold text-sm sm:text-base active:translate-y-1 transition-transform shadow-sm"
        >
          あきらめる
        </button>
      </div>
    </div>
  );
};
