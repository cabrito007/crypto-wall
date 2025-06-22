import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { CryptoData } from '../types/crypto';

interface CryptoTickerProps {
  cryptos: CryptoData[];
}

const getCryptoName = (symbol: string): string => {
  const names: Record<string, string> = {
    'BTCUSDT': 'Bitcoin',
    'ETHUSDT': 'Ethereum', 
    'BNBUSDT': 'BNB',
    'XRPUSDT': 'XRP',
    'ADAUSDT': 'Cardano',
    'DOGEUSDT': 'Dogecoin',
    'SOLUSDT': 'Solana',
    'TRXUSDT': 'TRON',
    'DOTUSDT': 'Polkadot',
    'MATICUSDT': 'Polygon',
    'AVAXUSDT': 'Avalanche',
    'LINKUSDT': 'Chainlink',
    'ATOMUSDT': 'Cosmos',
    'LTCUSDT': 'Litecoin',
    'UNIUSDT': 'Uniswap',
    'ETCUSDT': 'Ethereum Classic',
    'XLMUSDT': 'Stellar',
    'BCHUSDT': 'Bitcoin Cash',
    'FILUSDT': 'Filecoin',
    'APTUSDT': 'Aptos',
    'NEARUSDT': 'NEAR Protocol',
    'ALGOUSDT': 'Algorand',
    'VETUSDT': 'VeChain',
    'ICPUSDT': 'Internet Computer',
    'FTMUSDT': 'Fantom',
    'SANDUSDT': 'The Sandbox',
    'MANAUSDT': 'Decentraland',
    'AXSUSDT': 'Axie Infinity',
    'THETAUSDT': 'Theta Network',
    'EOSUSDT': 'EOS',
    // Nuevos nombres agregados
    'ARUSDT': 'Arweave',
    'STORJUSDT': 'Storj',
    'GALAUSDT': 'Gala',
    'ROSEUSDT': 'Oasis Network',
    'ARBUSDT': 'Arbitrum',
    'HNTUSDT': 'Helium',
    'KAVAUSDT': 'Kava',
    'MKRUSDT': 'Maker',
    'COMPUSDT': 'Compound',
    'FETUSDT': 'Fetch.ai',
    'SCRTUSDT': 'Secret',
    'RNDRUSDT': 'Render Token',
    'AKTUSDT': 'Akash Network'
  };
  return names[symbol] || symbol.replace('USDT', '');
};

const getCryptoSymbol = (symbol: string): string => {
  return symbol.replace('USDT', '');
};

const formatPrice = (price: string): string => {
  const num = parseFloat(price);
  if (isNaN(num) || num === 0) return '0.0000';
  
  if (num < 1) return num.toFixed(6);
  if (num < 100) return num.toFixed(4);
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatChange = (change: string): string => {
  const num = parseFloat(change);
  if (isNaN(num)) return '0.00%';
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const CryptoTicker: React.FC<CryptoTickerProps> = ({ cryptos }) => {
  const [speedLevel, setSpeedLevel] = useState(1); // 1 = normal, 2 = fast, 3 = very fast

  // Duplicamos los cryptos para crear un loop infinito
  const duplicatedCryptos = [...cryptos, ...cryptos];

  const handleSpeedIncrease = () => {
    setSpeedLevel(prev => prev === 3 ? 1 : prev + 1);
  };

  const getSpeedClass = () => {
    switch (speedLevel) {
      case 1:
        return 'animate-scroll'; // 60s (normal)
      case 2:
        return 'animate-scroll-fast'; // 30s (fast)
      case 3:
        return 'animate-scroll-very-fast'; // 15s (very fast)
      default:
        return 'animate-scroll';
    }
  };

  const getSpeedLabel = () => {
    switch (speedLevel) {
      case 1:
        return '1x';
      case 2:
        return '2x';
      case 3:
        return '4x';
      default:
        return '1x';
    }
  };

  return (
    <div className="relative group">
      {/* Container principal con overflow hidden */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/20 via-black to-gray-900/20 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
        {/* Gradientes de fade en los bordes */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
        
        {/* Cinta deslizante */}
        <div className={`flex ${getSpeedClass()}`}>
          {duplicatedCryptos.map((crypto, index) => {
            const isPositive = parseFloat(crypto.priceChangePercent) >= 0;
            const changeColor = isPositive ? 'text-green-400' : 'text-red-500';
            
            return (
              <div
                key={`${crypto.symbol}-${index}`}
                className="flex items-center gap-4 px-8 py-4 flex-shrink-0 min-w-[300px] hover:bg-white/5 transition-colors duration-300 group/item"
              >
                {/* Icon */}
                <div className={`
                  p-2 rounded-lg flex-shrink-0
                  ${isPositive ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}
                  group-hover/item:scale-110 transition-transform duration-300
                `}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>

                {/* Crypto Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-black text-lg">
                      {getCryptoSymbol(crypto.symbol)}
                    </span>
                    <span className="text-gray-400 text-xs font-medium truncate">
                      {getCryptoName(crypto.symbol)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white font-mono text-base font-bold">
                      ${formatPrice(crypto.price)}
                    </span>
                    <span className={`${changeColor} text-sm font-bold`}>
                      {formatChange(crypto.priceChangePercent)}
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="w-px h-8 bg-gray-700/50 flex-shrink-0"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control de velocidad - Solo flecha derecha */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleSpeedIncrease}
          className="flex items-center gap-2 p-3 bg-black/90 hover:bg-red-500/20 border border-gray-600/50 hover:border-red-500/50 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-2xl group/speed"
        >
          <ChevronRight className="w-5 h-5 text-white group-hover/speed:text-red-400 transition-colors duration-300" />
          <span className="text-xs font-bold text-white group-hover/speed:text-red-400 transition-colors duration-300 min-w-[20px]">
            {getSpeedLabel()}
          </span>
        </button>
      </div>

      {/* Indicador de velocidad en la esquina superior derecha */}
      <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-gray-600/50 rounded-lg backdrop-blur-sm">
          <div className={`w-2 h-2 rounded-full ${
            speedLevel === 1 ? 'bg-green-400' : 
            speedLevel === 2 ? 'bg-yellow-400' : 'bg-red-400'
          } animate-pulse`}></div>
          <span className="text-xs text-white font-bold">
            Speed {getSpeedLabel()}
          </span>
        </div>
      </div>
    </div>
  );
};