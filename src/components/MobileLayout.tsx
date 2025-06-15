import React from 'react';
import { CryptoData } from '../types/crypto';
import { CryptoTicket } from './CryptoTicket';
import { CryptoTicker } from './CryptoTicker';

interface MobileLayoutProps {
  cryptoData: CryptoData[];
  tickerCryptoData: CryptoData[];
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  cryptoData, 
  tickerCryptoData 
}) => {
  const bitcoinData = cryptoData.find(crypto => crypto.symbol === 'BTCUSDT');
  const otherCryptos = cryptoData.filter(crypto => crypto.symbol !== 'BTCUSDT');

  return (
    <div className="flex flex-col gap-3 p-3 pb-24 pt-16">
      {/* Bitcoin - Hero en mobile con tamaño optimizado */}
      {bitcoinData && (
        <div className="w-full">
          <CryptoTicket
            crypto={bitcoinData}
            variant="hero"
            className="w-full min-h-[200px]"
          />
        </div>
      )}
      
      {/* Grid de cryptos horizontales optimizado para mobile */}
      <div className="flex flex-col gap-3">
        {otherCryptos.slice(0, 8).map((crypto) => (
          <div key={crypto.symbol} className="w-full">
            <CryptoTicket
              crypto={crypto}
              variant="horizontal"
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Cinta deslizante en mobile */}
      <div className="mt-3">
        <CryptoTicker cryptos={tickerCryptoData} />
      </div>
    </div>
  );
};