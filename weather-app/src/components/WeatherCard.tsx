// src/components/WeatherCard.tsx
interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

interface WeatherCardProps {
  city: string;
  weather: WeatherData;
}

const weatherDescriptions: Record<number, string> = {
  0: "Clear Sky ☀️",
  1: "Mainly Clear 🌤️",
  2: "Partly Cloudy ⛅",
  3: "Overcast ☁️",
  45: "Fog 🌫️",
  48: "Rime Fog 🌫️",
  51: "Light Drizzle 🌦️",
  61: "Light Rain 🌧️",
  71: "Light Snow 🌨️",
  95: "Thunderstorm ⛈️",
};

export default function WeatherCard({ city, weather }: WeatherCardProps) {
  const desc = weatherDescriptions[weather.weathercode] || "Unknown Weather 🌈";

  return (
    <div className="mt-4 bg-blue-50 rounded-xl p-5 shadow-md">
      <h2 className="text-2xl font-semibold text-blue-700 mb-2">{city}</h2>
      <p className="text-lg">{desc}</p>
      <div className="flex justify-around mt-3 text-gray-700">
        <div>
          <p className="text-3xl font-bold">{weather.temperature}°C</p>
          <p className="text-sm">Temperature</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{weather.windspeed} km/h</p>
          <p className="text-sm">Wind Speed</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500">
        Last Updated: {new Date(weather.time).toLocaleString()}
      </p>
    </div>
  );
}
