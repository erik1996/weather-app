import { useCallback, useReducer, useRef } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { useDidMount, useWillUnmount } from "rooks";

import { ServerError, TransportConfig } from "../../api/types";
import { isServerError } from "../../api/utils";

import { fetchFailure, fetchStart, fetchSuccess } from "./actions";
import { initialState, Reducer, reducer } from "./reducer";
import { ApiMethod } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MakeFetchFunction<A> = A extends ApiMethod<infer P, infer R, infer T>
  ? P extends undefined
    ? (params?: P, transportConfig?: TransportConfig) => Promise<void>
    : (params: P, transportConfig?: TransportConfig) => Promise<void>
  : never;

export function useApiMethod<
  P,
  R,
  F extends MakeFetchFunction<ApiMethod<P, R, TransportConfig>>
>(
  apiMethod: ApiMethod<P, R, TransportConfig>
): [fetch: F, data: R | null, loading: boolean, error?: ServerError] {
  const mounted = useRef(false);
  const source = useRef<CancelTokenSource | null>(null);
  const [state, dispatch] = useReducer<Reducer<R>>(reducer, initialState);

  const fetch = useCallback(
    async (params: P, transportConfig?: TransportConfig) => {
      if (!transportConfig?.cancelToken) {
        source.current?.cancel();
        source.current = axios.CancelToken.source();
      }

      const token = transportConfig?.cancelToken || source.current?.token;

      try {
        dispatch(fetchStart());

        const response = await apiMethod(params, {
          ...transportConfig,
          cancelToken: token,
        });

        dispatch(fetchSuccess<AxiosResponse<R>>(response));
      } catch (error) {
        if (axios.isCancel(error) || !mounted.current) {
          return;
        }

        dispatch(
          fetchFailure(
            isServerError<ServerError>(error) ? error.response?.data : undefined
          )
        );
      }
    },
    [apiMethod]
  );

  useDidMount(() => {
    mounted.current = true;
  });

  useWillUnmount(() => {
    mounted.current = false;
    source.current?.cancel();
  });

  return [fetch as F, state.data, state.loading, state.error];
}
