import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { CryptoData } from '../types/crypto';

interface CryptoTicketProps {
  crypto: CryptoData;
  variant?: 'hero' | 'large' | 'medium' | 'small' | 'horizontal';
  className?: string;
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
    'LTCUSDT': 'Litecoin'
  };
  return names[symbol] || symbol.replace('USDT', '');
};

const getCryptoSymbol = (symbol: string): string => {
  return symbol.replace('USDT', '');
};

// Nueva función para formatear el par de trading
const getTradingPair = (symbol: string): string => {
  const cryptoName = getCryptoName(symbol);
  return `${cryptoName}/USDT`;
};

const getVariantStyles = (variant: string, isPositive: boolean) => {
  const baseGradient = isPositive 
    ? 'from-green-900/20 via-gray-900 to-black' 
    : 'from-red-900/20 via-gray-900 to-black';
  
  const borderColor = isPositive ? 'border-green-500/30' : 'border-red-500/30';
  const shadowColor = isPositive ? 'shadow-green-500/10' : 'shadow-red-500/10';
  
  switch (variant) {
    case 'hero':
      return {
        gradient: `bg-gradient-to-br ${baseGradient}`,
        border: `border-2 ${borderColor}`,
        shadow: `shadow-2xl ${shadowColor}`,
        padding: 'p-6 sm:p-8',
        titleSize: 'text-2xl sm:text-4xl',
        nameSize: 'text-base sm:text-xl',
        priceSize: 'text-3xl sm:text-6xl',
        changeSize: 'text-lg sm:text-2xl',
        iconSize: 'w-6 h-6 sm:w-10 sm:h-10'
      };
    case 'large':
      return {
        gradient: `bg-gradient-to-br ${baseGradient}`,
        border: `border ${borderColor}`,
        shadow: `shadow-xl ${shadowColor}`,
        padding: 'p-6',
        titleSize: 'text-2xl',
        nameSize: 'text-base',
        priceSize: 'text-3xl',
        changeSize: 'text-lg',
        iconSize: 'w-7 h-7'
      };
    case 'medium':
      return {
        gradient: `bg-gradient-to-br ${baseGradient}`,
        border: `border ${borderColor}`,
        shadow: `shadow-lg ${shadowColor}`,
        padding: 'p-5',
        titleSize: 'text-xl',
        nameSize: 'text-sm',
        priceSize: 'text-2xl',
        changeSize: 'text-base',
        iconSize: 'w-6 h-6'
      };
    case 'horizontal':
      return {
        gradient: `bg-gradient-to-r ${baseGradient}`,
        border: `border ${borderColor}`,
        shadow: `shadow-lg ${shadowColor}`,
        padding: 'p-3',
        titleSize: 'text-base sm:text-lg',
        nameSize: 'text-xs',
        priceSize: 'text-lg sm:text-xl',
        changeSize: 'text-sm',
        iconSize: 'w-4 h-4'
      };
    case 'small':
      return {
        gradient: `bg-gradient-to-br ${baseGradient}`,
        border: `border ${borderColor}`,
        shadow: `shadow-md ${shadowColor}`,
        padding: 'p-4',
        titleSize: 'text-lg',
        nameSize: 'text-xs',
        priceSize: 'text-xl',
        changeSize: 'text-sm',
        iconSize: 'w-5 h-5'
      };
    default:
      return {
        gradient: `bg-gradient-to-br ${baseGradient}`,
        border: `border ${borderColor}`,
        shadow: `shadow-lg ${shadowColor}`,
        padding: 'p-5',
        titleSize: 'text-xl',
        nameSize: 'text-sm',
        priceSize: 'text-2xl',
        changeSize: 'text-base',
        iconSize: 'w-6 h-6'
      };
  }
};

