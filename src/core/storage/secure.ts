import secureLocalStorage from "react-secure-storage";

function getStorageItem(key: string) {
  return secureLocalStorage.getItem(key);
}

function setStorageItem(
  key: string,
  value: string | number | boolean | object,
) {
  return secureLocalStorage.setItem(key, value);
}

function deleteStorageItem(key: string) {
  return secureLocalStorage.removeItem(key);
}

export { deleteStorageItem, getStorageItem, setStorageItem };
