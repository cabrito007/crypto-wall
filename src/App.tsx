import React from 'react';
import { useCryptoData } from './hooks/useCryptoData';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { StatusBar } from './components/StatusBar';
import { MobileLayout } from './components/MobileLayout';
import { DesktopTabletLayout } from './components/DesktopTabletLayout';

function App() {
  const { cryptoData, tickerCryptoData, loading, error, lastUpdate, refetch } = useCryptoData();
  const deviceType = useDeviceDetection();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col">
      <StatusBar lastUpdate={lastUpdate} isConnected={!error} />
      
      {/* Renderizado condicional basado en el tipo de dispositivo */}
      {deviceType === 'mobile' ? (
        <div className="flex-1 overflow-y-auto">
          <MobileLayout 
            cryptoData={cryptoData} 
            tickerCryptoData={tickerCryptoData} 
          />
        </div>
      ) : (
        <div className="p-4">
          <DesktopTabletLayout 
            cryptoData={cryptoData} 
            tickerCryptoData={tickerCryptoData} 
          />
        </div>
      )}

      {/* Title - Posición condicional: Top Left en mobile, Bottom Left en desktop/tablet */}
      <div className={`fixed z-10 ${
        deviceType === 'mobile' 
          ? 'top-4 left-3' 
          : 'bottom-4 left-4'
      }`}>
        <div className="bg-black/90 backdrop-blur-md border border-gray-700/50 rounded-2xl px-3 py-1.5">
          <h1 className={`font-black text-white tracking-tight ${
            deviceType === 'mobile' ? 'text-xs' : 'text-lg'
          }`}>
            CRYPTO <span className="text-red-500">WALL</span>
          </h1>
        </div>
      </div>

      {/* Footer - Fixed at bottom center - No obstruction */}
      <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 ${deviceType === 'mobile' ? 'bottom-0' : 'bottom-2'}`}>
        <div className={`bg-black/95 backdrop-blur-md border-t border-gray-700/50 px-6 py-2 ${
          deviceType === 'mobile' 
            ? 'rounded-t-2xl border-x border-gray-700/50' 
            : 'rounded-full border border-gray-700/50'
        }`}>
          <p className={`text-gray-400 font-medium ${deviceType === 'mobile' ? 'text-xs px-3 py-1' : 'text-sm'}`}>
            {deviceType === 'mobile' ? 'Live • 10s • Binance' : 'Live Data • Updates Every 10s • Powered by Binance'}
          </p>
        </div>
      </div>

      {/* Indicador de tipo de dispositivo - Posición oculta pero accesible */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 right-2 z-50 bg-gray-800/60 text-gray-300 px-2 py-1 rounded text-xs font-mono opacity-30 hover:opacity-100 transition-opacity duration-300">
          {deviceType}
        </div>
      )}
    </div>
  );
}

export default App;