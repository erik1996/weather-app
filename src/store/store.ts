import { configureStore } from "@reduxjs/toolkit";

import { forecast } from "./slices/forecast";
import { stations } from "./slices/stations";
import { weather } from "./slices/weather";

export const store = configureStore({
  reducer: {
    weather,
    forecast,
    stations,
  },
});
