import React, { useEffect, useRef, useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { searchCities } from "../services/weatherAPI";
import { useLanguage } from "../contexts/LanguageContext";

function SearchBar({ onSearch, onLocation, loading }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async() => {
        if (query.length > 2) {
            setSearchLoading(true);
            try {
                const  result = await searchCities(query);
                setSuggestions(result);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setSearchLoading(false);
            }
        } else {
            setShowSuggestions(false);
            setSuggestions([]);
        }
    }, 300);
    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowSuggestions(false);
    }
  };
  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (city) => {
    const cityName = city.state ? `${city.name}, ${city.state}` : city.name;
    onSearch(cityName);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400/60
                w-5 h-5 group-focus-within:text-white transition-all"
          />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border
                border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none 
                focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all 
                duration-300 hover:bg-white/15"
            disabled={loading}
          />
          {/* Condition Rendering  */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50
                        hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
             > 
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onLocation}
            className={`absolute top-1/2 transform -translate-y-1/2 text-white/50
                    hover:text-white transition-all p-1 rounded-full hover:bg-white/10 ${
                      query ? "right-4" : "right-14"
                    }`}
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </form>
      {/* Condition Rendering */}
      {showSuggestions && (suggestions.length > 0 || searchLoading) && (
        <div
          className="absolute top-full left-0 right-0 bg-white/10 backdrop-blur-xl
         border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 mt-2"
        >
          {/* Condition Rendering */}

          {searchLoading ? (
            <div className="p-6 text-center text-white/70">
              <div
                className="animate-spin rounded-full h-6 w-6 border-2 border-white/30
                    border-t-white mx-auto"
              ></div>
              <p>{t('searchCities')}</p>
            </div>
          ) : (
            <>
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full py-6 px-4 text-left hover:bg-white/10 transition-all duration-200
                      flex items-center justify-between group border-b border-white/10 last:border-b-0"
                >
                  <div>
                  <div className="font-medium text-white group-hover:text-white/90 ">
                    {city.name}
                    {city.state && <span className="text-white/70">, {city.state}</span>}
                  </div>
                  <div className="text-sm text-white/60">{city.country}</div>
                  </div>
                  <Search className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-all"></Search>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export { SearchBar };
