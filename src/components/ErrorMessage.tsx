import React from 'react';
import { AlertTriangle, RefreshCw, Wifi } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-500/30">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Wifi className="w-6 h-6 text-red-500 animate-pulse" />
          </div>
        </div>
        
        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-white text-3xl font-black mb-2">CONNECTION ERROR</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg leading-relaxed">{error}</p>
          </div>
          
          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="group flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-2xl transition-all duration-300 font-bold text-lg shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            RETRY CONNECTION
          </button>
          
          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Attempting to reconnect...</span>
          </div>
        </div>
      </div>
    </div>
  );
};