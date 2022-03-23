import { Response } from "../../api/types";

export enum ActionType {
  Pending = "PENDING",
  Fulfilled = "FULFILLED",
  Rejected = "REJECTED",
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericActionCreator<T extends Record<string, any>> = ReturnType<
  InferValueTypes<T>
>;

export type ApiMethod<P, R, T> = {
  (params: P, transportConfig?: T): Response<R>;
};
