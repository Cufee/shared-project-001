import { User } from "../types/User";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../storage/secure";
import { CurrentUser } from "../api/user";

const useUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    getStorageItem("token") as string | null,
  );
  const [userLoading, setUserLoading] = useState(true);

  const loadUser = async (token: string) => {
    const res = await CurrentUser(token);
    if (res.data) {
      setUser(res.data);
    }
  };

  const saveToken = (token: string) => {
    setToken(token);
    setStorageItem("token", token);
    refetch();
  };

  const refetch = () => {
    setUserLoading(true);
    if (token) loadUser(token).then(() => setUserLoading(false));
    else setUserLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    user,
    token,
    refetch,
    saveToken,
    loading: userLoading,
  };
};

export default useUserInfo;
