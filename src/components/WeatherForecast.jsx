import React from "react";
import { Calendar, Droplets } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { formatDate, formatTemperature, getWeatherIcon } from "../utils/weatherutils";
import { useLanguage } from "../contexts/LanguageContext";


export const WeatherForecast = ({ forecast, units }) => {
  const { t, language, translateWeather } = useLanguage();
  
  const dailyForeast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const dailyForeastArray = Object.values(dailyForeast).slice(0, 5);


  return (
    <div
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20
    shadow-2xl"
    >
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 rounded-full bg-white/10">
          <Calendar className="w-6 h-6 text-white/80" />
        </div>
        <h2>{t('forecastTitle')}</h2>
      </div>

      <div className="space-y-4">
        {/* Map Method Logic */}
      {dailyForeastArray.map((item, index) => {
        const iconName = getWeatherIcon(item.weather[0].main);
        const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;
        return(
          <div
            key={item.dt}
            className="flex items-center justify-between bg-white/5 backdrop-blur-sm
            rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 group border border-white/10"
          >
          <div className="flex items-center space-x-5 flex-1">
            <div
              className="text-white/90 group-hover:text-white transition-all transform 
            group-hover:scale-110 duration "
            >
              {/* Dynamic Icons */}
              <IconComponent size={40} className="drop-shadow-2xl" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-lg">
                {/* Conditional Date */}
                {index === 0 ? t('today') : formatDate(item.dt, language)}
              </div>
              <div className="text-white/70 text-sm capitalize font-medium">
                {translateWeather(item.weather[0].description)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white/60">
              <Droplets className=" w-4 h-4 text-white/60" />
              <span className="text-sm font-medium">
                {/* Dynamic Details */}
                {Math.round(item.pop * 100)}%
              </span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-xl">
                <div className="text-white font-bold text-xl">
                  {formatTemperature(item.main.temp_max, units)}°{units === 'F' ? 'F' : 'C'}
                </div>
                <div className="text-white/70 font-medium text-sm">
                  {formatTemperature(item.main.temp_min, units)}°{units === 'F' ? 'F' : 'C'}
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      })}
      </div>
    </div>
  );
};
