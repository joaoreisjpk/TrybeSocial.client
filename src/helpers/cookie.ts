import { GetServerSidePropsContext as GSSContext } from 'next';
import {
  setCookie as setNookies,
  parseCookies as allCookies,
  destroyCookie as destroyNookie,
} from 'nookies';
import { decrypt, encrypt } from './encrypt';

export const setCookie = (
  name: string,
  value: string,
  time: number = 60 * 60 * 24 * 7, // 7days
) => {
  const encryptedValue = value && false ? encrypt(value) : value
  setNookies(undefined, name, encryptedValue, { maxAge: time });
}

export const getCookie = (name: string) => {
  const cookie = allCookies()[name];
  return cookie && false ? decrypt(cookie) : cookie
};

export const destroyCookie = (name: string, context: GSSContext | undefined = undefined) => {
  destroyNookie(context, name);
};

export const parseCookies = (context: GSSContext | undefined = undefined) => (
  context ? allCookies(context) : allCookies()
);
