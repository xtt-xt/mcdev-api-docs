# 快速开始

## 1. 登录获取会话

接口均需要登录态（Cookie）。登录流程：

1. **初始化**：`POST https://dl.reg.163.com/dl/zj/mail/ini`（携带 RSA 加密参数）
2. **获取加密参数**：`POST .../dl/zj/mail/powGetP`
3. **获取票据**：`POST .../dl/zj/mail/gt`
4. **安全登录**：`POST .../dl/zj/mail/l`

登录成功后，服务端通过 `Set-Cookie` 下发会话 Cookie，后续请求自动携带。

详见 [登录认证](/guide/auth)。

## 2. 获取用户信息

```bash
curl -X GET 'https://mc-launcher.webapp.163.com/users/me' \
  -H 'Cookie: <你的会话Cookie>'
```

```json
{
  "status": "ok",
  "data": {
    "uid": 123456,
    "nick_name": "开发者昵称"
  }
}
```

## 3. 上传作品（最小闭环）

上传作品分两步：

1. **文件上传**：把资源包（`.zip` / `.mcpack`）传到网易文件服务器，拿到 `res_url`
2. **创建作品**：`POST https://mc-launcher.webapp.163.com/items/categories/pe/upload`，body 携带 `res_url` 等信息

```bash
# 1. 上传文件
curl -X POST 'https://fp.ps.netease.com/x19/file/new/' \
  -F 'Authorization=Policy <token>' \
  -F 'fpfile=@./behavior.zip'

# 2. 创建作品
curl -X POST 'https://mc-launcher.webapp.163.com/items/categories/pe/upload' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: <你的会话Cookie>' \
  -d '{
    "item_name": "我的第一个模组",
    "mc_version": ["1.20.0"],
    "res_url": {"file": "https://...", "md5": "..."},
    "is_original": true
  }'
```

## 4. 作品状态流转

作品状态与可用操作：

```
init（待提交审核）
  ├── 自测 → self-test-apply → self_test（自测中）→ cancel_self_test → init
  ├── 提交审核 → apply_review → reviewing（审核中）→ cancel_review → init
  └── 更新 → update
reviewing → rejected（未通过）| accept（待上架）
accept → online（上架）| appoint_online（定时上架）
online → update / 查看反馈
任意状态 → deleteItem（删除）
```

## 5. HTTP 状态码约定

| 值 | 含义 |
|---|---|
| `ok` | 请求成功 |
| 其他 | 请求失败，`msg` 字段含错误说明（如 `not login`、`no auth`） |