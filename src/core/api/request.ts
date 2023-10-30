async function apiRequest<T>(
  token: string,
  method: string,
  endpoint: string,
  body: unknown | null,
): Promise<T> {
  const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
  const url = `${backendUrl}/api/${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
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
