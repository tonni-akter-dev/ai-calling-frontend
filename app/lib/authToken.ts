/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(TOKEN_KEY) || null;
}

export function getUser<T = any>(): T | null {
  if (typeof window === "undefined") return null;
  const raw = Cookies.get(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setAuth(token: string, user: any) {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "lax",
    path: "/",
  });
  Cookies.set(USER_KEY, JSON.stringify(user), {
    expires: 7,
    sameSite: "lax",
    path: "/",
  });
}

export function clearAuth() {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  Cookies.remove(USER_KEY, { path: "/" });
}

export function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}