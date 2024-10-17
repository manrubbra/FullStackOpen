import axios from 'axios';

const api_key = import.meta.env.OPEN_WEATHER_KEY;
const baseUrl = 'http://api.openweathermap.org/data/2.5';

const getWeather = (city, code) => {
  console.log('#DEBUG - City -', city);
  console.log('#DEBUG - Code -', code);
  console.log('#DEBUG - Key ->', api_key);
  var url = `${baseUrl}/weather?q=${city},${code}&APPID=${api_key}`;

  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default { getWeather };
