// src/App.tsx
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
      );
      const geoData = await geoRes.json();
      console.log(geoData, "geo Data")

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found.");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // Step 2: Get weather using coordinates
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setCity(name);
      setWeather(weatherData.current_weather);
    } catch {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center p-6 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">🌤️ Weather Now</h1>
      <SearchBar onSearch={fetchWeather} />

      {loading && <Loader />}
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {weather && <WeatherCard city={city} weather={weather} />}
    </div>
  );
}

export default App;
