import { User, Account, Finance, Balance } from "~/model/types";
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type Endpoints = {
  "POST /auth/send-reset-password-email": Message;
  "POST /auth/reset-password": Message;
  "POST /auth/register": Message;
  "POST /auth/login": User;
  "POST /auth/logout": Message;
  "GET /users/me": User;
  "GET /accounts": Paginated<Account>;
  "POST /accounts": Message;
  "DELETE /accounts": Message;
  "PUT /accounts": Message;
  "GET /finance": Paginated<Finance>;
  "GET /finance/balance": Balance;
  "POST /finance": Message;
  "DELETE /finance": Message;
  "PUT /finance": Message;
};

export type InfiniteData<T> = {
  pages: { content: T[] }[];
  pageParams: unknown[];
};

export type Paginated<T> = {
  total: number;
  totalPages: number;
  currentPage: number;
  content: T[];
  last: boolean;
};

export type Message = { message: string };

export type RequestOptions = RequestInit & {
  query?: Record<string, string | boolean | number>;
};

/* ReplaceArgs<'/user/{id}'>;
 Result: '/user/string' */
export type ReplaceArgs<T> =
  T extends `${infer Before}{${string}}${infer After}`
    ? `${Before}${string}${ReplaceArgs<After>}`
    : T;

export type SpecEndpoints<Spec> = {
  [K in keyof Spec as ReplaceArgs<K>]: Spec[K];
};

export type SpecPathsOf<Spec, M extends HttpMethod> = {
  [K in keyof SpecEndpoints<Spec>]: K extends `${M} ${infer P}` ? P : never;
}[keyof SpecEndpoints<Spec>];

export type SpecEndpointValue<
  Spec,
  K extends string,
> = SpecEndpoints<Spec>[K extends keyof SpecEndpoints<Spec> ? K : never];

export type TypedBody =
  | { type: "json"; data: string }
  | { type: "formData"; data: FormData };

export type JsonStringifiable = any;
