import { useState, useCallback, useEffect } from 'react';

const BALANCE_STORAGE_KEY = 'chh_game_balance_data';

export function useBalance() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(BALANCE_STORAGE_KEY);
    if (saved) {
      setBalance(parseInt(saved, 10));
    }
  }, []);

  const addBalance = useCallback((amount: number) => {
    if (amount <= 0) return; // プラスのスコアのみ増加
    setBalance((prev) => {
      const newBalance = prev + amount;
      localStorage.setItem(BALANCE_STORAGE_KEY, newBalance.toString());
      return newBalance;
    });
  }, []);

  return { balance, addBalance };
}
