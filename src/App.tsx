import React, { useState } from 'react';
import { useStamina } from './hooks/useStamina';
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
  
  const handleGameEnd = (score: number) => {
    setFinalScore(score);
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
    <div className="w-full h-[100dvh] max-w-md mx-auto relative overflow-hidden bg-bg-main shadow-2xl">
      <AnimatePresence mode="wait">
        {screen === 'title' && (
          <motion.div 
            key="title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0"
          >
            <TitleScreen 
              stamina={stamina} 
              nextRecoveryTime={nextRecoveryTime} 
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
            className="absolute inset-0 bg-amber-50"
          >
            {/* Background elements for play screen */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 text-6xl">🦴</div>
              <div className="absolute top-40 right-20 text-6xl">🐾</div>
              <div className="absolute bottom-20 left-20 text-6xl">🐕</div>
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
            className="absolute inset-0"
          >
            <ResultScreen 
              score={finalScore}
              stamina={stamina}
              nextRecoveryTime={nextRecoveryTime}
              onReplay={handleStartGame}
              onHome={handleGoHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
