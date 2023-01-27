import {
  IJob, ILab,
} from './interfaces';

const URL = process.env.NEXT_PUBLIC_URL || process.env.URL;

export async function fetchLogin(body: string) {
  try {
    const response = await fetch(`${URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    return response.json();
  } catch (err) {
    console.log(err)
    return {};
  }
}

export async function fetchSignUp(body: string) {
  try {
    return fetch(`${URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then((data) => data.json())
  } catch(err) {
    console.log(err)
  }
}

export async function updateUserAuth({ accessToken, email }: any) {
  try {
    const tokenResponse = await fetch(`${URL}/auth/refresh/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: accessToken,
      },
    });
    return tokenResponse.json();
  } catch (err) {
    console.log(err)
    return {};
  }
}

export function listJobs(token: string): Promise<IJob[]> {
  return fetch(`${URL}/jobs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  }).then((data) => data.json());
}

export async function createJob(body: IJob, token: string) {
  try {
    return (await fetch(`${URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(body),
    }).then((data) => data.json()));
  } catch (err) {
    console.log(err)
    return {};
  }
}

export function listLabs(token: string): Promise<ILab[]> {
  return fetch(`${URL}/labs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  }).then((data) => data.json());
}

export async function createLab(body: ILab, token: string) {
  try {
    return (await fetch(`${URL}/labs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(body),
    }).then((data) => data.json()));
  } catch (err) {
    console.log(err)
    return {};
  }
}
