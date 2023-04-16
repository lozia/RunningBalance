import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import './Weather.scss';

function Weather() {
  const { weather, getWeather } = useGlobalContext();

  // useEffect(() => {
  //   getWeather();
  // }, []);
  useEffect(() => {
    getWeather('New York'); // Replace 'New York' with your desired city
  }, []);

  return (
    <div className="weather-main">
      <InnerLayout>
        <h1>WEATHER</h1>
        <h2 className="weather-intro">
          Current Weather <span>{}</span>
        </h2>
        <div className="weather-content">{/* Add weather content here */}</div>
      </InnerLayout>
    </div>
  );
}

export default Weather;