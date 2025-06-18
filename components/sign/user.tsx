"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function SignUser({ user }: { user: User }) {
  const t = useTranslations();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState<boolean>(true);

  // 检查用户是否为管理员
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setAdminCheckLoading(true);
        const response = await fetch('/api/check-admin');
        if (response.ok) {
          const data = await response.json();
          if (data.code === 0) {
            setIsAdmin(data.data.isAdmin);
          }
        }
      } catch (error) {
        // 客户端错误处理：区分网络错误和其他错误
        if (error instanceof TypeError && error.message.includes('fetch')) {
          console.warn('管理员权限检查网络错误，将重试:', error.message);
          // 网络错误时可以考虑重试逻辑
        } else {
          console.error('管理员权限检查失败:', error);
        }
        setIsAdmin(false);
      } finally {
        setAdminCheckLoading(false);
      }
    };

    if (user?.email) {
      checkAdminStatus();
    }
  }, [user?.email]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatar_url} alt={user.nickname} />
          <AvatarFallback>{user.nickname}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4">
        <DropdownMenuLabel className="text-center truncate">
          {user.nickname}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex justify-center cursor-pointer">
          <Link href="/my-orders">{t("user.user_center")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* 只有管理员才显示管理后台入口 */}
        {!adminCheckLoading && isAdmin && (
          <>
            <DropdownMenuItem className="flex justify-center cursor-pointer">
              <Link href="/admin/users" target="_blank">
                {t("user.admin_system")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          className="flex justify-center cursor-pointer"
          onClick={() => signOut()}
        >
          {t("user.sign_out")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
