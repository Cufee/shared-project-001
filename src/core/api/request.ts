async function apiRequest<T>(
  method: string,
  endpoint: string,
  body: unknown | null,
  token: string | null = null,
): Promise<T> {
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

  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export { apiRequest };
