import React from 'react';
import { WiDaySunny, WiCloud, WiSnow, WiRain, WiThunderstorm } from 'react-icons/wi'; // Import icons from react-icons library

const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition) {
    case 'Clear':
      return <WiDaySunny size={64} color="orange" />;
    case 'Clouds':
      return <WiCloud size={64} color="gray" />;
    case 'Snow':
      return <WiSnow size={64} color="lightblue" />;
    case 'Rain':
    case 'Drizzle':
      return <WiRain size={64} color="blue" />;
    case 'Thunderstorm':
      return <WiThunderstorm size={64} color="purple" />;
    default:
      return <WiDaySunny size={64} color="orange" />; // Default icon
  }
};

export default getWeatherIcon;
