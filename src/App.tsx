import React, { useState } from 'react';
import { useStamina } from './hooks/useStamina';
import { useBalance } from './hooks/useBalance';
import { useGameEngine } from './hooks/useGameEngine';
import { TitleScreen } from './components/TitleScreen';
import { PlayScreen } from './components/PlayScreen';
import { ResultScreen } from './components/ResultScreen';
import { ScreenType } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('title');
  const [finalScore, setFinalScore] = useState<number>(0);
  
  const { stamina, nextRecoveryTime, consumeStamina } = useStamina();
  const { balance, addBalance } = useBalance();
  
  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    addBalance(score);
    setScreen('result');
  };

  const {
    isPlaying,
    score,
    timeLeft,
    currentItems,
    startGame,
    tapItem
  } = useGameEngine(handleGameEnd);

  const handleStartGame = () => {
    if (consumeStamina()) {
      setScreen('play');
      startGame();
    }
  };

  const handleGoHome = () => {
    setScreen('title');
  };

  return (
    <div className="w-full h-[100dvh] max-w-md mx-auto relative overflow-hidden shadow-2xl bg-bg-sky">
      {/* Universal Background matching new image design */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Sky gradient mostly handled by bg-bg-sky, let's add some clouds (CSS simple ones) */}
        <div className="absolute top-10 left-[-10%] w-32 h-12 bg-white/70 rounded-full blur-[2px]" />
        <div className="absolute top-24 right-[-5%] w-48 h-16 bg-white/60 rounded-full blur-[4px]" />
        <div className="absolute top-5 left-[50%] w-20 h-8 bg-white/50 rounded-full blur-[2px]" />

        {/* Grass bottom */}
        <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-green-500 to-bg-grass z-0" />
        {/* Subtle grass hills */}
        <div className="absolute bottom-[40%] left-[-20%] w-[80%] h-32 bg-bg-grass rounded-full blur-[1px]" />
        <div className="absolute bottom-[35%] right-[-20%] w-[80%] h-40 bg-bg-grass rounded-full blur-[1px]" />
      </div>

      <AnimatePresence mode="wait">
        {screen === 'title' && (
          <motion.div 
            key="title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 z-10"
          >
            <TitleScreen 
              stamina={stamina} 
              nextRecoveryTime={nextRecoveryTime} 
              balance={balance}
              onStart={handleStartGame} 
            />
          </motion.div>
        )}

        {screen === 'play' && (
          <motion.div 
            key="play"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            {/* Background elements specific for play screen */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <div className="absolute top-1/4 left-10 text-6xl">🦴</div>
              <div className="absolute top-1/2 right-20 text-6xl">🐾</div>
              <div className="absolute bottom-1/4 left-20 text-6xl">🐕</div>
            </div>
            <PlayScreen 
              score={score}
              timeLeft={timeLeft}
              currentItems={currentItems}
              onTapItem={tapItem}
            />
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 z-10"
          >
            <ResultScreen 
              score={finalScore}
              stamina={stamina}
              nextRecoveryTime={nextRecoveryTime}
              balance={balance}
              onReplay={handleStartGame}
              onHome={handleGoHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
