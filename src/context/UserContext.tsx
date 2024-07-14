import { ReactNode, createContext, useContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: (value: string) => void;
  getToken: () => void;
  logoutClient: () => void;
}

export const UserAuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setToken: () => {},
  getToken: () => {},
  logoutClient: () => {},
});

export const useAuth = () => useContext(UserAuthContext);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("access_token") ? true : false
  );

  const setToken = (value: string): void => {
    localStorage.setItem("access_token", value);
  };

  const getToken = (): string | null => {
    return localStorage.getItem("access_token");
  };

  const logoutClient = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const authData = {
    isAuthenticated,
    setIsAuthenticated,
    setToken,
    getToken,
    logoutClient,
  };
  return (
    <UserAuthContext.Provider value={authData}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserContextProvider;
