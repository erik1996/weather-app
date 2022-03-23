import axios, { AxiosPromise, AxiosRequestConfig, CancelToken } from "axios";

export type Transport = typeof axios;
export type TransportConfig = {
  cancelToken?: CancelToken;
};

export type RequestConfig = AxiosRequestConfig;

export type Response<T> = AxiosPromise<T>;

// TODO: Replace to actual ServerError interface
export type ServerError = {
  code: string;
  message: string;
};

type ExtractApiMethodParamsType<T> = T extends ApiMethodDeclaration<
  infer P,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer D
>
  ? P
  : never;

type ExtractApiMethodResponseDataType<T> = T extends ApiMethodDeclaration<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer P,
  infer D
>
  ? D
  : never;

type MakeApiFromApiDeclaration<
  T,
  P = ExtractApiMethodParamsType<T>,
  R = Response<ExtractApiMethodResponseDataType<T>>
> = P extends undefined
  ? {
      (params?: undefined, transportConfig?: TransportConfig): R;
    }
  : {
      (params: P, transportConfig?: TransportConfig): R;
    };

export type Api<T> = {
  [P in keyof T]: MakeApiFromApiDeclaration<T[P]>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ApiMethodDeclaration<ParamsData, ResponseData> = {
  (params: ParamsData): RequestConfig;
};

export type ApiDeclaration<T> = {
  [P in keyof T]: T[P];
};

export type PickApiMethodResponseType<T> = T extends ApiMethodDeclaration<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer P,
  infer R
>
  ? R
  : never;

export type PickApiMethodParamsType<T> = T extends ApiMethodDeclaration<
  infer P,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer R
>
  ? P
  : never;

export type PaginatedResponse<PageItem> = {
  page: number;
  pageSize: number;
  content: PageItem[];
  hasNext: boolean;
  hasPrevious: boolean;
};
