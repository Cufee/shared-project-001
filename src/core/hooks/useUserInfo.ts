import { User } from "../types/User";
import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../storage/secure";

const useUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const loadUser = () => {
    const user = getStorageItem("user") as User | null;
    if (user) {
      setUser(user);
    }
  };

  const loadToken = () => {
    const token = getStorageItem("token") as string | null;
    if (token) {
      setToken(token);
    }
  };

  const refetch = () => {
    setUserLoading(true);
    loadUser();
    loadToken();
    setUserLoading(false);
  };

  const save = (user?: User, token?: string) => {
    setUserLoading(true);
    if (user) {
      setUser(user);
      setStorageItem("user", user);
    }
    if (token) {
      setToken(token);
      setStorageItem("token", token);
    }
    setUserLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    save,
    user,
    token,
    refetch,
    loading: userLoading,
  };
};

export default useUserInfo;
