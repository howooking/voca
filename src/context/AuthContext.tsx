import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { login, logout, onUserChange } from '../api/firebase';

type AuthContextProviderProps = {
  children: React.ReactNode;
};
type AuthContextType = {
  user: any;
  login: () => void;
  logout: () => void;
  uid: string;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  uid: '',
});

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    onUserChange(setUser);
  }, []);
  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return { user, uid: user && user.uid, login, logout };
      }, [user])}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
