# MCDev API Docs

> 网易我的世界开发者平台（MCDev）非官方 API 接口文档

基于 [BitterLemonn/MCDevManager](https://github.com/BitterLemonn/MCDevManager) 与官方网页版（`mcdev.webapp.163.com`）前端逆向整理的接口文档，使用 [VitePress](https://vitepress.dev) 构建。

**📖 在线文档：https://mcdev-docs.xtt.p8.ink/**

## ⚠️ 免责声明

- 本项目为**非官方**项目，与网易（NetEase）**无任何关联**
- 内容基于公开前端资源逆向整理，**仅供学习研究**
- 请勿用于商业用途、恶意行为（刷量、绕过付费、攻击等）
- 使用本接口产生的一切后果由使用者自行承担

## ✨ 功能覆盖

| 模块 | 说明 |
|---|---|
| 作品管理 | 上传 / 更新 / 自测 / 取消自测 / 审核 / 上架 / 删除 |
| 商品管理 | 商品自测 / 取消自测 / 上架 / 下架 / 删除 |
| 用户与榜单 | 用户信息、数据总览、排行榜 |
| 收益 | 收益列表、提现、激励基金 |
| 数据分析 | 日/月详情、实时收益 |
| 登录认证 | RSA 加密登录、Cookie 会话 |
| 文件上传 | 网易文件服务器上传 |
| 其他 | 活动 / 评论 / 反馈 / 站内信 / 推广 |

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 本地预览
npm run docs:dev

# 构建静态站点
npm run docs:build

# 预览构建产物
npm run docs:preview
```

构建产物输出到 `docs/.vitepress/dist/`，可直接部署到 GitHub Pages / Vercel / Netlify 等静态托管。

## 🗂 项目结构

```
mcdev-api-docs/
├── docs/                    # 文档源码
│   ├── .vitepress/          # VitePress 配置
│   ├── index.md             # 首页
│   ├── guide/               # 指南（介绍/快速开始/登录/上传）
│   ├── api/                 # API 参考（作品/商品/收益/分析等 12 模块）
│   └── public/              # 静态资源
├── package.json
└── README.md
```

## 📖 接口来源说明

- **作品状态操作**（自测 / 取消自测 / 删除等）：逆向自官方网页版前端 JS（`app.js` 与按需加载 chunk）
- **其余接口**：参考 MCDevManager 开源实现

## 📄 License

[MIT](./LICENSE)