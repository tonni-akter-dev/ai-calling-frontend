/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

// ============================================================
// 🔥 Multi-Layer Storage — Cookie + localStorage + sessionStorage
//    যেকোনো একটা কাজ করলেই login থাকবে
// ============================================================

function readFromCookie(key: string): string | null {
  try {
    const val = Cookies.get(key);
    return val || null;
  } catch {
    return null;
  }
}

function readFromLocal(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readFromSession(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeToCookie(key: string, value: string, days = 7) {
  try {
    Cookies.set(key, value, {
      expires: days,
      sameSite: "none",     // cross-site (api.aicallbd.com ↔ aicallbd.com)
      secure: true,          // HTTPS only — required for SameSite=none
      path: "/",
      // domain omitted — auto-detect current domain
    });
  } catch (err) {
    console.warn(`[auth] Cookie write failed for ${key}:`, err);
  }
}

function writeToLocal(key: string, value: string) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  } catch (err) {
    console.warn(`[auth] localStorage write failed for ${key}:`, err);
  }
}

function writeToSession(key: string, value: string) {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value);
    }
  } catch (err) {
    console.warn(`[auth] sessionStorage write failed for ${key}:`, err);
  }
}

function removeFromAll(key: string) {
  try {
    Cookies.remove(key, { path: "/" });
  } catch {}

  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }
  } catch {}
}

// ============================================================
// 🔍 getAuthValue — চেষ্টা করে সব storage:
//    1. Cookie → 2. localStorage → 3. sessionStorage
// ============================================================
function getAuthValue(key: string): string | null {
  if (typeof window === "undefined") return null;

  // 1. Try cookie
  const fromCookie = readFromCookie(key);
  if (fromCookie) return fromCookie;

  // 2. Try localStorage
  const fromLocal = readFromLocal(key);
  if (fromLocal) {
    // Cookie fail করেছে — restore cookie from localStorage
    writeToCookie(key, fromLocal);
    return fromLocal;
  }

  // 3. Try sessionStorage
  const fromSession = readFromSession(key);
  if (fromSession) {
    // Restore both cookie + localStorage
    writeToCookie(key, fromSession);
    writeToLocal(key, fromSession);
    return fromSession;
  }

  return null;
}

// ============================================================
// 📝 setAuthValue — সব storage এ একসাথে save
// ============================================================
function setAuthValue(key: string, value: string, days = 7) {
  if (typeof window === "undefined") return;

  // সব চেষ্টা করি — যেকোনো একটা save হলেই হবে
  writeToCookie(key, value, days);
  writeToLocal(key, value);
  writeToSession(key, value);
}

// ============================================================
// 🌐 Public API
// ============================================================

export function getToken(): string | null {
  return getAuthValue(TOKEN_KEY);
}

export function getUser<T = any>(): T | null {
  const raw = getAuthValue(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setAuth(token: string, user: any) {
  setAuthValue(TOKEN_KEY, token, 7);
  setAuthValue(USER_KEY, JSON.stringify(user), 7);
}

export function clearAuth() {
  removeFromAll(TOKEN_KEY);
  removeFromAll(USER_KEY);
}

// ============================================================
// ✅ For FormData requests — no Content-Type (browser sets boundary)
// ============================================================
export function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// ============================================================
// ✅ For JSON requests
// ============================================================
export function jsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}