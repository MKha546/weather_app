import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ErrorMessage({ message, onRetry }) {
    const { t } = useLanguage();
    
    return (
        <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center mb-4 space-x-4">
                <div className="p-3 bg-red-500/20 rounded-full">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t('errorTitle')}</h3>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">{message}</p>

            {/* Conditional Rendering */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 
                    text-white rounded-xl transition-all duration-300 border border-red-500/30"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t('errorRetry')}</span>
                </button>
            )}
        </div>
    );
}