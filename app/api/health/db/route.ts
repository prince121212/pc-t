import { respData, respErr } from "@/lib/resp";
import { checkDatabaseHealth } from "@/models/db";
import { log } from "@/lib/logger";

export async function GET() {
  try {
    log.info("开始数据库健康检查", { endpoint: "/api/health/db" });

    const health = await checkDatabaseHealth();

    if (health.healthy) {
      log.info("数据库连接正常", { latency: health.latency, endpoint: "/api/health/db" });
      return respData({
        status: "healthy",
        latency: health.latency,
        timestamp: new Date().toISOString()
      });
    } else {
      log.error("数据库连接异常", undefined, { error: health.error, endpoint: "/api/health/db" });
      return respErr(`数据库连接失败: ${health.error}`);
    }
  } catch (e) {
    log.error("健康检查异常", e as Error, { endpoint: "/api/health/db" });
    return respErr("健康检查失败");
  }
}
