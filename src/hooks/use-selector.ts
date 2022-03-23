import {
  TypedUseSelectorHook,
  useSelector as useReactSelector,
} from "react-redux";

import { RootState } from "../types/store";

export const useSelector: TypedUseSelectorHook<RootState> = useReactSelector;
