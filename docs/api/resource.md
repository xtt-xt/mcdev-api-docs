# 作品管理

> Base URL：`https://mc-launcher.webapp.163.com/`
> 所有接口需要登录 Cookie。

作品（Item）是开发者平台的核心实体，支持上传、更新、自测、审核、上架、删除全流程。

## 上传作品

创建新作品。

```
POST /items/categories/pe/upload
Content-Type: application/json
```

**请求体**（WorkCreateDTO 关键字段）：

```json
{
  "item_name": "我的模组",
  "mc_version": ["1.20.0"],
  "online_platform": ["pe"],
  "label_type_list": [1],
  "pri_type": 0,
  "sub_type": 0,
  "info": "<富文本介绍>",
  "tag": [],
  "mod_id": 0,
  "price_type": "free",
  "price": 0,
  "brief": "简介",
  "res_url": {
    "file": "https://pfp.ps.netease.com/2024/xx/xxx.zip",
    "md5": "<文件md5>"
  },
  "mc_version": ["1.20.0"],
  "is_original": true,
  "is_test_server": false,
  "is_quick_upload": false,
  "running_status": "normal"
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `item_name` | string | 作品名称 |
| `mc_version` | string[] | 支持的 MC 版本 |
| `res_url` | object | 上传后的文件信息（见 [文件上传](/guide/upload)） |
| `is_test_server` | bool | 是否测试服务器 |
| `is_quick_upload` | bool | 是否快速上传 |

**响应**：`{ status: "ok", data: null }`

## 更新作品

```
POST /items/categories/pe/{itemId}/update
```

**请求体**（WorkUpdateDTO 关键字段）：

```json
{
  "item_id": "12345",
  "item_name": "我的模组",
  "item_version": "1.0.1",
  "mc_version": ["1.20.0"],
  "info": "<富文本介绍>",
  "is_check_apply": false,
  "pre_review_video": "{}",
  "current_change_log": "修复了xxx",
  "res_url": {
    "file": "https://...",
    "md5": "..."
  }
}
```

**响应**：`{ status: "ok", data: null }`

## 开始自测 ✅

> 来源：官方网页版（`self-test-apply`）

将作品提交到自测环境，状态变为 `self_test`（自测中）。

```
PUT /items/categories/pe/{itemId}/self-test-apply
Content-Type: application/json
```

**请求体**：

```json
{
  "self_test_pass_check": false,
  "is_check_apply": true
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `self_test_pass_check` | bool | 是否通过自测校验 |
| `is_check_apply` | bool | 是否提交校验 |

**响应**：`{ status: "ok", data: null }`

## 取消自测 ✅

> 来源：官方网页版（`cancel_self_test`）

取消自测，作品状态回到 `init`（待提交审核）。

```
PUT /items/categories/pe/{itemId}/cancel_self_test
```

无请求体。

**响应**：`{ status: "ok", data: null }`

## 提交审核

```
PUT /items/categories/pe/{itemId}/apply_review
```

**请求体**（ApplyReviewDTO）：

```json
{
  "apply_review_text": "请审核",
  "conflict_notify": 1,
  "conflict_notify_type": [1],
  "is_check_apply": false
}
```

**响应**：`{ status: "ok", data: { ... } }`（ReviewApplyResultVO）

## 取消审核

```
PUT /items/categories/pe/{itemId}/cancel_review
```

**响应**：`{ status: "ok", data: null }`

## 上架

```
PUT /items/categories/pe/{itemId}/online
```

**请求体**（OnlineItemDTO）：

```json
{ "op_platform": "all" }
```

## 定时上架

```
PUT /items/categories/pe/{itemId}/appoint_online
```

**请求体**（AppointOnlineDTO）：

```json
{
  "appoint_online_time": "2024-08-01 10:00:00",
  "op_platform": "all"
}
```

## 删除作品 ✅

> 来源：官方网页版（`deleteItem`，HTTP DELETE）

删除指定作品。**注意：删除操作不可恢复**。

```
DELETE /items/categories/pe/{itemId}
```

**响应**：`{ status: "ok", data: null }`

::: warning 注意
删除前请确认作品状态。网页版中已上架作品可能无法直接删除（需先下架）。
:::

## 查询作品列表

```
GET /items/categories/{platform}?start=0&span=50&item_name=&mc_status=
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | `pe` 或 `pc` |
| `start` | int | 起始偏移，默认 0 |
| `span` | int | 数量，默认 `Int.MAX_VALUE` |
| `item_name` | string? | 按名称过滤 |
| `mc_status` | int? | 按状态过滤 |

**响应**：`ResourceListVO`（含 `items` 列表）

## 查询作品详情

```
GET /items/categories/pe/{itemId}
```

**响应**：`ResourceDetailVO`

## 查询依赖要求

```
GET /items/categories/comp/requirements?query_str=<名称>
```

**响应**：`RequirementVO`

## 查询审核反馈

```
GET /items/categories/pe/{itemId}/feedback
```

**响应**：`ReviewFeedbackVO`

## 查询标签 / MC 常量

```
GET /item-tag
GET /items/mc_consts
```

## 作品状态枚举

| 状态 | 说明 | 可用操作 |
|---|---|---|
| `init` | 待提交审核 | 自测、提交审核、更新 |
| `self_test` / `self_test_prepare` | 自测中 / 自测准备中 | 取消自测 |
| `reviewing` / `prepare` | 审核中 / 系统准备中 | 取消审核 |
| `rejected` | 审核未通过 | 更新、查看反馈 |
| `accept` | 待上架 | 上架、定时上架 |
| `online` | 已上架 | 更新、调整定价、查看反馈 |
| `offline` | 已下架 | 更新、查看反馈 |
| `system_offline` | 系统下架 | 更新、查看反馈 |
| `online_preparing` | 上架准备中 | — |