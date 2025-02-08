import { HTTPError } from "../error";
import { TypedBody } from "./types";

export const createApi = ({
  host,
  headers,
}: {
  host: string;
  headers: HeadersInit;
}) => {
  return new Api(host, headers);
};

class Api {
  private host: string;
  private headers: HeadersInit;

  constructor(host: string, headers: HeadersInit) {
    this.host = host;
    this.headers = headers;
  }

  private async request<T>(
    ep: string,
    options: RequestInit,
    body?: TypedBody,
  ): Promise<T> {
    const response = await fetch(
      `${this.host}${ep}`,

      {
        method: options.method,
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
    return data;
  }

  public async post<T>(ep: string, body: TypedBody): Promise<T> {
    return this.request<T>(
      ep,
      {
        method: "POST",
      },
      body,
    );
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
      headers: this.headers,
    });
  }
  public put<T>(endpoint: string, body: TypedBody): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        headers: this.headers,
      },
      body,
    );
  }

  public delete<T>(endpoint: string, body: TypedBody): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: "DELETE",
        headers: this.headers,
      },
      body,
    );
  }

  public setHeaders(newHeaders: HeadersInit): void {
    this.headers = { ...this.headers, ...newHeaders };
  }
}
