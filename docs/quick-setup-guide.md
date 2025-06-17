# 快速配置指南

## 🚀 5分钟快速启动

### 步骤1: 复制环境变量模板
```bash
cp .env.example .env.development
```

### 步骤2: 配置必须的环境变量

编辑 `.env.development` 文件，配置以下必须的变量：

#### 🌐 基本信息
```env
NEXT_PUBLIC_WEB_URL = "http://localhost:3001"
NEXT_PUBLIC_PROJECT_NAME = "你的项目名称"
```

#### 🗄️ 数据库 (Supabase)
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建新项目或选择现有项目
3. 进入项目设置 → API
4. 复制以下信息：

```env
SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs..."
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIs..."
```

#### 🔐 认证密钥
```bash
# 生成认证密钥
npx auth secret
```

复制生成的密钥到环境变量：
```env
AUTH_SECRET = "生成的密钥"
NEXTAUTH_URL = "http://localhost:3001"
```

#### 👤 管理员配置
```env
ADMIN_EMAILS = "your-email@example.com"
```

### 步骤3: 检查配置
```bash
node scripts/check-env.js
```

### 步骤4: 启动项目
```bash
pnpm install
pnpm dev
```

## 🔧 可选功能配置

### 📧 邮件服务 (推荐)

#### SMTP邮件 (推荐配置)
```env
SMTP_HOST = "smtp.exmail.qq.com"
SMTP_PORT = "465"
SMTP_SECURE = "true"
SMTP_USER = "noreply@yourdomain.com"
SMTP_PASS = "your_email_password"
```

**测试邮件服务:**
```bash
node scripts/test-email.js
```

### 🔑 第三方登录

#### Google登录
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建OAuth 2.0客户端ID
3. 配置授权重定向URI: `http://localhost:3001/api/auth/callback/google`

```env
AUTH_GOOGLE_ID = "your_google_client_id"
AUTH_GOOGLE_SECRET = "your_google_secret"
NEXT_PUBLIC_AUTH_GOOGLE_ID = "your_google_client_id"
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED = "true"
```

#### GitHub登录
1. 访问 [GitHub Settings](https://github.com/settings/developers)
2. 创建新的OAuth App
3. 设置回调URL: `http://localhost:3001/api/auth/callback/github`

```env
AUTH_GITHUB_ID = "your_github_app_id"
AUTH_GITHUB_SECRET = "your_github_secret"
NEXT_PUBLIC_AUTH_GITHUB_ENABLED = "true"
```

### 💳 支付功能 (Stripe)

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/)
2. 获取API密钥

```env
STRIPE_PUBLIC_KEY = "pk_test_..."
STRIPE_PRIVATE_KEY = "sk_test_..."
STRIPE_WEBHOOK_SECRET = "whsec_..."
```

## 🧪 验证配置

### 1. 环境变量检查
```bash
node scripts/check-env.js
```

### 2. 邮件服务测试
```bash
# 测试连接
node scripts/test-email.js

# 发送测试邮件
node scripts/send-test-email.js
```

### 3. 启动开发服务器
```bash
pnpm dev
```

访问: http://localhost:3001

## 🔍 常见问题

### Q: 项目无法启动？
A: 运行 `node scripts/check-env.js` 检查必须的环境变量是否配置

### Q: 邮件发送失败？
A: 
1. 检查SMTP配置是否正确
2. 确认邮箱密码或授权码
3. 运行 `node scripts/test-email.js` 诊断问题

### Q: 第三方登录不工作？
A: 
1. 检查OAuth应用配置
2. 确认回调URL设置正确
3. 验证客户端ID和密钥

### Q: 数据库连接失败？
A: 
1. 检查Supabase URL和密钥
2. 确认项目状态正常
3. 验证网络连接

## 📞 获取帮助

1. **查看文档**: `docs/` 目录下的详细文档
2. **运行检查脚本**: `node scripts/check-env.js`
3. **查看日志**: 检查控制台输出的错误信息

## 🎯 下一步

配置完成后，您可以：

1. **自定义主题**: 编辑 `app/theme.css`
2. **修改内容**: 编辑 `i18n/pages/landing` 和 `i18n/messages`
3. **添加功能**: 根据需要添加新的功能模块
4. **部署项目**: 配置生产环境并部署

## 📋 配置清单

- [ ] 复制环境变量模板
- [ ] 配置基本信息 (URL, 项目名)
- [ ] 配置Supabase数据库
- [ ] 生成认证密钥
- [ ] 设置管理员邮箱
- [ ] 运行配置检查
- [ ] 启动开发服务器
- [ ] 配置邮件服务 (可选)
- [ ] 配置第三方登录 (可选)
- [ ] 配置支付功能 (可选)
- [ ] 测试所有功能

