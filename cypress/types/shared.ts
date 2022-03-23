export type DeepReplaceStringLiteralsWithString<T> = T extends string
  ? string
  : T extends object
  ? {
      [K in keyof T]: DeepReplaceStringLiteralsWithString<T[K]>;
    }
  : T extends Array<infer U>
  ? Array<DeepReplaceStringLiteralsWithString<U>>
  : T;
