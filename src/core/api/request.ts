import { ApiError } from "../types/Api";

async function apiRequest<T>(
  method: string,
  endpoint: string,
  body: unknown | null,
  token: string | null = null,
): Promise<T | ApiError> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const url = new URL(endpoint, backendUrl).href;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const options = {
    method: method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return data;
  } catch (err) {
    return {
      message: "Something went wrong while making a request to the server",
      error: "",
      statusCode: 500,
    } as ApiError;
  }
}

export { apiRequest };
