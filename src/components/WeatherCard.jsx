import {
  Eye,
  Wind,
  Droplet,
  Gauge,
  Thermometer,
} from "lucide-react";


import React from "react";
import { MapPin, Sunrise, Sunset } from "lucide-react";
import { getWeatherIcon, formatTemperature, formatTime, formatDate } from "../utils/weatherutils";
import * as LucideIcons from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";


export function WeatherCard({ weather, units }) {
  const { t, language, translateWeather } = useLanguage();
  
  const iconName = getWeatherIcon(weather.weather[0].main);
  const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;  

  const WeatherStats = [
    {
      icon: Wind,
      label: t('wind'),
      value: `${weather.wind.speed.toFixed(1)} ${units === 'F' ? 'mph' : 'km/h'}`,
      color: "text-green-300",
    },
    {
      icon: Droplet,
      label: t('humidity'),
      value: `${weather.main.humidity}%`,
      color: "text-cyan-300",
    },
    {
      icon: Gauge,
      label: t('pressure'),
      value: `${weather.main.pressure} hPa`,
      color: "text-purple-300",
    },
    {
      icon: Thermometer,
      label: t('feelsLike'),
      value: `${formatTemperature(weather.main.feels_like, units)}°${units === 'F' ? 'F' : 'C'}`,
      color: "text-orange-300",
    },
    {
      icon: Eye,
      label: t('visibility'),
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      color: "text-blue-300",
    },
    
  ];
  return (
    <div
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl 
                    p-8 shadow-2xl  hover:bg-white/5 transition-all duration-500"
    >
      {/* Header  */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className=" p-2 bg-white/10 rounded-full">
            <MapPin className="w-5 h-5 text-white/80" />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">{weather.name}</h2>
            <p className="text-white/80 text-sm">{weather.sys.country}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/70 text-sm">
            {/* Display Dynamic Date */}
            {formatDate(weather.dt, language)}
          </div>
          <div className="text-white/50 text-xs">
            {/* Display Dynamic Time */}
            {formatTime(weather.dt, language)}
          </div>
        </div>
      </div>

      {/* Main content Display */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex-1">
          <div className="text-white text-7xl font-bold tracking-tight">
            {formatTemperature(weather.main.temp, units)}°{units === 'F' ? 'F' : 'C'}
          </div>
          <div className="text-white/90 text-xl font-medium mb-2 font-medium capitalize">
            {translateWeather(weather.weather[0].description)}
          </div>
          <div className="flex items-center space-x-4 text-white/60 text-sm">
            <span>{t('high')}: {formatTemperature(weather.main.temp_max, units)}°{units === 'F' ? 'F' : 'C'}</span>
            <span>{t('low')}: {formatTemperature(weather.main.temp_min, units)}°{units === 'F' ? 'F' : 'C'}</span>
          </div>
        </div>
        <div className="text-white/90 transform scale-110 transition-transform duration-300">
          {/* Display Dynamic Weather Icon */}
          <IconComponent size={20} className="drop-shadow-2xl" />
        </div>
      </div>
      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Map Method logic */}
      {WeatherStats.map((state, index) => {
        const IconComponent = state.icon;
        return (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/10 
            transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div
                className={`p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all`}
              >
                <IconComponent className={`w-4 h-4 ${state.color}`} />
              </div>
              <span className="text-white/70 text-sm font-medium">
                {state.label}
              </span>
            </div>
            <div className="text-white text-lg font-semibold pl-11">
              {state.value}
            </div>
          </div>
        )
      })}
      </div>

      {/* Sum Time */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20
        backdrop-blur-sm rounded-2xl p-4 border border-orange-400/20"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-full bg-orange-400/10">
              <Sunrise className="w-4 h-4 text-orange-300" />
            </div>
            <span className="text-white/80 text-sm font-medium"> {t('sunrise')}</span>
          </div>
          <div className="text-white text-lg font-semibold pl-11">
            {/* Dynamic Content  */}
            {formatTime(weather.sys.sunrise, language)}
          </div>
        </div>

        <div
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20
        backdrop-blur-sm rounded-2xl p-4 border border-purple-400/20"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-full bg-purple-400/10">
              <Sunset className="w-4 h-4 text-purple-300" />
            </div>
            <span className="text-white/80 text-sm font-medium"> {t('sunset')}</span>
          </div>
          <div className="text-white text-lg font-semibold pl-11">
            {/* Dynamic Content  */}
            {formatTime(weather.sys.sunset, language)}
          </div>
        </div>
      </div>
    </div>
  );
}
