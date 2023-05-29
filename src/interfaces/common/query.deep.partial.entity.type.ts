export type QueryDeepPartialEntity<T> = {
  [P in keyof T]?: QueryDeepPartialEntity<T[P]> | T[P];
};
