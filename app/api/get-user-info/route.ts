import { respData, respErr, respJson } from "@/lib/resp";

import { findUserByUuid } from "@/models/user";
import { getUserUuid } from "@/services/user";
import { getUserCredits } from "@/services/credit";
import { checkDatabaseHealth } from "@/models/db";

export async function POST(req: Request) {
  const startTime = Date.now();
  let user_uuid = "";

  try {
    console.log("[get-user-info] 开始获取用户信息");

    // 获取用户UUID
    user_uuid = await getUserUuid();
    console.log("[get-user-info] 获取用户UUID:", user_uuid ? "成功" : "失败");

    if (!user_uuid) {
      console.log("[get-user-info] 用户未认证");
      return respJson(-2, "no auth");
    }

    // 查询用户信息
    console.log("[get-user-info] 开始查询用户信息, UUID:", user_uuid);
    const user = await findUserByUuid(user_uuid);
    console.log("[get-user-info] 用户信息查询结果:", user ? "找到用户" : "用户不存在");

    if (!user) {
      console.log("[get-user-info] 用户不存在, UUID:", user_uuid);
      return respErr("user not exist");
    }

    // 获取用户积分
    console.log("[get-user-info] 开始获取用户积分");
    const userCredits = await getUserCredits(user_uuid);
    console.log("[get-user-info] 积分获取结果:", userCredits);

    user.credits = userCredits;

    const duration = Date.now() - startTime;
    console.log(`[get-user-info] 成功获取用户信息, 耗时: ${duration}ms`);

    return respData(user);
  } catch (e) {
    const duration = Date.now() - startTime;
    console.error(`[get-user-info] 获取用户信息失败, 耗时: ${duration}ms, UUID: ${user_uuid}, 错误:`, e);

    // 记录详细错误信息
    if (e instanceof Error) {
      console.error("[get-user-info] 错误详情:", {
        name: e.name,
        message: e.message,
        stack: e.stack,
        user_uuid,
        duration
      });
    }

    return respErr("get user info failed");
  }
}
