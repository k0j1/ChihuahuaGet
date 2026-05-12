import React from 'react';
import { HelpCircle, Trophy, Settings } from 'lucide-react';
import { StaminaDisplay } from './StaminaDisplay';
import { GAME_VERSION } from '../constants';
import { motion } from 'motion/react';

interface TitleScreenProps {
  stamina: number;
  nextRecoveryTime: number;
  balance: number;
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ stamina, nextRecoveryTime, balance, onStart }) => {
  const canPlay = stamina > 0;

  return (
    <div className="flex flex-col h-full w-full justify-between pb-4">
      {/* Top Header */}
      <div className="flex justify-between items-start px-4 pt-4 shrink-0 relative">
        <StaminaDisplay stamina={stamina} nextRecoveryTime={nextRecoveryTime} />
        
        {/* Balance Display */}
        <div className="bg-[#fff9e6] border-2 border-orange-200 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm min-w-[120px] justify-between z-10">
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
        
        {/* Version Display */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/80 z-0">
          {GAME_VERSION}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Title Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative z-10 flex flex-col items-center top-[-20px]"
        >
          {/* Sparkles */}
          <div className="absolute top-0 right-[-20px] text-yellow-300 text-3xl animate-pulse">✨</div>
          <div className="absolute bottom-10 left-[-30px] text-yellow-300 text-2xl animate-pulse delay-75">✨</div>
          
          <div className="flex flex-col items-center font-pop transform rotate-[-3deg]">
            <h1 className="text-6xl font-black text-secondary text-outline-white leading-none tracking-tighter mb-[-10px]">
              Get
            </h1>
            <h1 className="text-7xl font-black text-tertiary text-outline-white leading-none tracking-tighter z-10">
              Food!
            </h1>
            <div className="relative mt-[-10px] z-20">
              <div className="bg-secondary rounded-full px-6 py-1 border-2 border-white shadow-md">
                <span className="text-white font-bold text-xl drop-shadow-md">🐾 Chihuahua 🐾</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Character with light rays */}
        <motion.div 
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="relative flex items-center justify-center mt-4 z-20"
        >
          {/* Light rays background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-white/0 to-transparent rounded-full" />
            <div className="absolute w-[300px] h-[300px] animate-spin-slow opacity-50">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-1/2 left-1/2 w-full h-[30px] bg-white/40 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)` }}
                />
              ))}
            </div>
          </div>
          
          {/* Character */}
          <div className="text-[120px] relative z-10 drop-shadow-xl transform origin-bottom hover:scale-105 transition-transform">
            🐶
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full px-8 mt-2 z-30"
        >
          <button
            onClick={onStart}
            disabled={!canPlay}
            className={`
              w-full flex items-center justify-center gap-2 py-4 rounded-full text-3xl font-pop font-black border-4 border-white transition-transform
              ${canPlay 
                ? 'bg-primary text-white shadow-button-pink active:translate-y-2 active:shadow-button-sm' 
                : 'bg-gray-400 text-gray-200 border-gray-300 shadow-none cursor-not-allowed'}
            `}
            style={canPlay ? { textShadow: '0 2px 4px rgba(0,0,0,0.2)' } : undefined}
          >
            🐾 プレイ開始 🐾
          </button>
        </motion.div>
      </div>

      {/* Bottom Menu */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full px-6 flex justify-center gap-4 mt-6 mb-4 z-20"
      >
        <button className="flex flex-col items-center justify-center w-20 h-20 bg-btn-yellow rounded-2xl border-2 border-white text-text-brown shadow-[0_4px_0_var(--color-btn-yellow-shadow)] active:translate-y-1 active:shadow-[0_2px_0_var(--color-btn-yellow-shadow)] transition-all">
          <HelpCircle size={32} strokeWidth={2.5} className="mb-1" />
          <span className="text-sm font-bold">ヘルプ</span>
        </button>
        
        <button className="flex flex-col items-center justify-center w-20 h-20 bg-btn-purple rounded-2xl border-2 border-white text-white shadow-[0_4px_0_var(--color-btn-purple-shadow)] active:translate-y-1 active:shadow-[0_2px_0_var(--color-btn-purple-shadow)] transition-all">
          <Trophy size={32} strokeWidth={2.5} className="mb-1 text-yellow-300 drop-shadow-md" />
          <span className="text-sm font-bold">ランキング</span>
        </button>
        
        <button className="flex flex-col items-center justify-center w-20 h-20 bg-btn-blue rounded-2xl border-2 border-white text-white shadow-[0_4px_0_var(--color-btn-blue-shadow)] active:translate-y-1 active:shadow-[0_2px_0_var(--color-btn-blue-shadow)] transition-all">
          <Settings size={32} strokeWidth={2.5} className="mb-1" />
          <span className="text-sm font-bold">設定</span>
        </button>
      </motion.div>

      {/* Footer message */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full px-2 z-20"
      >
        <div className="bg-[#cc8e5e] text-white rounded-full py-2 px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] border-b-4 border-[#8c5732] flex justify-center items-center gap-2">
          <span className="text-xs">🐾</span>
          <span className="text-sm font-bold">遊んでCHHをゲットしよう！</span>
          <span className="text-xs">🐾</span>
        </div>
      </motion.div>
    </div>
  );
};
