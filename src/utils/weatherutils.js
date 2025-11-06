export const getWeatherIcon = (weather) => {

    const iconMap = {
        Clear: "Sun",
        Cloudy: "Cloud",
        Rain: "Rain",
        Snow: "Snow",
        Thunderstorm: "Thunderstorm",
        Mist: "Mist",
        Smoke: "Smoke",
        Haze: "Haze",
        Dust: "Dust",
        Fog: "Fog",
        Sand: "Sand",
        Ash: "Ash",
        Squall: "Squall",
        Tornado: "Tornado",
    };

    return iconMap[weather.main] || "Cloud";
};

export const formatTemperature = (temp, unit) => {
    if (unit === 'F') {
        return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
};

export const formatTime = (timestamp, locale = 'en-US') => {
    return new Date(timestamp * 1000).toLocaleTimeString(locale === 'vi' ? 'vi-VN' : 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: locale === 'vi' ? false : true 
    });
};    

export const formatDate = (timestamp, locale = 'en-US') => {
    return new Date(timestamp * 1000).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
};

export const formatWindSpeed = (speed) => {
    return Math.round(speed * 3.6);
};

export const formatPressure = (pressure) => {
    // Giữ nguyên hPa (đơn vị phổ biến ở Việt Nam)
    // Nếu cần mmHg, uncomment dòng dưới
    // return Math.round(pressure * 0.750062);
    return Math.round(pressure);
};

export const getWindDirection = (deg) => {

    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
};

export const getPrecipitation = (precipitation) => {
    return Math.round(precipitation * 100);
};

export const getHumidity = (humidity) => {
    // Độ ẩm từ API OpenWeatherMap đã là phần trăm (0-100)
    return Math.round(humidity);
};