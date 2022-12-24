const URL = process.env.URL || 'http://localhost:3333';

interface IuserTokenResponse {
  acessToken?: string;
  refreshToken?: string;
  error?: string;
}

interface IUser {
  email: string
  firstName: string
  lastName: string
}

export async function fetchLogin(body: string) {
  let response;
  try {
    response = (await fetch(`${URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then((data) => data.json())) as IuserTokenResponse;
  } catch (err) {
    return {};
  }

  return response;
}

export async function fetchRefreshToken(token: string, id: number) {
  try {
    const tokenResponse = await fetch(`${URL}/auth/refresh/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });
    return tokenResponse.json() as IuserTokenResponse;
  } catch (err) {
    return {};
  }
}

export async function fetchLogout(email: string) {
  return fetch(`${URL}/auth/logout/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getUser(email: string): Promise<IUser> {
  return fetch(`${URL}/user/${email}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}
