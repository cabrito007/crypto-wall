import { useState, useEffect, useCallback } from 'react';
import { CryptoData, CryptoTickerResponse } from '../types/crypto';

// Cryptos principales para el grid
const MAIN_CRYPTOS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT',
  'SOLUSDT', 'TRXUSDT', 'DOTUSDT', 'LTCUSDT'
];

// Cryptos adicionales para la cinta deslizante
const TICKER_CRYPTOS = [
  'DOGEUSDT', 'MATICUSDT', 'AVAXUSDT', 'LINKUSDT', 'ATOMUSDT',
  'UNIUSDT', 'ETCUSDT', 'XLMUSDT', 'BCHUSDT', 'FILUSDT',
  'APTUSDT', 'NEARUSDT', 'ALGOUSDT', 'VETUSDT', 'ICPUSDT',
  'FTMUSDT', 'SANDUSDT', 'MANAUSDT', 'AXSUSDT', 'THETAUSDT',
  'EOSUSDT'
];

export const useCryptoData = () => {
  const [mainCryptoData, setMainCryptoData] = useState<CryptoData[]>([]);
  const [tickerCryptoData, setTickerCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      
      const data: CryptoTickerResponse[] = await response.json();
      
      // Filtrar y procesar cryptos principales
      const mainData = data
        .filter(crypto => MAIN_CRYPTOS.includes(crypto.symbol))
        .map(crypto => ({
          symbol: crypto.symbol,
          price: parseFloat(crypto.lastPrice).toFixed(crypto.symbol === 'BTCUSDT' ? 2 : 4),
          priceChangePercent: crypto.priceChangePercent,
          volume: crypto.volume,
          highPrice: crypto.highPrice,
          lowPrice: crypto.lowPrice,
          lastPrice: crypto.lastPrice
        }))
        .sort((a, b) => {
          if (a.symbol === 'BTCUSDT') return -1;
          if (b.symbol === 'BTCUSDT') return 1;
          return parseFloat(b.volume) - parseFloat(a.volume);
        });

      // Filtrar y procesar cryptos para la cinta
      const tickerData = data
        .filter(crypto => TICKER_CRYPTOS.includes(crypto.symbol))
        .map(crypto => ({
          symbol: crypto.symbol,
          price: parseFloat(crypto.lastPrice).toFixed(crypto.symbol === 'BTCUSDT' ? 2 : 4),
          priceChangePercent: crypto.priceChangePercent,
          volume: crypto.volume,
          highPrice: crypto.highPrice,
          lowPrice: crypto.lowPrice,
          lastPrice: crypto.lastPrice
        }))
        .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume));

      setMainCryptoData(mainData);
      setTickerCryptoData(tickerData);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, [fetchCryptoData]);

  return { 
    cryptoData: mainCryptoData, 
    tickerCryptoData, 
    loading, 
    error, 
    lastUpdate, 
    refetch: fetchCryptoData 
  };
};