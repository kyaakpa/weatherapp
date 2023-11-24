"use client";
import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const [error, setError] = useState(null);

  const KEY = process.env.NEXT_PUBLIC_API_KEY;

  const getWeatherData = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`
      );
      setTemp(response.data.main.temp - 273.15);
      setWeatherData(response.data);
    } catch (error) {
      setError("City not found. Please try again.");
    }
  };

  const getColor = () => {
    if (temp === null) {
      return "bg-black text-white";
    } else if (temp < 10) {
      return "bg-blue-400 text-white";
    } else if (temp >= 10 && temp < 20) {
      return "bg-green-600 text-white";
    } else if (temp >= 20 && temp < 30) {
      return "bg-yellow-400 text-white";
    } else {
      return "bg-red-500 text-white";
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen  text-black ${getColor()}`}
    >
      <div className="flex flex-col gap-8 text-xl text-white">
        <h1 className="text-6xl font-semibold tracking-tighter">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          className="text-black p-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={getWeatherData}
          className="bg-blue-700 w-1/2 self-center p-2"
        >
          Search
        </button>

        {weatherData && (
          <div className="text-white text-2xl text-center mt-24 leading-loose">
            <h2 className="text-4xl font-medium">{weatherData.name}</h2>
            <p>Temperature: {temp.toFixed(0)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Weather;
