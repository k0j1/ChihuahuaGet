import { useState, useEffect, useCallback, useRef } from 'react';
import { GameItem } from '../types';
import { getRandomItem, GAME_DURATION_MS, ITEM_DISPLAY_MS, ITEM_INTERVAL_MS } from '../constants';

export function useGameEngine(onGameEnd: (score: number) => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS / 1000);
  const [currentItems, setCurrentItems] = useState<{ id: string; item: GameItem; x: number; y: number }[]>([]);

  const isPausedRef = useRef(false);
  const remainingMsRef = useRef<number>(GAME_DURATION_MS);
  const lastTickTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const spawnAccumulatorRef = useRef<number>(0);
  const itemLifespansRef = useRef<Map<string, number>>(new Map());
  const comboRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);

  // Synchronize state with refs
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const spawnItem = useCallback(() => {
    const count = Math.random() > 0.5 ? 2 : 1;

    let newItems: { id: string; item: GameItem; x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const id = Math.random().toString(36).substr(2, 9);
      const x = 10 + Math.random() * 80;
      const y = 20 + Math.random() * 60;
      newItems.push({ id, item: getRandomItem(), x, y });
      itemLifespansRef.current.set(id, ITEM_DISPLAY_MS);
    }

    setCurrentItems(prev => [...prev, ...newItems]);
  }, []);

  const updateLoop = useCallback((timestamp: number) => {
    if (!lastTickTimeRef.current) lastTickTimeRef.current = timestamp;
    const dt = timestamp - lastTickTimeRef.current;
    lastTickTimeRef.current = timestamp;

    if (!isPausedRef.current) {
      remainingMsRef.current -= dt;
      if (remainingMsRef.current <= 0) {
        endGameInternal();
        return;
      }
      
      setTimeLeft(Math.max(0, remainingMsRef.current / 1000));

      spawnAccumulatorRef.current += dt;
      if (spawnAccumulatorRef.current >= ITEM_INTERVAL_MS) {
        spawnAccumulatorRef.current = 0;
        spawnItem();
      }

      setCurrentItems(prev => {
        let itemsExpired = false;
        const nextItems = prev.filter(item => {
          const remaining = itemLifespansRef.current.get(item.id) ?? 0;
          const newRemaining = remaining - dt;
          if (newRemaining <= 0) {
            itemLifespansRef.current.delete(item.id);
            if (item.item.score > 0) {
              comboRef.current = 0; // only reset combo if a good item was missed
              setCombo(0);
            }
            itemsExpired = true;
            return false;
          }
          itemLifespansRef.current.set(item.id, newRemaining);
          return true;
        });
        return nextItems.length !== prev.length ? nextItems : prev;
      });
    }

    rafIdRef.current = requestAnimationFrame(updateLoop);
  }, [spawnItem]);

  const endGameInternal = useCallback(() => {
    setIsPlaying(false);
    setCurrentItems([]);
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    itemLifespansRef.current.clear();
    
    // Slight delay before calling onGameEnd so UI resolves cleanly
    setTimeout(() => {
      onGameEnd(scoreRef.current);
    }, 50);
  }, [onGameEnd]);

  const startGame = useCallback(() => {
    setScore(0);
    setCombo(0);
    comboRef.current = 0;
    scoreRef.current = 0;
    remainingMsRef.current = GAME_DURATION_MS;
    setTimeLeft(GAME_DURATION_MS / 1000);
    spawnAccumulatorRef.current = 0;
    itemLifespansRef.current.clear();
    
    setIsPlaying(true);
    setIsPaused(false);
    setCurrentItems([]);
    
    lastTickTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(updateLoop);
  }, [updateLoop]);

  const endGame = useCallback(() => {
    endGameInternal();
  }, [endGameInternal]);

  const quitGame = useCallback(() => {
    setIsPlaying(false);
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
  }, []);

  const pauseGame = useCallback(() => setIsPaused(true), []);
  const resumeGame = useCallback(() => {
    lastTickTimeRef.current = performance.now(); // Reset tick time to prevent sudden jump
    setIsPaused(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      itemLifespansRef.current.clear();
    };
  }, []);

  const tapItem = useCallback((id: string) => {
    if (!isPlaying || isPausedRef.current) return;
    
    setCurrentItems(prev => {
      const itemToTap = prev.find(i => i.id === id);
      if (itemToTap) {
        const itemScore = itemToTap.item.score;
        setScore((current) => current + itemScore);
        
        if (itemScore > 0) {
          const nextCombo = comboRef.current + 1;
          comboRef.current = nextCombo;
          setCombo(nextCombo);
        } else {
          comboRef.current = 0;
          setCombo(0);
        }
        
        itemLifespansRef.current.delete(id);
        
        return prev.filter(i => i.id !== id);
      }
      return prev;
    });
  }, [isPlaying]);

  return {
    isPlaying,
    isPaused,
    score,
    combo,
    timeLeft,
    currentItems,
    startGame,
    endGame,
    quitGame,
    pauseGame,
    resumeGame,
    tapItem
  };
}
