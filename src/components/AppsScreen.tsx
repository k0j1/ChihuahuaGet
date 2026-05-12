import React from 'react';
import { motion } from 'motion/react';
import { useFarcaster } from '../hooks/useFarcaster';

const APPS = [
  {
    name: 'RunningChihuahua',
    icon: 'https://runningchihuahua.k0j1.v2002.coreserver.jp/images/icon.png',
    urlFarcaster: 'https://farcaster.xyz/miniapps/3Si5HSEtMpTX/running-chihuahua',
    urlNormal: 'https://runningchihuahua.k0j1.v2002.coreserver.jp/'
  },
  {
    name: 'Reversi',
    icon: 'https://reversi.k0j1.v2002.coreserver.jp/images/icon.png',
    urlFarcaster: 'https://farcaster.xyz/miniapps/FYXr6t3KSLwo/reversi',
    urlNormal: 'https://reversi.k0j1.v2002.coreserver.jp/'
  },
  {
    name: 'ChihuahuaQuest',
    icon: 'https://chihuahuaquest.k0j1.v2002.coreserver.jp/images/icon.png',
    urlFarcaster: 'https://farcaster.xyz/miniapps/EnmWQ9uvTlHa/chihuahuaquest',
    urlNormal: 'https://chihuahuaquest.k0j1.v2002.coreserver.jp/'
  },
  {
    name: 'MiningQuest',
    icon: 'https://miningquest.k0j1.v2002.coreserver.jp/images/icon.png',
    urlFarcaster: 'https://farcaster.xyz/miniapps/MR1ItBAqMlzR/mining-quest',
    urlNormal: 'https://miningquest.k0j1.v2002.coreserver.jp/'
  },
  {
    name: 'ChihuahuaStatus',
    icon: 'https://chihuahuaportal.k0j1.v2002.coreserver.jp/images/icon.png',
    urlFarcaster: 'https://farcaster.xyz/miniapps/do4iXTd8WOcp/chihuahua-status',
    urlNormal: 'https://chihuahuaportal.k0j1.v2002.coreserver.jp/'
  }
];

export const AppsScreen: React.FC = () => {
  const { isSDKLoaded, context } = useFarcaster();

  // Farcaster接続時かどうか判定 (SDKがロードされていてcontextが存在すれば接続時とみなす)
  const isFarcaster = isSDKLoaded && !!context;

  return (
    <div className="flex flex-col h-full w-full pt-6 px-6 overflow-y-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 pb-10"
      >
        <h2 className="text-3xl font-black text-text-main text-center mb-6 text-outline-white drop-shadow-md font-pop">
          Other Apps
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {APPS.map((app, index) => (
            <motion.a
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              key={app.name}
              href={isFarcaster ? app.urlFarcaster : app.urlNormal}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-4 shadow-card flex flex-col items-center justify-center gap-3 border-2 border-orange-100 hover:scale-105 transition-transform active:scale-95"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-text-brown text-center leading-tight">
                {app.name}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