完成以上步骤后，您的项目就可以正常运行了！🎉

---

## 📋 完整环境变量配置表格

### 环境变量详细说明

| 变量名 | 必须 | 说明 | 配置路径/获取方式 | 示例值 |
|--------|------|------|------------------|--------|
| **🌐 Web Information** |
| `NEXT_PUBLIC_WEB_URL` | ✅ | 网站URL | 部署后的域名或本地开发地址 | `http://localhost:3001` |
| `NEXT_PUBLIC_PROJECT_NAME` | ✅ | 项目名称 | 自定义项目名称 | `模板一` |
| **🗄️ Database (Supabase)** |
| `SUPABASE_URL` | ✅ | Supabase项目URL | [Supabase Dashboard](https://supabase.com/dashboard) → 项目设置 → API | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | ✅ | Supabase匿名密钥 | Supabase Dashboard → 项目设置 → API → anon public | `eyJhbGciOiJIUzI1NiIs...` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase服务密钥 | Supabase Dashboard → 项目设置 → API → service_role | `eyJhbGciOiJIUzI1NiIs...` |
| **🔐 Authentication (NextAuth)** |
| `AUTH_SECRET` | ✅ | NextAuth密钥 | 运行 `npx auth secret` 生成 | `84IeAot0ALyXyTGDcs5r...` |
| `NEXTAUTH_URL` | ✅ | NextAuth回调URL | 与NEXT_PUBLIC_WEB_URL相同 | `http://localhost:3001` |
| **🔑 Google Auth** |
| `AUTH_GOOGLE_ID` | ❌ | Google OAuth客户端ID | [Google Cloud Console](https://console.cloud.google.com/) → API和服务 → 凭据 | `264195386129-xxx.apps.googleusercontent.com` |
| `AUTH_GOOGLE_SECRET` | ❌ | Google OAuth密钥 | Google Cloud Console → API和服务 → 凭据 | `GOCSPX-xxx` |
| `NEXT_PUBLIC_AUTH_GOOGLE_ID` | ❌ | Google OAuth客户端ID(公开) | 与AUTH_GOOGLE_ID相同 | `264195386129-xxx.apps.googleusercontent.com` |
| `NEXT_PUBLIC_AUTH_GOOGLE_ENABLED` | ❌ | 启用Google登录 | 设置为true/false | `true` |
| **🐙 GitHub Auth** |
| `AUTH_GITHUB_ID` | ❌ | GitHub OAuth应用ID | [GitHub Settings](https://github.com/settings/developers) → OAuth Apps | `Ov23li0ogMr1ABhqDxxs` |
| `AUTH_GITHUB_SECRET` | ❌ | GitHub OAuth密钥 | GitHub Settings → OAuth Apps → Client Secret | `935a25b62a7a247693668e90...` |
| `NEXT_PUBLIC_AUTH_GITHUB_ENABLED` | ❌ | 启用GitHub登录 | 设置为true/false | `true` |
| **📊 Analytics** |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | ❌ | Google Analytics ID | [Google Analytics](https://analytics.google.com/) → 管理 → 数据流 | `G-9HQ5K92YPF` |
| `NEXT_PUBLIC_OPENPANEL_CLIENT_ID` | ❌ | OpenPanel客户端ID | [OpenPanel](https://openpanel.dev/) → 项目设置 | `xxx` |
| **💳 Payment (Stripe)** |
| `STRIPE_PUBLIC_KEY` | ❌ | Stripe公钥 | [Stripe Dashboard](https://dashboard.stripe.com/) → 开发者 → API密钥 | `pk_test_xxx` |
| `STRIPE_PRIVATE_KEY` | ❌ | Stripe私钥 | Stripe Dashboard → 开发者 → API密钥 | `sk_test_xxx` |
| `STRIPE_WEBHOOK_SECRET` | ❌ | Stripe Webhook密钥 | Stripe Dashboard → 开发者 → Webhooks | `whsec_xxx` |
| `NEXT_PUBLIC_PAY_SUCCESS_URL` | ❌ | 支付成功跳转URL | 自定义支付成功页面 | `http://localhost:3001/my-orders` |
| `NEXT_PUBLIC_PAY_FAIL_URL` | ❌ | 支付失败跳转URL | 自定义支付失败页面 | `http://localhost:3001/#pricing` |
| `NEXT_PUBLIC_PAY_CANCEL_URL` | ❌ | 支付取消跳转URL | 自定义支付取消页面 | `http://localhost:3001/#pricing` |
| **👤 Admin** |
| `ADMIN_EMAILS` | ✅ | 管理员邮箱列表 | 用逗号分隔的管理员邮箱 | `admin@example.com,admin2@example.com` |
| **☁️ Storage (AWS S3/腾讯云COS)** |
| `STORAGE_ENDPOINT` | ❌ | 存储服务端点 | 腾讯云COS控制台 → 存储桶 → 基本配置 | `https://cos.ap-shanghai.myqcloud.com` |
| `STORAGE_REGION` | ❌ | 存储区域 | 腾讯云COS控制台 → 存储桶 → 基本配置 | `ap-shanghai` |
| `STORAGE_ACCESS_KEY` | ❌ | 存储访问密钥ID | 腾讯云控制台 → 访问管理 → API密钥管理 | `AKIDxxx` |
| `STORAGE_SECRET_KEY` | ❌ | 存储访问密钥 | 腾讯云控制台 → 访问管理 → API密钥管理 | `xxx` |
| `STORAGE_BUCKET` | ❌ | 存储桶名称 | 腾讯云COS控制台 → 存储桶列表 | `my-bucket-xxx` |
| `STORAGE_DOMAIN` | ❌ | 存储域名 | 腾讯云COS控制台 → 存储桶 → 域名与传输管理 | `https://my-bucket-xxx.cos.ap-shanghai.myqcloud.com` |
| **📧 Email Service (企业微信)** |
| `WEWORK_CORP_ID` | ❌ | 企业微信企业ID | [企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame#profile) → 我的企业 → 企业信息 → 企业ID | `wwbe65c73a64ad4de8` |
| `WEWORK_CORP_SECRET` | ❌ | 企业微信应用Secret | [企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame#apps) → 应用管理 → 选择应用 → Secret | `M96_uM4dR_Gxc2GZj3itvHHAZISVbnOsBm8ruCohZrw` |
| `WEWORK_AGENT_ID` | ❌ | 企业微信应用AgentID | 企业微信管理后台 → 应用管理 → 选择应用 → AgentId | `1000002` |
| `WEWORK_SENDER_EMAIL` | ❌ | 邮件发送者邮箱 | 自定义发送者邮箱地址 | `noreply@wm985.top` |
| `WEWORK_SENDER_NAME` | ❌ | 邮件发送者名称 | 自定义发送者名称 | `pc-t` |
| **📮 SMTP Email Service (备用邮件服务)** |
| `SMTP_HOST` | ❌ | SMTP服务器地址 | 邮件服务商提供 | `smtp.exmail.qq.com` |
| `SMTP_PORT` | ❌ | SMTP端口 | 邮件服务商提供 | `465` |
| `SMTP_SECURE` | ❌ | 是否使用SSL | 根据端口设置true/false | `true` |
| `SMTP_USER` | ❌ | SMTP用户名 | 邮箱账户 | `noreply@wm985.top` |
| `SMTP_PASS` | ❌ | SMTP密码 | 邮箱密码或授权码 | `your_password_here` |
| **🎨 Theme** |
| `NEXT_PUBLIC_DEFAULT_THEME` | ❌ | 默认主题 | 设置为light/dark | `light` |
| `NEXT_PUBLIC_LOCALE_DETECTION` | ❌ | 自动语言检测 | 设置为true/false | `false` |
| **🧪 Development** |
| `NEXT_PUBLIC_DEV_AUTH_ENABLED` | ❌ | 开发环境认证 | 开发环境设置为true | `true` |
| `NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED` | ❌ | Google一键登录 | 设置为true/false | `false` |

### 📧 邮件服务配置详解

#### SMTP邮件服务 (推荐)
```env
SMTP_HOST = "smtp.exmail.qq.com"
SMTP_PORT = "465"
SMTP_SECURE = "true"
SMTP_USER = "noreply@yourdomain.com"
SMTP_PASS = "your_email_password"
```

#### 企业微信邮件服务 (可选)
```env
WEWORK_CORP_ID = "your_corp_id"
WEWORK_CORP_SECRET = "your_corp_secret"
WEWORK_AGENT_ID = "your_agent_id"
```

**注意**: 企业微信服务需要在后台配置IP白名单，详见 [IP白名单配置指南](wework-ip-whitelist-setup.md)

### 🔍 环境变量检查工具

使用以下命令检查所有环境变量的配置状态：

```bash
node scripts/check-env.js
```

该脚本会：
- ✅ 检查所有必须的环境变量
- ⚠️ 显示可选功能的配置状态
- 💡 提供配置建议和警告
- 📊 生成配置状态报告

### 📚 相关文档

- [邮件服务配置指南](email-service-setup.md)
- [IP白名单配置](wework-ip-whitelist-setup.md)
- [管理员权限获取](admin-access-guide.md)
- [环境变量配置总结](environment-variables-summary.md)
