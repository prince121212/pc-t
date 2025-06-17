"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { cacheGet, cacheRemove } from "@/lib/cache";

import { CacheKey } from "@/services/constant";
import { ContextValue } from "@/types/context";
import { User } from "@/types/user";
import moment from "moment";
import useOneTapLogin from "@/hooks/useOneTapLogin";
import { useSession } from "next-auth/react";

const AppContext = createContext({} as ContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  if (
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true" &&
    process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID
  ) {
    useOneTapLogin();
  }

  const { data: session } = useSession();

  const [theme, setTheme] = useState<string>(() => {
    return process.env.NEXT_PUBLIC_DEFAULT_THEME || "";
  });

  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const fetchUserInfo = useCallback(async function () {
    try {
      setUserLoading(true);
      console.log("[fetchUserInfo] 开始获取用户信息");

      const resp = await fetch("/api/get-user-info", {
        method: "POST",
      });

      if (!resp.ok) {
        throw new Error("fetch user info failed with status: " + resp.status);
      }

      const { code, message, data } = await resp.json();
      if (code !== 0) {
        throw new Error(message);
      }

      setUser(data);
      console.log("[fetchUserInfo] 用户信息获取成功");

      updateInvite(data);
    } catch (e) {
      console.error("fetch user info failed", e);
    } finally {
      setUserLoading(false);
    }
  }, []);

  const updateInvite = useCallback(async (user: User) => {
    try {
      if (user.invited_by) {
        // user already been invited
        return;
      }

      const inviteCode = cacheGet(CacheKey.InviteCode);
      if (!inviteCode) {
        // no invite code
        return;
      }

      const userCreatedAt = moment(user.created_at).unix();
      const currentTime = moment().unix();
      const timeDiff = Number(currentTime - userCreatedAt);

      if (timeDiff <= 0 || timeDiff > 7200) {
        // user created more than 2 hours
        return;
      }

      // update invite relation
      const req = {
        invite_code: inviteCode,
        user_uuid: user.uuid,
      };
      const resp = await fetch("/api/update-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (!resp.ok) {
        throw new Error("update invite failed with status: " + resp.status);
      }
      const { code, message, data } = await resp.json();
      if (code !== 0) {
        throw new Error(message);
      }

      setUser(data);
      cacheRemove(CacheKey.InviteCode);
    } catch (e) {
      console.error("update invite failed: ", e);
    }
  }, []);

  useEffect(() => {
    if (session && session.user) {
      fetchUserInfo();
    }
  }, [session, fetchUserInfo]);

  // 使用 useMemo 优化 context value
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    showSignModal,
    setShowSignModal,
    user,
    setUser,
    userLoading,
    showFeedback,
    setShowFeedback,
  }), [
    theme,
    showSignModal,
    user,
    userLoading,
    showFeedback,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
