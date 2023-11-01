import { getStorageItem } from "../storage/secure";
import { ApiError } from "../types/Api";
import { User } from "../types/User";
import { apiRequest } from "./request";

async function CurrentUser(token: string) {
  const res = await apiRequest<User | ApiError>("GET", "/user/me", null, token);
  if ("error" in res) {
    return { data: null, error: res.error };
  }
  return { data: res, error: null };
}

async function UpdatePassword(currentPassword: string, newPassword: string) {
  const token = getStorageItem("token") as string;

  const res = await apiRequest<User | ApiError>(
    "GET",
    "/user/change-password",
    { password: currentPassword, newPassword },
    token,
  );
  if ("error" in res) {
    return { data: null, error: res.error };
  }
  return { data: res, error: null };
}

async function UpdateUsername(username: string) {
  const token = getStorageItem("token") as string;

  const res = await apiRequest<User | ApiError>(
    "PATCH",
    "/user/change-username",
    { username },
    token,
  );
  if ("error" in res) {
    return { data: null, error: res.error };
  }
  return { data: res, error: null };
}

export { CurrentUser, UpdatePassword, UpdateUsername };
