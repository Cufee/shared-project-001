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
      contentType: "multipart/form-data",
    }
  );
}

export { UploadFile };
