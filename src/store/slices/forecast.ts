import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../api/api";
import { Forecast } from "../../types/forecast";

type State = {
  forecast: Forecast | null;
  isFetching: boolean;
  isError: boolean;
};

const initialState: State = {
  forecast: null,
  isFetching: false,
  isError: false,
};

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (coord: { lat: number; lon: number }) => {
    const response = await api.weather.getForecast({
      lat: coord.lat,
      lon: coord.lon,
    });
    return response.data;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setForecast: (state, action: PayloadAction<Forecast | null>) => {
      state.forecast = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.isFetching = false;

        if (!action.payload) {
          state.isError = true;
          return;
        }
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const { setForecast } = forecastSlice.actions;

export const forecast = forecastSlice.reducer;
