import { RootState } from "../../types/store";

export const getForecast = (state: RootState) => {
  return state.forecast.forecast;
};

export const getForecastLoading = (state: RootState) => {
  return state.forecast.isFetching;
};
