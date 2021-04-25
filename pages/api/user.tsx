import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export function getUser() {
  const token = window.localStorage.getItem('jwt');
  if (token !== null) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
  return false;
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
  const response = await axios.post('http://localhost:8000/login', { data: { req } });
  if (response.data.token) {
    localStorage.setItem('jwt', response.data.token);
    localStorage.setItem('jwt-expire', Date.now() + 2 * 60 * 60 * 1000);
  }
  return response;
}

export async function register(req: NextApiRequest, res: NextApiResponse) {
  const response = await axios.post('http://localhost:8000/register', { data: { req } });
  return response;
}
