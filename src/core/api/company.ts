import { getStorageItem } from "../storage/secure";
import { Company } from "../types/Company";
import { apiRequest } from "./request";

function getCompanyDetails(id: string) {
  const token = getStorageItem("token") as string;

  return apiRequest<Company>("GET", `/company/${id}`, null, token);
}

function createCompanyInvitation() {
  const token = getStorageItem("token") as string;

  return apiRequest<{ invitationToken: string }>(
    "POST",
    `/invitation`,
    null,
    token
  );
}

export { getCompanyDetails, createCompanyInvitation };
