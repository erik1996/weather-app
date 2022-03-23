import { Reducer as ReactReducer } from "react";

import { ServerError } from "../../api/types";

import * as actions from "./actions";
import { ActionType, GenericActionCreator } from "./types";

type Action = GenericActionCreator<typeof actions>;

export type State<R> = {
  loading: boolean;
  data: R | null;
  error?: ServerError;
};

export const initialState = {
  loading: false,
  data: null,
  error: undefined,
};

export type Reducer<R> = ReactReducer<State<R>, Action>;

export const reducer = <R>(state: State<R>, action: Action): State<R> => {
  switch (action.type) {
    case ActionType.Pending:
      return {
        ...initialState,
        loading: true,
      };

    case ActionType.Fulfilled:
      return {
        ...state,
        loading: false,
        data: action.payload.response.data as R,
      };

    case ActionType.Rejected:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
