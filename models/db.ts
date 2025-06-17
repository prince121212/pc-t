import { createClient, SupabaseClient } from "@supabase/supabase-js";

// 全局客户端实例，避免重复创建
let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient() {
  // 如果已有客户端实例，直接返回
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL || "";

  let supabaseKey = process.env.SUPABASE_ANON_KEY || "";
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is not set");
  }

  // 创建客户端实例并配置
  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // API 路由中不需要持久化会话
    },
    db: {
      schema: 'public',
    },
    global: {
      headers: {
        'x-application-name': 'pc-t-app',
        'Connection': 'keep-alive', // 保持连接
      },
      fetch: (url, options = {}) => {
        return fetch(url, {
          ...options,
          // 增加到 10 秒超时，给数据库更多时间
          signal: AbortSignal.timeout(10000),
          // 添加连接管理
          keepalive: true,
        });
      },
    },
  });

  return supabaseClient;
}

/**
 * 重置数据库连接（在连接问题时使用）
 */
export function resetSupabaseClient() {
  console.log("[resetSupabaseClient] 重置数据库连接");
  supabaseClient = null;
  return getSupabaseClient();
}

/**
 * 检查数据库连接健康状态
 */
export async function checkDatabaseHealth(): Promise<{ healthy: boolean; error?: string; latency?: number }> {
  try {
    const startTime = Date.now();
    const supabase = getSupabaseClient();

    // 执行一个简单的查询来测试连接，使用 count 而不是 select 减少数据传输
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const latency = Date.now() - startTime;

    if (error) {
      console.error("[checkDatabaseHealth] 数据库连接检查失败:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return {
        healthy: false,
        error: error.message,
        latency
      };
    }

    console.log(`[checkDatabaseHealth] 数据库连接正常, 延迟: ${latency}ms, 用户数: ${count}`);
    return {
      healthy: true,
      latency
    };
  } catch (e) {
    console.error("[checkDatabaseHealth] 数据库连接检查异常:", e);
    return {
      healthy: false,
      error: e instanceof Error ? e.message : 'Unknown error'
    };
  }
}
