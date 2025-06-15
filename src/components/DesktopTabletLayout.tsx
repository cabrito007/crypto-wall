import React from 'react';
import { CryptoData } from '../types/crypto';
import { CryptoTicket } from './CryptoTicket';
import { CryptoTicker } from './CryptoTicker';

interface DesktopTabletLayoutProps {
  cryptoData: CryptoData[];
  tickerCryptoData: CryptoData[];
}

export const DesktopTabletLayout: React.FC<DesktopTabletLayoutProps> = ({ 
  cryptoData, 
  tickerCryptoData 
}) => {
  const bitcoinData = cryptoData.find(crypto => crypto.symbol === 'BTCUSDT');
  const otherCryptos = cryptoData.filter(crypto => crypto.symbol !== 'BTCUSDT');

  return (
    <>
      {/* Main Grid Layout - Fijo para desktop y tablet */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex items-center justify-center">
        <div className="grid grid-cols-14 grid-rows-6 gap-3 w-full h-[78vh]">
          {/* Bitcoin - Hero ticket (4x4) */}
          {bitcoinData && (
            <CryptoTicket
              crypto={bitcoinData}
              variant="hero"
              className="col-span-4 row-span-4 col-start-1 row-start-1"
            />
          )}
          
          {/* Ethereum - Large (4x2) - Debajo de Bitcoin */}
          {otherCryptos.find(crypto => crypto.symbol === 'ETHUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'ETHUSDT')!}
              variant="large"
              className="col-span-4 row-span-2 col-start-1 row-start-5"
            />
          )}
          
          {/* Litecoin - Large (5x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'LTCUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'LTCUSDT')!}
              variant="large"
              className="col-span-5 row-span-2 col-start-5 row-start-1"
            />
          )}
          
          {/* BNB - Large (5x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'BNBUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'BNBUSDT')!}
              variant="large"
              className="col-span-5 row-span-2 col-start-10 row-start-1"
            />
          )}
          
          {/* XRP - Medium (3x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'XRPUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'XRPUSDT')!}
              variant="medium"
              className="col-span-3 row-span-2 col-start-5 row-start-3"
            />
          )}
          
          {/* Cardano - Medium (3x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'ADAUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'ADAUSDT')!}
              variant="medium"
              className="col-span-3 row-span-2 col-start-8 row-start-3"
            />
          )}
          
          {/* Polkadot - Medium (3x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'DOTUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'DOTUSDT')!}
              variant="medium"
              className="col-span-3 row-span-2 col-start-11 row-start-3"
            />
          )}
          
          {/* Solana - Large (5x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'SOLUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'SOLUSDT')!}
              variant="large"
              className="col-span-5 row-span-2 col-start-5 row-start-5"
            />
          )}
          
          {/* TRON - Large (5x2) */}
          {otherCryptos.find(crypto => crypto.symbol === 'TRXUSDT') && (
            <CryptoTicket
              crypto={otherCryptos.find(crypto => crypto.symbol === 'TRXUSDT')!}
              variant="large"
              className="col-span-5 row-span-2 col-start-10 row-start-5"
            />
          )}
        </div>
      </div>

      {/* Cinta deslizante - Separación reducida */}
      <div className="mt-2 mb-4">
        <CryptoTicker cryptos={tickerCryptoData} />
      </div>
    </>
  );
};