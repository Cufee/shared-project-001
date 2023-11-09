import { getStorageItem } from "../storage/secure";
import { Company } from "../types/Company";
import { User } from "../types/User";
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

function getCompanyWorkers() {
  const token = getStorageItem("token") as string;
  return apiRequest<User[]>("GET", `/company/my/workers`, null, token);
}

function removeCompanyWorker(id: string) {
  const token = getStorageItem("token") as string;
  return apiRequest<{}>("DELETE", `/company/remove-worker/${id}`, null, token);
}

export {
  getCompanyDetails,
  createCompanyInvitation,
  getCompanyWorkers,
  removeCompanyWorker,
};
