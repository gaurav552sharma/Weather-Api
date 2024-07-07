import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const getWeather = async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  return response.data;
};

const getForecast = async (city) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
  return response.data.list;
};


export {getWeather,getForecast};

