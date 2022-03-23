export type Stations = {
  id: string;
  created_at: string;
  updated_at: string;
  external_id: string;
  name: string;
  longitude: number;
  latitude: number;
  altitude: number;
  rank: number;
};

export type StationsParamsData = {
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
};
