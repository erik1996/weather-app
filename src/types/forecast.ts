type ForecastWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type ForecastWeatherItem = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: ForecastWeather[];
  clouds: number;
  pop: number;
  uvi: number;
};

export type Forecast = {
  lat: number;
  lon: number;
  timezone: "Etc/GMT-3";
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: ForecastWeather[];
  };
  hourly: ForecastWeatherItem[];
  daily: ForecastWeatherItem[];
};
