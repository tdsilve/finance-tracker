import { HTTPError } from "../error";
import { HttpMethod, TypedBody, SpecPathsOf, SpecEndpointValue } from "./types";

export const createApi = <Spec>({
  host,
  headers,
}: {
  host: string;
  headers: HeadersInit;
}) => {
  return new Api<Spec>(host, headers);
};

class Api<Spec> {
  private host: string;
  private headers: HeadersInit;

  constructor(host: string, headers: HeadersInit) {
    this.host = host;
    this.headers = headers;
  }

  private async request<M extends HttpMethod, P extends SpecPathsOf<Spec, M>>(
    method: M,
    path: P,
    options: RequestInit,
    body?: TypedBody,
  ) {
    const response = await fetch(
      `${this.host}${path}`,

      {
        method: method,
        headers: {
          ...this.headers,
          ...options.headers,
          ...(body?.type === "json" && {
            "Content-Type": "application/json",
          }),
        },
        credentials: "include",
        ...(body && {
          body: body.data,
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new HTTPError(response.statusText, response.status, data);
    }
    return data as SpecEndpointValue<Spec, `${M} ${P}`>;
  }

  async post<P extends SpecPathsOf<Spec, "POST">>(path: P, body?: TypedBody) {
    return this.request("POST", path, {}, body);
  }

  async get<P extends SpecPathsOf<Spec, "GET">>(path: P, body: TypedBody) {
    return this.request("GET", path, {}, body);
  }
  // public put<T>(path: string, body: TypedBody): Promise<T> {
  //   return this.request(
  //     "PUT",
  //     path,
  //     {
  //       headers: this.headers,
  //     },
  //     body,
  //   );
  // }

  // public delete<T>(path: string, body: TypedBody): Promise<T> {
  //   return this.request(
  //     "DELETE",
  //     path,
  //     {
  //       headers: this.headers,
  //     },
  //     body,
  //   );
  // }

  public setHeaders(newHeaders: HeadersInit): void {
    this.headers = { ...this.headers, ...newHeaders };
  }
}
