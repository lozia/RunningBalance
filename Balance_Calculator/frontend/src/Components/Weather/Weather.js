import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import "./Weather.scss";

function Weather() {
//   const { weather, getWeather } = useGlobalContext();
  const { weather, weatherForecast, getWeather, getWeatherForecast } = useGlobalContext();
  const [selectedCity, setSelectedCity] = useState("Boston");

//   useEffect(() => {
//     getWeather(selectedCity);
//   }, [selectedCity]);
useEffect(() => {
    getWeather(selectedCity).then(() => {
      if (weather.coord) {
        getWeatherForecast(weather.coord.lat, weather.coord.lon);
      }
    });
  }, [selectedCity, getWeather, getWeatherForecast]);
  

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  console.log("Weather Forecast Prop:", weatherForecast);


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
        <div className="weather-forecast">
          {weatherForecast &&
            weatherForecast.daily.slice(1, 6).map((day, index) => (
              <div key={index} className="forecast-day">
                <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
                <p>Weather: {day.weather[0].main}</p>
                <p>Description: {day.weather[0].description}</p>
                <p>Temperature: {(day.temp.day - 273.15).toFixed(2)} °C</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Wind Speed: {day.wind_speed} m/s</p>
                <p>Wind Direction: {day.wind_deg}°</p>
              </div>
            ))}
        </div>
      </InnerLayout>
    </div>
  );
}


export default Weather;
