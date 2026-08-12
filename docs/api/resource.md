# 作品管理
> Base URL：`https://mc-launcher.webapp.163.com/`
> 所有接口需要登录 Cookie。
作品（Item）是开发者平台的核心实体，支持上传、更新、自测、审核、上架、删除全流程。

## 上传作品（新建）

创建新作品。
```
POST /items/categories/pe/upload
Content-Type: application/json
```
**请求体**（WorkCreateDTO，完整字段见下表）：
```json
{
  "item_name": "我的模组",
  "mc_version": ["1.20.0"],
  "online_platform": ["pe"],
  "label_type_list": [1],
  "pri_type": 0,
  "sub_type": 0,
  "mod_second_type": 0,
  "info": "<富文本介绍>",
  "tag": [],
  "mod_id": 0,
  "price_type": "free",
  "price_rank": -4,
  "price": 0,
  "trial_duration": 0,
  "brief": "简介",
  "is_original": true,
  "corp_proof_image": "",
  "activity_desc": "",
  "sync_pc_flag": false,
  "pe_is_add_play_plan": false,
  "mount_call_enabled": false,
  "mod_version": "",
  "java_version": "",
  "update_summary": "",
  "res": [
    {
      "res_url": { "body": "{}", "file_type": "zip_package", "sign": "<签名>" },
      "res_name": "资源包名.zip",
      "mc_version": ["1.20.0"],
      "add_version": true
    }
  ],
  "channel": [
    {
      "channel_id": 1,
      "channel_url": { "body": "{}", "file_type": "image", "sign": "<签名>" },
      "version": 1
    }
  ],
  "video_info_list": [],
  "dlc_info": { "dlc_switch": false, "dlc_type": "off", "master": {}, "slave_list": [] },
  "relate_item_id": 0,
  "searchable": true,
  "is_can_comment": false,
  "force_encrypt": false,
  "anti_cheat_enable": 0,
  "is_ea": 0,
  "achievement_enabled": 0,
  "item_update_push": true,
  "pure": false,
  "include_map": false,
  "weak_offline": false,
  "weak_offline_reason": "",
  "is_check_apply": false
}
```
**WorkCreateDTO 关键字段**：
| 字段 | 类型 | 说明 |
|---|---|---|
| `item_name` | string | 作品名称 |
| `mc_version` | string[] | 支持的 MC 版本（来自 `mc_consts.mc_version`） |
| `online_platform` | string[] | 平台，如 `["pe"]` |
| `label_type_list` | int[] | 推荐标签 id 列表（玩法=1 组、主题=2 组，来自 `mc_consts.label_type`） |
| `pri_type` / `sub_type` | int | 资源类别 / 具体类别（来自 `mc_consts.pri_type.pe`、`sub_type.pe` 联动） |
| `mod_second_type` | int | 次级分类（玩法模组，来自 `mc_consts.mod_second_type.subTag`） |
| `info` | string | 富文本介绍 |
| `tag` / `tags` | array | 自定义标签（对象数组 `[{name}]`） |
| `price_type` | string | `free` / `point`(绿宝石) / `diamond`(钻石)，见[价格体系](#价格体系) |
| `price_rank` | int | 钻石档位 0-6；免费=-4、绿宝石=-5 |
| `price` | int | 价格（钻石按档位价；绿宝石自定义；免费=0） |
| `trial_duration` | int | 试用时长（秒） |
| `res` | array | 资源文件列表，`res_url` 为[上传回执 FileInfoDTO](/guide/upload)（非 URL 字符串） |
| `channel` | array | 渠道宣传图，`channel_url` 同样为 FileInfoDTO（频道来自 `mc_consts.channel.pe` / `pe_multi`） |
| `video_info_list` | array | 视频（≤50MB，上传回执） |
| `dlc_info` | object | 关联模组：`dlc_switch` 开关、`dlc_type`(`off`/`master`/`slave`)、`master` 主包、`slave_list` 副包列表 |
| `relate_item_id` | long | 关联模组 id（`dlc_type=slave` 时对应主包） |
| `is_original` | bool | 是否原创；**非原创时必须传 `corp_proof_image`**（授权图上传回执） |
| `sync_pc_flag` | bool | 是否同步 PC |
| `activity_desc` | string | 活动说明 |
| `searchable` / `is_can_comment` / `force_encrypt` | bool | 可搜索 / 允许评论 / 强制加密 |
| `anti_cheat_enable` / `is_ea` / `achievement_enabled` | int | 反作弊 / 抢先体验 / 成就 开关（0/1） |
| `item_update_push` | bool | 更新推送 |
| `pure` / `include_map` | bool | 纯净版 / 包含地图 |
| `weak_offline` / `weak_offline_reason` | bool/string | 是否下架 + 下架理由 |
| `update_summary` | string | 更新纪要（≤200 字，去空白计数） |
| `is_check_apply` | bool | `false`=仅保存，`true`=保存并提审 |

**响应**：`{ status: "ok", data: null }`

## 更新作品

```
POST /items/categories/pe/{itemId}/update
```
**请求体**（WorkUpdateDTO）：基于 `GET /items/categories/pe/{itemId}` 返回的详情**整体回传**，仅覆盖用户改动字段。与新建的差异：
- `res[].res_url` / `channel[].channel_url` 为 URL 字符串（非 FileInfoDTO）
- `item_version` 自动递增：`1.9 → 2.0`，空值 → `0.1`
- 需携带 `item_id`、`current_change_log`、`pre_review_video`
- 额外字段：`sync_item_info`（同步 PC 信息）、`relate_item_weak_offline`、`discount` 等

```json
{
  "item_id": "12345",
  "item_name": "我的模组",
  "item_version": "2.0",
  "mc_version": ["1.20.0"],
  "info": "<富文本介绍>",
  "is_check_apply": false,
  "pre_review_video": "{}",
  "current_change_log": "修复了xxx",
  "res": [
    { "res_url": "https://pfp.ps.netease.com/...", "res_name": "资源包名.zip", "add_version": true }
  ]
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
## 查询作品列表 / 搜索作品
```
GET /items/categories/{platform}?start=0&span=50&item_name=&mc_status=
```
| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | `pe` 或 `pc`（关联模组搜索时 `comp`=电脑端模组前置） |
| `start` | int | 起始偏移，默认 0 |
| `span` | int | 数量，默认 `Int.MAX_VALUE` |
| `item_name` | string? | 按名称过滤（**可用作关键词搜索**，如关联模组选择器） |
| `mc_status` | int? | 按状态过滤（**1=已上架**，搜索可上架作品时用） |

> 关联模组搜索场景：`GET /items/categories/pe?start=0&span=20&item_name=<关键词>&mc_status=1`，返回 `data.item` 列表，取 `item_id` / `item_name` 填充 `relate_item_id`。
**响应**：`ResourceListVO`（含 `item` 列表，元素字段：`item_id` / `item_name` / `status` / `create_time` / `price_type` / `price`）

## 查询作品详情
```
GET /items/categories/pe/{itemId}
```
**响应**：`ResourceDetailVO`，完整字段见[作品详情字段](#作品详情字段-resourcedetailvo)。

## 查询依赖要求
```
GET /items/categories/comp/requirements?query_str=<名称>
```
**响应**：`RequirementVO`（PC 端前置模组依赖列表，用于 `requirement` 字段填充）

## 查询审核反馈
```
GET /items/categories/pe/{itemId}/feedback
```
**响应**：`ReviewFeedbackVO`

## 查询标签建议
```
GET /item-tag
```
**响应**（ItemTagVO）：
```json
{
  "tag_list": ["冒险", "解密", "建筑", "生存", "红石", "恐怖"]
}
```
| 字段 | 类型 | 说明 |
|---|---|---|
| `tag_list` | string[] | 平台建议标签，可作 `tag` 字段的候选项 |

## 查询 MC 常量（选项数据源）
```
GET /items/mc_consts
```
**响应**（MCConstsVO，作品表单所有下拉/多选的数据源）：
```json
{
  "pri_type": {
    "pe": [ { "id": 0, "title": "玩法" }, { "id": 1, "title": "组件" } ],
    "comp": [], "multi": [], "single": []
  },
  "sub_type": {
    "pe": { "0": [ { "id": 1, "title": "小游戏" } ], "1": [ { "id": 5, "title": "皮肤" } ] }
  },
  "mod_second_type": { "subTag": [ { "id": 0, "title": "通用" } ] },
  "label_type": {
    "1": [ { "id": 1, "title": "冒险" } ],
    "2": [ { "id": 101, "title": "中国风" } ]
  },
  "mc_version": ["1.20.0", "1.19.0"],
  "channel": {
    "pe": [ { "id": 1, "title": "组件宣传图", "version": 1 } ],
    "pe_multi": [ { "id": 2, "title": "网络游戏宣传图", "version": 1 } ]
  },
  "item_tag_limit": 5
}
```
**关键结构**：
| 字段 | 类型 | 说明 |
|---|---|---|
| `pri_type` | object | 资源类别，按平台分组 `pe`/`comp`/`multi`/`single`，元素 `{id,title}` |
| `sub_type` | object | 具体类别，`sub_type.pe` 为 `{资源类别id字符串: [{id,title}]}`，与 `pri_type.pe` 联动 |
| `mod_second_type` | object | 次级分类：`subTag` 数组（玩法模组用） |
| `label_type` | object | 推荐标签：`"1"`=玩法标签组、`"2"`=主题标签组，元素 `{id,title}` |
| `mc_version` | string[] | 可选 MC 版本 |
| `channel` | object | 宣传图频道：`pe`（组件）、`pe_multi`（网络游戏），元素含 `version` |
| `item_tag_limit` | int | 自定义标签数量上限 |
| `mod_version` / `java_version` / `pc_relate_version` | array | 模组版本 / JAVA 版本 / 同步 PC 版本候选项 |

## 价格体系

**`price_type`**（字符串）：
| 值 | 说明 |
|---|---|
| `free` | 免费 |
| `point` | 绿宝石计价 |
| `diamond` | 钻石计价 |

**`price_rank`**（钻石档位，仅 `price_type=diamond` 有效）：
| rank | 价格 |
|---|---|
| 0 | 300 钻 |
| 1 | 600 钻 |
| 2 | 1000 钻 |
| 3 | 2000 钻 |
| 4 | 5000 钻 |
| 5 | 10000 钻 |
| 6 | 20000 钻 |

特殊档位：`-4`=免费、`-5`=绿宝石（配合 `price_type` 使用）。

**规则**：
- `price_type=diamond` → `price` 按档位自动填充（`price_rank` 决定）
- `price_type=point` → `price` 自定义绿宝石数
- `price_type=free` → `price=0`
- `trial_duration`：试玩时长（秒），付费作品可设
- ⚠️ **已上架作品不可修改 `price_type`**：详情中 `first_online_time` 非空即判定已上架，前端需锁定定价类型

## 作品详情字段（ResourceDetailVO）

`GET /items/categories/pe/{itemId}` 返回的详情对象，编辑作品时用于预填表单。关键字段：
| 字段 | 类型 | 说明 |
|---|---|---|
| `item_id` / `item_name` / `item_version` | string | 基础信息 |
| `status` / `running_status` | string | 状态（见下方枚举） |
| `pri_type` / `sub_type` / `mod_second_type` | int | 资源类别 / 具体类别 / 次级分类 |
| `mc_version` | string \| string[] | 支持的 MC 版本（可能是数组或字符串） |
| `mod_version` / `java_version` | string | 模组版本 / JAVA 版本 |
| `info` / `brief` | string | 富文本介绍 / 简介 |
| `update_summary` | string | 更新纪要 |
| `activity_desc` | string | 活动说明 |
| `is_original` | bool | 是否原创 |
| `corp_proof_image` | string | 授权图（非原创必传） |
| `tags` | array | 自定义标签 `[{name}]` |
| `label_type_list` | int[] | 推荐标签 id 列表 |
| `res` | array | 资源文件：`[{res_name, res_url, add_version, mc_version}]` |
| `channel` | array | 渠道图：`[{channel_id, channel_url, version}]` |
| `video_info_list` | array | 视频列表 |
| `dlc_info` | object | 关联模组：`{dlc_switch, dlc_type, master, slave_list}` |
| `relate_item_id` | string | 关联模组 id |
| `sync_pc_flag` | bool | 同步 PC |
| `price_type` / `price_rank` / `price` / `trial_duration` | - | 定价，见[价格体系](#价格体系) |
| `first_online_time` | string | 首次上架时间（**非空 = 定价类型锁定**） |
| `weak_offline` / `weak_offline_reason` | bool/string | 下架状态 / 理由 |
| `searchable` / `is_can_comment` | bool | 可搜索 / 允许评论 |
| `force_encrypt` / `anti_cheat_enable` / `is_ea` / `achievement_enabled` | - | 加密 / 反作弊 / EA / 成就 |
| `item_update_push` / `pure` / `include_map` | bool | 更新推送 / 纯净 / 包含地图 |
| `pe_is_add_play_plan` / `mount_call_enabled` | bool | 畅玩计划 / 坐骑召唤 |
| `create_time` / `online_time` / `apply_review_time` | string | 时间戳 |

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
