import React from 'react';
import { Wifi, Clock, Activity } from 'lucide-react';
import { useDeviceDetection } from '../hooks/useDeviceDetection';

interface StatusBarProps {
  lastUpdate: Date;
  isConnected: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ lastUpdate, isConnected }) => {
  const deviceType = useDeviceDetection();
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`fixed top-4 right-4 z-20 ${deviceType === 'mobile' ? 'top-2 right-2' : ''}`}>
      <div className={`bg-black/90 backdrop-blur-md border border-gray-700/50 rounded-2xl flex items-center gap-6 shadow-2xl ${
        deviceType === 'mobile' 
          ? 'px-3 py-2 gap-3 text-xs rounded-xl' 
          : 'px-6 py-3 text-sm'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-500'} animate-pulse`}></div>
          <Wifi className={`${deviceType === 'mobile' ? 'w-3 h-3' : 'w-4 h-4'} ${isConnected ? 'text-green-400' : 'text-red-500'}`} />
          <span className={`font-semibold ${isConnected ? 'text-green-400' : 'text-red-500'}`}>
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
        
        {deviceType !== 'mobile' && (
          <>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(lastUpdate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Activity className="w-4 h-4" />
              <span className="text-xs">BINANCE API</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};