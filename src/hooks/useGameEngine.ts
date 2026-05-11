import { useState, useEffect, useCallback, useRef } from 'react';
import { GameItem } from '../types';
import { getRandomItem, GAME_DURATION_MS, ITEM_DISPLAY_MS, ITEM_INTERVAL_MS } from '../constants';

export function useGameEngine(onGameEnd: (score: number) => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS / 1000);
  const [currentItems, setCurrentItems] = useState<{ id: string; item: GameItem; x: number; y: number }[]>([]);

  const timerRef = useRef<number | null>(null);
  const gameStartTimeRef = useRef<number>(0);
  const spawnTimerRef = useRef<number | null>(null);
  // Store item timeouts for cleanup
  const itemTimeoutsRef = useRef<Map<string, number>>(new Map());

  const spawnItem = useCallback(() => {
    // Spawn 1 to 2 items
    const count = Math.random() > 0.5 ? 2 : 1;

    for (let i = 0; i < count; i++) {
      const id = Math.random().toString(36).substr(2, 9);
      // Generate random position within 10%-90% of screen width/height
      const x = 10 + Math.random() * 80;
      const y = 20 + Math.random() * 60;
      
      setCurrentItems(prev => [...prev, { id, item: getRandomItem(), x, y }]);

      // Remove item after DISPLAY_MS
      const timeoutId = window.setTimeout(() => {
        setCurrentItems(prev => prev.filter(item => item.id !== id));
        itemTimeoutsRef.current.delete(id);
      }, ITEM_DISPLAY_MS);
      
      itemTimeoutsRef.current.set(id, timeoutId);
    }
  }, []);

  const clearAllItemTimeouts = useCallback(() => {
    itemTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    itemTimeoutsRef.current.clear();
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(GAME_DURATION_MS / 1000);
    setIsPlaying(true);
    setCurrentItems([]);
    clearAllItemTimeouts();
    gameStartTimeRef.current = Date.now();

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - gameStartTimeRef.current;
      const remainingSeconds = Math.max(0, Math.ceil((GAME_DURATION_MS - elapsed) / 1000));
      setTimeLeft(remainingSeconds);

      if (elapsed >= GAME_DURATION_MS) {
        endGame();
      }
    }, 100);

    spawnTimerRef.current = window.setInterval(() => {
      spawnItem();
    }, ITEM_INTERVAL_MS);
  }, [clearAllItemTimeouts, spawnItem]);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setCurrentItems([]);
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    clearAllItemTimeouts();
    
    // Slight delay before calling onGameEnd so score resolves cleanly
    setTimeout(() => {
      setScore((currentScore) => {
        onGameEnd(currentScore);
        return currentScore;
      });
    }, 50);
  }, [onGameEnd, clearAllItemTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      clearAllItemTimeouts();
    };
  }, [clearAllItemTimeouts]);

  const tapItem = useCallback((id: string) => {
    if (!isPlaying) return;
    
    setCurrentItems(prev => {
      const itemToTap = prev.find(i => i.id === id);
      if (itemToTap) {
        setScore((current) => current + itemToTap.item.score);
        
        // Clear timeout for tapped item
        const timeoutId = itemTimeoutsRef.current.get(id);
        if (timeoutId) {
          clearTimeout(timeoutId);
          itemTimeoutsRef.current.delete(id);
        }
        
        return prev.filter(i => i.id !== id);
      }
      return prev;
    });
  }, [isPlaying]);

  return {
    isPlaying,
    score,
    timeLeft,
    currentItems,
    startGame,
    endGame,
    tapItem
  };
}
