# 项目介绍

> ⚠️ **免责声明**
> 本项目是**非官方**接口文档，与网易（NetEase）及其关联公司**无任何关联**，未经网易官方授权。
> 本文档内容基于公开前端资源的逆向整理，**仅供学习研究**，请勿用于任何商业用途或恶意行为。
> 使用本接口产生的一切后果由使用者自行承担。如侵犯您的权益，请联系删除。

## 这是什么

网易我的世界开发者平台（MCDev，`mcdev.webapp.163.com`）是《我的世界》中国版开发者的内容管理后台，
提供作品上传、审核、上架、收益结算等功能。本仓库整理其**前端 Web API 接口**，方便开发者：

- 通过代码自动化管理自己的作品（上传 / 自测 / 审核 / 上架 / 删除）
- 查询收益、数据分析、站内信、活动等
- 作为第三方工具（如移动端 App）的接口参考

## 信息来源

本文档的接口信息来自两个途径：

| 来源 | 说明 |
|---|---|
| [BitterLemonn/MCDevManager](https://github.com/BitterLemonn/MCDevManager) | Kotlin Multiplatform 第三方管理工具，实现了大部分接口 |
| 官方网页版前端 JS | `mcdev.webapp.163.com` 的 `app.js` 与按需加载 chunk，**补充了官方网页版的删除作品 / 自测 / 取消自测 / 商品管理等接口** |

## 接口特点

- **Base URL**：`https://mc-launcher.webapp.163.com/`
- **响应格式**：统一 `{ status, data, msg }` 结构
- **认证方式**：Cookie 会话（登录后由服务端下发）
- **登录加密**：RSA PKCS1（公钥加密，非对称）

## 相关项目

- [Nemo-Mobile-Mod-Studio](https://github.com/xtt-xt/Nemo-Mobile-Mod-Studio)：网易基岩版 Minecraft 可视化模组制作工具（Android）
