import { AxiosResponse } from "axios";

import { ServerError } from "../../api/types";

import { ActionType } from "./types";

export const fetchStart = () => ({
  type: ActionType.Pending as const,
});

export const fetchSuccess = <R extends AxiosResponse>(response: R) => ({
  type: ActionType.Fulfilled as const,
  payload: {
    response,
  },
});

export const fetchFailure = (error?: ServerError) => ({
  type: ActionType.Rejected as const,
  payload: error,
});
