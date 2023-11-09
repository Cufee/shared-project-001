import { ApiResponse } from "../types/Api";
import { parseApiErrorMessage } from "./errors";

interface RequestOptions {
  contentType?: string;
  stringify?: boolean;
}

async function apiRequest<T>(
  method: string,
  endpoint: string,
  body: unknown | null,
  token: string | null = null,
  opts: RequestOptions = { stringify: true }
): Promise<ApiResponse<T>> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const url = new URL(endpoint, backendUrl).href;
  const headers: Record<string, string> = {};
  if (opts.contentType) {
    headers["Content-Type"] = opts.contentType;
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const options = {
    method: method,
    headers,
    body: body
      ? opts.stringify
        ? JSON.stringify(body)
        : (body as any)
      : undefined,
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (data.error || data.message) {
      return { data: null, error: parseApiErrorMessage(data) };
    }
    return { data: data as T, error: null };
  } catch (err) {
    console.error(err);
    return {
      data: null,
      error: {
        message: "Something went wrong while making a request to the server",
      },
    };
  }
}

export { apiRequest, type RequestOptions };
