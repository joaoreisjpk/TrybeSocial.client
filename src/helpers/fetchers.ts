import {
  IJob, ILab, IUser, IuserTokenResponse,
} from './interfaces';

const URL = process.env.URL || process.env.NEXT_PUBLIC_URL;

export async function fetchLogin(body: string) {
  try {
    return (await fetch(`${URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then((data) => data.json())) as IuserTokenResponse;
  } catch (err) {
    return {};
  }
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

export function listJobs(): Promise<IJob[]> {
  return fetch(`${URL}/jobs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}

export async function createJob(body: IJob) {
  try {
    return (await fetch(`${URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((data) => data.json())) as IuserTokenResponse;
  } catch (err) {
    return {};
  }
}

export function listLabs(): Promise<ILab[]> {
  return fetch(`${URL}/labs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}

export async function createLab(body: ILab) {
  try {
    return (await fetch(`${URL}/labs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((data) => data.json())) as IuserTokenResponse;
  } catch (err) {
    return {};
  }
}
