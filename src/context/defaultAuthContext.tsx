import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CustomUser, login, logout, onUserChange } from '../api/firebase';

type AuthContextProviderProps = {
  children: React.ReactNode;
};
type AuthContextType = {
  user: CustomUser | null | undefined;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<CustomUser | null>(null);
  useEffect(() => {
    onUserChange(setUser);
  }, []);
  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return { user, login, logout };
      }, [user])}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
