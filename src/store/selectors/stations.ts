import { RootState } from "../../types/store";

export const getStations = (state: RootState) => {
  return state.stations.stations;
};

export const getStationsLoading = (state: RootState) => {
  return state.stations.isFetching;
};

export const getStationsError = (state: RootState) => {
  return state.stations.isError;
};
