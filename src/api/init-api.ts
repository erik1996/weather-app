import axios, { AxiosRequestConfig } from "axios";

import {
  Api,
  ApiDeclaration,
  RequestConfig,
  Transport,
  TransportConfig,
} from "./types";

export function initApi<T>(
  apiDeclaration: ApiDeclaration<T>,
  extender: AxiosRequestConfig = {},
  transport: Transport = axios
) {
  const api = {} as Api<T>;

  Object.keys(apiDeclaration).forEach((key) => {
    api[key] = async function (
      params: unknown,
      transportConfig?: TransportConfig
    ) {
      let requestConfig: RequestConfig = apiDeclaration[key](params);

      requestConfig = Object.assign(
        {},
        extender,
        requestConfig,
        transportConfig
      );

      // eslint-disable-next-line no-useless-catch
      try {
        const result = await transport(requestConfig);

        return result;
      } catch (error) {
        // Add error logger
        throw error;
      }
    };
  });

  return api;
}
