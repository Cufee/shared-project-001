import { getStorageItem } from "./secure";

function getLocalToken() {
  const token = getStorageItem("token");
  if (token && typeof token === "string") {
    return token;
  }
  return null;
}

export { getLocalToken };
