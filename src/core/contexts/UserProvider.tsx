import { User } from "../types/User";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getStorageItem, setStorageItem } from "../storage/secure";
import { CurrentUser } from "../api/user";
import { useNotificationContext } from "./NotificationProvider";
import { parseApiErrorMessage } from "../api/errors";

interface UserContext {
  user: User | null;
  token: string | null;
  loading: boolean;
  refetch: () => void;
  saveToken: (token: string) => void;
}

const UserContext = createContext<UserContext>({
  user: null,
  token: null,
  loading: true,
  refetch: () => {},
  saveToken: () => {},
});

const useUserContext = () => useContext(UserContext);

function UserProvider({ children }: PropsWithChildren<{}>) {
  const { error } = useNotificationContext();

  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    getStorageItem("token") as string | null
  );

  const loadUser = async (token: string) => {
    const res = await CurrentUser(token);
    if (res.data) {
      setUser(res.data);
    } else {
      const { message, context } = parseApiErrorMessage(res.error);
      error(message, context);
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

  return (
    <UserContext.Provider
      value={{
        loading: userLoading,
        user,
        token,
        refetch,
        saveToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext };
export default UserProvider;
