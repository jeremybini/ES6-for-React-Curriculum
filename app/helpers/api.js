const axios = require('axios');

const _baseURL = 'http://api.openweathermap.org/data/2.5/';
const _APIKEY = 'b714ec74bbab5650795063cb0fdf5fbe';

function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
    .map(function (key) {
      return `${key}=${encodeURIComponent(queryStringData[key])}`
    }).join('&')
}

function prepUrl (type, queryStringData) {
  return `${_baseURL}${type}?${prepRouteParams(queryStringData)}`
}

function getQueryStringData (city) {
  return {
    q: city.split(',')[0],
    type: 'accurate',
    APPID: _APIKEY,
    cnt: 5
  }
}

async function getCurrentWeather (city) {
  try {
    const queryStringData = getQueryStringData(city)
    const url = prepUrl('weather', queryStringData)
    const currentWeatherData = await axios.get(url)
    return currentWeatherData.data
  } catch(err) {
    console.warn('Error in API helper, getCurrentWeather()', err);
  }
}

async function getForcast (city) {
  try {
    const queryStringData = getQueryStringData(city)
    const url = prepUrl('forecast/daily', queryStringData)
    const forecastData = await axios.get(url)
    return forecastData.data
  } catch(err) {
    console.warn('Error in API helper, getForcast()', err);
  }
}

export { getCurrentWeather, getForcast }