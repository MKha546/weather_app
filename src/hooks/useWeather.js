import { useState, useEffect } from 'react';
import {
    getCurrentWeather,
    getCurrentWeatherByCoords, 
    getCurrentWeatherForecast, 
    searchCities 

} from '../services/weatherAPI';

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);    
    const [error, setError] = useState(null);
    const [units, setUnits] = useState('C');

    const fetchWeatherByCity = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const [weatherData, forecast] = await Promise.all([
                getCurrentWeather(city),
                getCurrentWeatherForecast(city)
            ]);
            setCurrentWeather(weatherData);
            setForecast(forecast);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }
    
    const fetWeatherByLocation = async () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }
        setLoading(true);
        setError(null);
        
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
            const { latitude, longitude } = position.coords;
            const weatherData = await getCurrentWeatherByCoords(
                latitude, 
                longitude
            );
            setCurrentWeather(weatherData);
            const forecast = await getCurrentWeatherForecast(weatherData.name);
            setForecast(forecast);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        }, (error) => {
            setError('unable to fetch your location');
            setLoading(false);
        }); 
        
    }

    const toggleUnits = () => {
        setUnits(units === 'C' ? 'F' : 'C');
    }

    // load default weather data - try to get user location first, fallback to Ho Chi Minh City
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const weatherData = await getCurrentWeatherByCoords(latitude, longitude);
                        setCurrentWeather(weatherData);
                        const forecast = await getCurrentWeatherForecast(weatherData.name);
                        setForecast(forecast);
                    } catch (error) {
                        // Fallback to Ho Chi Minh City if location fetch fails
                        fetchWeatherByCity('Ho Chi Minh City');
                    }
                },
                (error) => {
                    // If user denies location or location fetch fails, use Ho Chi Minh City
                    fetchWeatherByCity('Ho Chi Minh City');
                }
            );
        } else {
            // If geolocation is not supported, use Ho Chi Minh City
            fetchWeatherByCity('Ho Chi Minh City');
        }
    }, []);

    return {
        currentWeather,
        forecast,
        loading,
        error,
        units,
        fetchWeatherByCity,
        fetWeatherByLocation,
        toggleUnits
    }

};