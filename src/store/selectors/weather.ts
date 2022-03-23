import { RootState } from "../../types/store";

export const getCurrentWeather = (state: RootState) => {
  return state.weather.currentWeather;
};

export const getWeatherLoading = (state: RootState) => {
  return state.weather.isFetching;
};

export const getWeatherError = (state: RootState) => {
  return state.weather.isError;
};
