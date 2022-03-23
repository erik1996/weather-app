import axios, { AxiosError } from "axios";

export function isServerError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
