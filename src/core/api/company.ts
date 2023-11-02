import { apiRequest } from "./request";

async function getCompanyDetails(token: string, id: string) {
  const res = await apiRequest<{}>("GET", `/company/${id}`, null, token);
  if ("error" in res) {
    return { data: null, error: res.error };
  }
  return { data: res, error: null };
}

export { getCompanyDetails };
