import React from 'react';
import { StaminaDisplay } from './StaminaDisplay';
import { GAME_VERSION } from '../constants';
import { motion } from 'motion/react';
import { useFarcaster } from '../hooks/useFarcaster';

interface TitleScreenProps {
  stamina: number;
  nextRecoveryTime: number;
  balance: number;
  onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ stamina, nextRecoveryTime, balance, onStart }) => {
  const canPlay = stamina > 0;
  const { user } = useFarcaster();

  return (
    <div className="flex flex-col h-full w-full justify-between pb-4">
      {/* Top Header */}
      <div className="flex justify-between items-start px-4 pt-4 shrink-0 relative">
        <StaminaDisplay stamina={stamina} nextRecoveryTime={nextRecoveryTime} />
        
        {/* Right side: Farcaster Profile & Balance Display */}
        <div className="flex flex-col items-end gap-2 z-10">
          {user?.pfpUrl && (
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-full px-2 py-1 shadow-sm border-2 border-white">
              <img src={user.pfpUrl} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full" />
              <span className="text-xs font-bold text-text-main pr-1">{user.displayName}</span>
            </div>
          )}
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
        
        {/* Version Display */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white/80 z-0">
          {GAME_VERSION}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between relative w-full pt-4 pb-2">
        {/* Title Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative z-10 flex flex-col items-center mt-2 shrink-0"
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

        {/* Character with light rays - reduced space */}
        <motion.div 
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="relative flex items-end justify-center my-0 z-20 flex-[0.8] min-h-0 pb-4"
        >
          {/* Character */}
          <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] relative z-10 drop-shadow-xl transform origin-bottom hover:scale-105 transition-transform">
            <img 
              src="https://getfood-chihuahua.k0j1.v2002.coreserver.jp/images/Chihuahua.png" 
              alt="Chihuahua" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full px-8 mb-2 z-30"
        >
          <div className="relative w-full">
            {/* Glowing Animation */}
            {canPlay && (
              <div className="absolute -inset-1 bg-white rounded-[2rem] blur-md animate-pulse opacity-80" />
            )}
            
            <button
              onClick={onStart}
              disabled={!canPlay}
              className={`pink-button w-full relative z-10 ${!canPlay ? 'opacity-50 grayscale cursor-not-allowed pointer-events-none' : ''}`}
            >
              <span>🐾 プレイ開始 🐾</span>
            </button>
          </div>
        </motion.div>
      </div>



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
