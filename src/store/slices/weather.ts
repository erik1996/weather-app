import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../api/api";
import { Weather, WeatherRequestParam } from "../../types/weather";

import { fetchForecast, setForecast } from "./forecast";

type State = {
  currentWeather: Weather | null;
  isFetching: boolean;
  isError: boolean;
};

const initialState: State = {
  currentWeather: null,
  isFetching: true,
  isError: false,
};

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (data: WeatherRequestParam, { dispatch }) => {
    dispatch(setForecast(null));
    const response = await api.weather.getCurrentWeather({
      cityName: data.cityName,
      lat: data.lat,
      lon: data.lon,
    });
    dispatch(fetchForecast(response.data.coord));
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<Weather | null>) => {
      state.currentWeather = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.isFetching = false;

        if (!action.payload) {
          state.isError = true;
          return;
        }
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const { setCurrentWeather } = weatherSlice.actions;

export const weather = weatherSlice.reducer;
