import { User } from "../types/User";
import { register as registerUser } from "../api/auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  deleteStorageItem,
  getStorageItem,
  setStorageItem,
} from "../storage/secure";
import { CurrentUser } from "../api/user";
import { useNotificationContext } from "./NotificationProvider";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/auth";
import { RegisterFromInvitePayload, RegisterPayload } from "../types/Api";
interface UserContext {
  user: User | null;
  loading: boolean;
  register: (payload: RegisterPayload | RegisterFromInvitePayload) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  refetch: () => void;
}

const UserContext = createContext<UserContext>({
  user: null,
  loading: true,
  register: () => {},
  logout: () => {},
  refetch: () => {},
  login: () => {},
});

const useUserContext = () => useContext(UserContext);

function UserProvider({ children }: PropsWithChildren<{}>) {
  const { error } = useNotificationContext();
  const navigate = useNavigate();

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
      error(res.error.message, res.error.context);
      deleteStorageItem("token");
      setToken(null);
      navigate("/login", { replace: true });
    }
  };

  const login = async (username: string, password: string) => {
    setUserLoading(true);
    const res = await loginRequest(username, password);
    if (res.error) {
      error(res.error.message, res.error.context);
      setUserLoading(false);
      return;
    }
    setToken(res.data.token);
    setStorageItem("token", res.data.token);
    await loadUser(res.data.token);
    setUserLoading(false);
    navigate("/upload", { replace: true });
  };

  const refetch = async () => {
    setUserLoading(true);
    if (token) {
      await loadUser(token);
    }
    setUserLoading(false);
  };

  const logout = () => {
    setUserLoading(true);
    setUser(null);
    setToken(null);
    deleteStorageItem("token");
    navigate("/", { replace: true });
    setUserLoading(false);
  };

  const register = async (
    data: RegisterPayload | RegisterFromInvitePayload
  ) => {
    setUserLoading(true);
    const res = await registerUser(data);
    if (res.data) {
      setToken(res.data.token);
      await loadUser(res.data.token);
      navigate("/upload", { replace: true });
    } else {
      error(res.error.message, res.error.context);
    }
    setUserLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading: userLoading,
        user,
        login,
        logout,
        refetch,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext };
export default UserProvider;
