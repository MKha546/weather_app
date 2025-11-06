import React from "react";
import { SearchBar } from "./components/SearchBar";
import { TemperatureToggle } from "./components/TemperatureToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { LoadingSpiner } from "./components/LoadingSpiner";
import { ErrorMessage } from "./components/ErrorMessage";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherForecast } from "./components/WeatherForecast";
import { useWeather } from "./hooks/useWeather";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

function AppContent() {
  const  {
    currentWeather,
    forecast,
    loading,
    error,
    units,
    fetchWeatherByCity,
    fetWeatherByLocation,
    toggleUnits
  } = useWeather();
  
  const { t } = useLanguage();
  
  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCity(currentWeather.city);
      
    } else {
      fetchWeatherByCity("Ho Chi Minh City");
      fetWeatherByLocation();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://tse1.mm.bing.net/th/id/OIP.uTilNu8tH-pPz8M2gQ5wSQHaEo?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3')`,
        }}
      >
        {/* 
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 
          to-indigo-900/40 ">
          </div>
        <div className="absolute inset-0 bg-black-20"></div>
      */}
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className=" mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                {t('appTitle')}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t('appSubtitle')}
                </span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('appDescription')}
              </p>
            </div>
            <div
              className="flex flex-col lg:flex-row items-center justify-center space-y-6
              lg:space-y-0 lg:space-x-6 mb-12"
            >
              <SearchBar onSearch={fetchWeatherByCity} 
                         onLocation={fetWeatherByLocation}
                         loading={loading}
                         
                         />
              <div className="flex items-center space-x-4">
                <TemperatureToggle unit={units} onToggle={toggleUnits} />
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Main content section */}
          <div className="space-y-8">
            {/* Condition Rendering */}
            {loading && (
              <div className="flex  justify-center">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                <LoadingSpiner />
                <p className="text-white/80 font-medium mt-4 text-center">
                  {t('fetchingWeather')}
                </p>
              </div>
            </div>
          )}

            {/* Error Message */}
           {error && !loading &&( 
            <div className="max-w-2xl mx-auto">
              <ErrorMessage message={error} onRetry={handleRetry}/>
            </div>
          )}

            {/* conditional rendering */}
            {currentWeather && !loading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <WeatherCard weather={currentWeather} units={units} />
              </div>
              <div className="xl:col-span-1">
                {/* Conditional Rendering */}
                {forecast && <WeatherForecast forecast={forecast} units={units} />}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