export const CryptoTicket: React.FC<CryptoTicketProps> = ({ 
  crypto, 
  variant = 'medium',
  className = '' 
}) => {
  const isPositive = parseFloat(crypto.priceChangePercent) >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-500';
  const styles = getVariantStyles(variant, isPositive);

  const formatPrice = (price: string): string => {
    const num = parseFloat(price);
    
    // Verificar si el número es válido
    if (isNaN(num) || num === 0) {
      console.warn(`Invalid price for ${crypto.symbol}:`, price);
      return '0.0000';
    }
    
    // Formateo específico por crypto
    if (crypto.symbol === 'BTCUSDT') {
      return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    // Para cryptos con precios muy bajos (como DOGE, etc.)
    if (num < 1) {
      return num.toFixed(6); // 6 decimales para precios menores a $1
    }
    
    // Para cryptos con precios medios (como LTC)
    if (num < 100) {
      return num.toFixed(4); // 4 decimales para precios menores a $100
    }
    
    // Para cryptos con precios altos
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatVolume = (volume: string): string => {
    const num = parseFloat(volume);
    if (isNaN(num)) return '0';
    
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(0);
  };

  const formatChange = (change: string): string => {
    const num = parseFloat(change);
    if (isNaN(num)) return '0.00%';
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  // Layout especial para variante horizontal (optimizado para mobile)
  if (variant === 'horizontal') {
    return (
      <div className={`
        ${styles.gradient}
        ${styles.border} ${styles.shadow} ${styles.padding}
        rounded-2xl backdrop-blur-sm
        transition-all duration-500 ease-out
        hover:scale-[1.01] hover:shadow-2xl
        hover:border-opacity-60
        group cursor-pointer
        ${className}
        overflow-hidden relative
        min-h-[80px]
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-red-500 rounded-full translate-y-6 -translate-x-6"></div>
        </div>

        <div className="relative z-10 flex items-center justify-between h-full gap-3">
          {/* Left Section - Crypto Info */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            {/* Icon */}
            <div className={`
              p-2 rounded-xl backdrop-blur-sm flex-shrink-0
              ${isPositive ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}
              group-hover:scale-110 transition-transform duration-300
            `}>
              {isPositive ? (
                <TrendingUp className={`${styles.iconSize} text-green-400`} />
              ) : (
                <TrendingDown className={`${styles.iconSize} text-red-500`} />
              )}
            </div>

            {/* Crypto Name */}
            <div className="min-w-0 flex-shrink-0">
              <h3 className={`font-black text-white ${styles.titleSize} leading-tight`}>
                {getCryptoSymbol(crypto.symbol)}
              </h3>
              <p className={`text-gray-400 ${styles.nameSize} font-medium hidden sm:block`}>
                {getCryptoName(crypto.symbol)}
              </p>
            </div>
          </div>

          {/* Center Section - Price */}
          <div className="flex-1 text-center min-w-0">
            <div className={`font-black text-white ${styles.priceSize} leading-none font-mono truncate`}>
              ${formatPrice(crypto.price)}
            </div>
          </div>

          {/* Right Section - Change & Volume */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0 min-w-0">
            {/* Price Change */}
            <div className={`flex items-center ${changeColor} ${styles.changeSize} font-bold`}>
              <Activity className="w-3 h-3 mr-1 opacity-75 flex-shrink-0" />
              <span className="truncate">{formatChange(crypto.priceChangePercent)}</span>
            </div>

            {/* Volume - Compact */}
            <div className="text-right">
              <p className="text-gray-300 text-xs font-semibold truncate">
                Vol: {formatVolume(crypto.volume)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Layout normal para otras variantes
  return (
    <div className={`
      ${styles.gradient}
      ${styles.border} ${styles.shadow} ${styles.padding}
      rounded-2xl backdrop-blur-sm
      transition-all duration-500 ease-out
      hover:scale-[1.02] hover:shadow-2xl
      hover:border-opacity-60
      group cursor-pointer
      ${className}
      overflow-hidden relative
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between min-h-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-auto">
          <div className="min-w-0 flex-1">
            <h3 className={`font-black text-white ${styles.titleSize} truncate leading-tight`}>
              {getCryptoSymbol(crypto.symbol)}
            </h3>
            <p className={`text-gray-400 ${styles.nameSize} truncate font-medium`}>
              {getTradingPair(crypto.symbol)}
            </p>
          </div>
          <div className={`
            p-2 rounded-xl backdrop-blur-sm flex-shrink-0 ml-2
            ${isPositive ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}
            group-hover:scale-110 transition-transform duration-300
          `}>
            {isPositive ? (
              <TrendingUp className={`${styles.iconSize} text-green-400`} />
            ) : (
              <TrendingDown className={`${styles.iconSize} text-red-500`} />
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="my-auto">
          <div className={`font-black text-white ${styles.priceSize} leading-none mb-2 font-mono truncate`}>
            ${formatPrice(crypto.price)}
          </div>
          <div className={`flex items-center ${changeColor} ${styles.changeSize} font-bold`}>
            <Activity className="w-4 h-4 mr-1 opacity-75 flex-shrink-0" />
            <span className="truncate">{formatChange(crypto.priceChangePercent)}</span>
          </div>
        </div>

        {/* Stats Section - Only for hero and large variants */}
        {variant === 'hero' && (
          <div className="mt-auto pt-4 border-t border-gray-700/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">24h High</p>
                <p className="text-white font-bold truncate">${formatPrice(crypto.highPrice)}</p>
              </div>
              <div className="min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">24h Low</p>
                <p className="text-white font-bold truncate">${formatPrice(crypto.lowPrice)}</p>
              </div>
              <div className="col-span-2 min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">24h Volume</p>
                <p className="text-white font-bold truncate">
                  {formatVolume(crypto.volume)} {getCryptoSymbol(crypto.symbol)}
                </p>
              </div>
            </div>
          </div>
        )}

        {variant === 'large' && (
          <div className="mt-auto pt-4 border-t border-gray-700/50">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">24h High</p>
                <p className="text-white font-bold truncate">${formatPrice(crypto.highPrice)}</p>
              </div>
              <div className="min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">24h Low</p>
                <p className="text-white font-bold truncate">${formatPrice(crypto.lowPrice)}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Volume for medium variants */}
        {variant === 'medium' && (
          <div className="mt-auto pt-2">
            <p className="text-gray-500 text-xs truncate">Vol: {formatVolume(crypto.volume)}</p>
          </div>
        )}

        {/* Minimal info for small variants */}
        {variant === 'small' && (
          <div className="mt-auto">
            <p className="text-gray-500 text-xs truncate">Vol: {formatVolume(crypto.volume)}</p>
          </div>
        )}
      </div>
    </div>
  );
};