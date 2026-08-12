# 文件上传

## 概述

作品资源（行为包/资源包 `.zip`、`.mcpack`、图片等）需要先上传到网易文件服务器
（`fp.ps.netease.com`），拿到文件 URL 后再用于创建/更新作品。

## 上传接口

```
POST https://fp.ps.netease.com/x19/file/new/
Content-Type: multipart/form-data
```

| 字段 | 说明 |
|---|---|
| `Authorization` | 上传凭证，形如 `Policy <sig>:<base64-json>` |
| `fpfile` | 文件本体（`Content-Disposition` 中带 `filename` 与 `Content-Type`） |

## 上传凭证（token）解析

`Authorization` 值格式：`Policy <sig>:<base64-json>`

其中 base64 部分解码后是 JSON，包含**实际上传地址**：

```json
{
  "url": "https://pfp.ps.netease.com/2024/07/01/xxxx.zip",
  "other": "..."
}
```

**流程**：

1. 用 `filepicker/file_token` 接口获取文件 token（或由上传前逻辑生成）
2. 解析 token 中的 `url` 字段 → 得到实际上传地址（不同 `file_type` 路由到不同子域）
   - `zip_package` → `pfp.ps.netease.com`
   - `image` → `fp.ps.netease.com`
3. 向该地址 POST 文件
4. 响应头 `x-ntes-signature` 为文件签名，保存备用
5. token 解析失败时回退默认地址 `https://fp.ps.netease.com/x19/file/new/`

## 获取文件 token

```
GET https://mc-launcher.webapp.163.com/filepicker/file_token
```

```json
{
  "status": "ok",
  "data": {
    "token": "Policy abc123:eyJ1cmwiOiJodHRwczovL3BmcC5wc..."
  }
}
```

## 响应结构

```json
{
  "body": "<文件服务器返回的JSON文本>",
  "sign": "<x-ntes-signature 响应头值>"
}
```

## 注意

- 上传超时建议放宽到 60s+（文件较大）
- 上传完成后，把返回的 URL 填入 `WorkCreateDTO.res_url` / `WorkUpdateDTO.channel_url` 等字段