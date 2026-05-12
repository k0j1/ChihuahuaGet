import React, { useState } from 'react';
import { useStamina } from './hooks/useStamina';
import { useBalance } from './hooks/useBalance';
import { useGameEngine } from './hooks/useGameEngine';
import { TitleScreen } from './components/TitleScreen';
import { PlayScreen } from './components/PlayScreen';
import { ResultScreen } from './components/ResultScreen';
import { PaperScreen } from './components/PaperScreen';
import { AppsScreen } from './components/AppsScreen';
import { BottomNavigation } from './components/BottomNavigation';
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
    isPaused,
    score,
    combo,
    timeLeft,
    currentItems,
    startGame,
    quitGame,
    pauseGame,
    resumeGame,
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

  const handleQuitGame = () => {
    quitGame();
    handleGoHome();
  };

  const showBottomNav = screen === 'title' || screen === 'apps' || screen === 'paper';

  return (
    <div className="w-full h-[100dvh] max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Universal Background matching new image design */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url('https://getfood-chihuahua.k0j1.v2002.coreserver.jp/images/Background01.png')" }}
      />

      <div className={`relative z-10 w-full h-full transition-all ${showBottomNav ? 'pb-16' : ''}`}>
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

          {screen === 'paper' && (
            <motion.div 
              key="paper"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0 z-10"
            >
              <PaperScreen />
            </motion.div>
          )}

          {screen === 'apps' && (
            <motion.div 
              key="apps"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0 z-10"
            >
              <AppsScreen />
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
                combo={combo}
                timeLeft={timeLeft}
                isPaused={isPaused}
                currentItems={currentItems}
                onTapItem={tapItem}
                onPause={pauseGame}
                onResume={resumeGame}
                onQuit={handleQuitGame}
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

      {showBottomNav && (
        <BottomNavigation currentScreen={screen} onChangeScreen={setScreen} />
      )}
    </div>
  );
}
