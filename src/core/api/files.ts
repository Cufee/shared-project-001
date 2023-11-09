import { getStorageItem } from "../storage/secure";
import { File as UploadedFile } from "../types/File";
import { apiRequest } from "./request";

async function UploadFile(file: File) {
  const token = getStorageItem("token") as string;
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<UploadedFile>(
    "POST",
    `/file-management/upload`,
    formData,
    token,
    {
      stringify: false,
    }
  );
}

async function DeleteFile(id: string) {
  const token = getStorageItem("token") as string;

  return apiRequest<UploadedFile>(
    "DELETE",
    `/file-management/delete/${id}`,
    null,
    token
  );
}

async function UserFiles() {
  const token = getStorageItem("token") as string;
  return apiRequest<UploadedFile[]>(
    "GET",
    `/file-management/my-files`,
    null,
    token
  );
}

async function CompanyFiles() {
  const token = getStorageItem("token") as string;
  return apiRequest<UploadedFile[]>(
    "GET",
    `/file-management/my-company-files`,
    null,
    token
  );
}

export { UploadFile, UserFiles, CompanyFiles, DeleteFile };
