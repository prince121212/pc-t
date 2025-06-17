import { getTimestamp } from "./time";

// get data from cache
export const cacheGet = (key: string): string | null => {
  // 检查是否在浏览器环境
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return null;
  }

  try {
    let valueWithExpires = localStorage.getItem(key);
    if (!valueWithExpires) {
      return null;
    }

    let valueArr = valueWithExpires.split(":");
    if (!valueArr || valueArr.length < 2) {
      return null;
    }

    const expiresAt = Number(valueArr[0]);
    const currTimestamp = getTimestamp();

    if (expiresAt !== -1 && expiresAt < currTimestamp) {
      // value expired
      cacheRemove(key);
      return null;
    }

    const searchStr = valueArr[0] + ":";
    const value = valueWithExpires.replace(searchStr, "");

    return value;
  } catch (error) {
    console.warn("Cache get error:", error);
    return null;
  }
};

// set data to cache
// expiresAt: absolute timestamp, -1 means no expire
export const cacheSet = (key: string, value: string, expiresAt: number) => {
  // 检查是否在浏览器环境
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return;
  }

  try {
    const valueWithExpires = expiresAt + ":" + value;
    localStorage.setItem(key, valueWithExpires);
  } catch (error) {
    console.warn("Cache set error:", error);
  }
};

// remove data from cache
export const cacheRemove = (key: string) => {
  // 检查是否在浏览器环境
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Cache remove error:", error);
  }
};

// clear all datas from cache
export const cacheClear = () => {
  // 检查是否在浏览器环境
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.clear();
  } catch (error) {
    console.warn("Cache clear error:", error);
  }
};
