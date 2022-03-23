import { useDispatch as useReactDispatch } from "react-redux";

import { AppDispatch } from "../types/store";

export const useDispatch = () => useReactDispatch<AppDispatch>();
