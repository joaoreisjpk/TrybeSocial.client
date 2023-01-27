import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';

import { updateUserAuth } from '../helpers/fetchers';
import {
  getCookie,
  destroyCookie,
  setCookie,
} from '../helpers/cookie';

interface IContext {
  logout: () => Promise<void>;
  user: any;
  setUser: Dispatch<SetStateAction<string>>;
}

interface IProvider {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext({} as IContext);

export function AuthProvider({ children }: IProvider) {
  const [user, setUser] = useState<any>();
  const { pathname, push } = useRouter();
  const TEN_MIN = 1000 * 60 * 10;

  async function logout() {
    destroyCookie('trybesocialUser');
    setUser(null);
    push('/login');
  }

  async function handleUpdateUserAuth(userParam?: any) {
    try {
      const { user: updatedUser } = await updateUserAuth(userParam || user)
      if (!updatedUser) throw new Error('Acces Denied')
      setUser(updatedUser)
    } catch(err) {
      await logout()
    }
  }

  async function setInitalLoad(trybesocialUser: any) {
    const storagedUser = JSON.parse(trybesocialUser)
    await handleUpdateUserAuth(storagedUser)
    push('/');

    setInterval(handleUpdateUserAuth, TEN_MIN)
  }

  useEffect(() => {
    const authorizedPathNamesWithoutAuth = ['/login', '/signup'].includes(pathname)
    const trybesocialUser = getCookie('trybesocialUser')
    const storagedUser = trybesocialUser && JSON.parse(trybesocialUser)

    if (!storagedUser && !authorizedPathNamesWithoutAuth) push('/login')
    else if (storagedUser && !user) setInitalLoad(trybesocialUser)
    else if (storagedUser && user && authorizedPathNamesWithoutAuth) push('/')

  }, [pathname]);

  useEffect(() => {
    if (user) setCookie('trybesocialUser', JSON.stringify(user))
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IContext {
  const context = useContext(AuthContext);
  return context;
}
