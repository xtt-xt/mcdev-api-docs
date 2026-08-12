# API 概览

## Base URL

| 用途 | URL |
|---|---|
| 内容管理核心 | `https://mc-launcher.webapp.163.com/` |
| 登录（网易统一登录） | `https://dl.reg.163.com/` |
| 文件上传 | `https://fp.ps.netease.com/` |
| 网页版入口 | `https://mcdev.webapp.163.com/` |

## 通用响应结构

所有接口返回统一包装：

```json
{
  "status": "ok",
  "data": { },
  "msg": null
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `status` | string | `ok` 表示成功；失败时为错误标识 |
| `data` | object \| null | 业务数据，失败时为 `null` |
| `msg` | string \| null | 错误信息（失败时） |

## 认证

- 登录后服务端通过 `Set-Cookie` 下发会话 Cookie
- 后续请求需携带 Cookie（`NTES_SESS`、`P_INFO` 等）
- 未登录时接口返回 `not login` / `no auth` 等错误

## 请求构造（参考实现）

参考 [MCDevManager](https://github.com/BitterLemonn/MCDevManager) 的 `ApiFactory`：

- HTTP 客户端：Ktor / Ktorfit（Retrofit 风格）或 OkHttp / Retrofit
- 默认 `Content-Type: application/json`
- Cookie 持久化存储（自定义 CookiesStore）
- 超时：连接 15s，请求 15s；**上传 60s**；下载不限制
- 部分接口需要尾斜杠（如 `data_analysis/day_detail/`），可用自定义插件控制

## 模块索引

| 模块 | 页面 | 说明 |
|---|---|---|
| 作品管理 | [resource](/api/resource) | 上传 / 更新 / 自测 / 审核 / 上架 / 删除 |
| 商品管理 | [goods](/api/goods) | 增值内容商品管理（自测 / 删除等） |
| 用户与榜单 | [user](/api/user) | 用户信息、数据总览、排行榜 |
| 收益 | [income](/api/income) | 收益列表、提现、激励基金 |
| 数据分析 | [analyze](/api/analyze) | 日/月详情、实时收益 |
| 活动 | [activity](/api/activity) | 评审活动、折扣活动 |
| 评论 | [comment](/api/comment) | 评论列表与回复 |
| 反馈 | [feedback](/api/feedback) | 审核反馈、开发者反馈 |
| 站内信 | [mailbox](/api/mailbox) | 站内信列表、未读数 |
| 推广 | [promotion](/api/promotion) | 推广 banner 申请 |
| 其他 | [other](/api/other) | 红点等 |