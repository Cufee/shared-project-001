import { useEffect, useState } from "react";
import { User } from "../types/User";
import { getLocalToken } from "../storage/token";

const useUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUser = async (token: string) => {
    setUserLoading(false);
    setUser({ name: "test" } as User);
  };

  useEffect(() => {
    const token = getLocalToken();
    if (token) {
      fetchUser(token);
    } else {
      setUserLoading(false);
    }
  }, []);

  return {
    user,
    loading: userLoading,
  };
};

export default useUserInfo;
