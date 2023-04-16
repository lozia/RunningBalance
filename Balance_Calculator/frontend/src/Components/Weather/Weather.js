import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import "./Weather.scss";

function Weather() {
  const { weather, getWeather } = useGlobalContext();
  const [selectedCity, setSelectedCity] = useState("Boston");

  useEffect(() => {
    getWeather(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="weather-main">
      <InnerLayout>
        <h1>WEATHER</h1>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="Boston">Boston</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        <h2 className="weather-intro">
          Current Weather: <span>{weather.name}</span>
        </h2>
        <div className="weather-content">
          {weather.weather && (
            <div>
              <p>Weather: {weather.weather[0].main}</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          )}
          {weather.main && (
            <div>
              <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
              <p>Feels Like: {(weather.main.feels_like - 273.15).toFixed(2)} °C</p>
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          )}
        </div>
      </InnerLayout>
    </div>
  );
}

export default Weather;
