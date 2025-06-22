import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
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
  // Duplicamos los cryptos para crear un loop infinito
  const duplicatedCryptos = [...cryptos, ...cryptos];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900/20 via-black to-gray-900/20 border border-gray-700/50 rounded-2xl backdrop-blur-sm">
      {/* Gradientes de fade en los bordes */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      
      {/* Cinta deslizante */}
      <div className="flex animate-scroll">
        {duplicatedCryptos.map((crypto, index) => {
          const isPositive = parseFloat(crypto.priceChangePercent) >= 0;
          const changeColor = isPositive ? 'text-green-400' : 'text-red-500';
          
          return (
            <div
              key={`${crypto.symbol}-${index}`}
              className="flex items-center gap-4 px-8 py-4 flex-shrink-0 min-w-[300px] hover:bg-white/5 transition-colors duration-300 group"
            >
              {/* Icon */}
              <div className={`
                p-2 rounded-lg flex-shrink-0
                ${isPositive ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}
                group-hover:scale-110 transition-transform duration-300
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
  );
};