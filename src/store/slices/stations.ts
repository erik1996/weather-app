import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../api/api";
import { Stations, StationsParamsData } from "../../types/stations";

type State = {
  stations: Stations[] | null;
  isFetching: boolean;
  isError: boolean;
};

const initialState: State = {
  stations: null,
  isFetching: false,
  isError: false,
};

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async () => {
    const response = await api.stations.getStations();
    return response.data;
  }
);

export const removeStations = createAsyncThunk(
  "stations/removeStations",
  async (id: string, { dispatch }) => {
    const response = await api.stations.removeStations(id);
    dispatch(fetchStations());
    return response.data;
  }
);

export const addStations = createAsyncThunk(
  "stations/addStations",
  async (data: StationsParamsData) => {
    const response = await api.stations.addStations(data);
    // dispatch(fetchStations());
    return response.data;
  }
);

const stationsSlice = createSlice({
  name: "stations",
  initialState,
  reducers: {
    setStations: (state, action: PayloadAction<Stations[] | null>) => {
      state.stations = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStations.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.isFetching = false;

        if (!action.payload) {
          state.isError = true;
          return;
        }
        state.stations = action.payload;
      })
      .addCase(fetchStations.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
    builder
      .addCase(removeStations.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(removeStations.fulfilled, (state, action) => {
        state.isFetching = false;

        if (!action.payload) {
          state.isError = true;
        }
        return;
      })
      .addCase(removeStations.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
    builder
      .addCase(addStations.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
      })
      .addCase(addStations.fulfilled, (state, action) => {
        state.isFetching = false;

        if (!action.payload) {
          state.isError = true;
        }
        return;
      })
      .addCase(addStations.rejected, (state) => {
        state.isFetching = false;
        state.isError = true;
      });
  },
});

export const { setStations } = stationsSlice.actions;

export const stations = stationsSlice.reducer;
