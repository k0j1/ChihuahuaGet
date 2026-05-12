import React from 'react';
import { motion } from 'motion/react';

export const PaperScreen: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full pt-6 px-4 pb-20 overflow-y-auto">
      <h2 className="text-3xl font-black text-text-main text-center mb-6 text-outline-white drop-shadow-md font-pop">
        Light Paper
      </h2>
      
      <div className="bg-white rounded-3xl p-6 shadow-card border-4 border-orange-100 flex flex-col gap-6">
        
        {/* ゲーム概要 */}
        <section>
          <h3 className="text-xl font-black text-text-brown mb-3 flex items-center gap-2">
            <span className="text-primary text-2xl">🐾</span> 概要とルール
          </h3>
          <p className="text-text-muted text-sm leading-relaxed mb-2 mt-2">
            次々と現れるアイテムから<strong className="text-[#84b840]">「餌アイテム」</strong>をタップしてスコアを稼ぐゲームです。<strong className="text-purple-500">「ゴミアイテム」</strong>をタップするとスコアが減少し、悲しい演出が入ります。<br/>
            コンボを繋げてハイスコア（CHH）獲得を目指しましょう！
          </p>
        </section>

        {/* 餌アイテム テーブル */}
        <section>
          <h3 className="text-lg font-black text-[#84b840] mb-3 flex items-center gap-2">
            餌アイテム（得点アイテム）
          </h3>
          <div className="overflow-hidden rounded-xl border-2 border-[#84b840]/30 shadow-sm text-xs sm:text-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#84b840] text-white font-bold">
                  <th className="py-2 px-1 border-r border-[#84b840]/50 w-12">ー</th>
                  <th className="py-2 px-1 border-r border-[#84b840]/50">名前</th>
                  <th className="py-2 px-1 border-r border-[#84b840]/50">出現確率</th>
                  <th className="py-2 px-1 border-r border-[#84b840]/50">スコア</th>
                </tr>
              </thead>
              <tbody className="text-text-main">
                <tr className="border-b border-gray-100 bg-[#f4faec]">
                  <td className="py-2 border-r border-gray-100 text-lg">🥩</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">ビーフステーキ</td>
                  <td className="py-2 border-r border-gray-100">18.0%</td>
                  <td className="py-2 border-r border-gray-100 text-[#84b840] font-bold">+50</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 border-r border-gray-100 text-lg">🥖</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">チキンささみ</td>
                  <td className="py-2 border-r border-gray-100">24.0%</td>
                  <td className="py-2 border-r border-gray-100 text-[#84b840] font-bold">+30</td>
                </tr>
                <tr className="border-b border-gray-100 bg-[#f4faec]">
                  <td className="py-2 border-r border-gray-100 text-lg">🧀</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">チーズ</td>
                  <td className="py-2 border-r border-gray-100">20.0%</td>
                  <td className="py-2 border-r border-gray-100 text-[#84b840] font-bold">+20</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 border-r border-gray-100 text-lg">🍣</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">サーモン</td>
                  <td className="py-2 border-r border-gray-100">18.0%</td>
                  <td className="py-2 border-r border-gray-100 text-[#84b840] font-bold">+15</td>
                </tr>
                <tr className="bg-[#f4faec]">
                  <td className="py-2 border-r border-gray-100 text-lg">🦴</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">おやつクッキー</td>
                  <td className="py-2 border-r border-gray-100">10.0%</td>
                  <td className="py-2 border-r border-gray-100 text-[#84b840] font-bold">+10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ゴミアイテム テーブル */}
        <section>
          <h3 className="text-lg font-black text-purple-600 mb-3 flex items-center gap-2 mt-4">
            💀 ゴミアイテム（減点アイテム）
          </h3>
          <div className="overflow-hidden rounded-xl border-2 border-purple-500/30 shadow-sm text-xs sm:text-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-purple-500 text-white font-bold">
                  <th className="py-2 px-1 border-r border-purple-400 w-12">ー</th>
                  <th className="py-2 px-1 border-r border-purple-400">名前</th>
                  <th className="py-2 px-1 border-r border-purple-400">出現確率</th>
                  <th className="py-2 px-1 border-r border-purple-400">スコア</th>
                </tr>
              </thead>
              <tbody className="text-text-main">
                <tr className="border-b border-gray-100 bg-purple-50">
                  <td className="py-2 border-r border-gray-100 text-lg">🥫</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">空き缶</td>
                  <td className="py-2 border-r border-gray-100">4.0%</td>
                  <td className="py-2 border-r border-gray-100 text-purple-600 font-bold">-30</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 border-r border-gray-100 text-lg lg:text-xl">🦴🐟</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">腐った魚</td>
                  <td className="py-2 border-r border-gray-100">3.0%</td>
                  <td className="py-2 border-r border-gray-100 text-purple-600 font-bold">-20</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="py-2 border-r border-gray-100 text-lg">🍌</td>
                  <td className="py-2 border-r border-gray-100 font-bold text-left pl-2">バナナの皮</td>
                  <td className="py-2 border-r border-gray-100">3.0%</td>
                  <td className="py-2 border-r border-gray-100 text-purple-600 font-bold">-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};
