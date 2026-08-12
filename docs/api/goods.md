# 商品管理

> Base URL：`https://mc-launcher.webapp.163.com/`
> 来源：官方网页版（chunk 逆向补充）

商品（Goods）是作品下的增值内容（如地图、皮肤、组件等），挂在作品下按 `goods_id` 管理。

## 商品列表

```
GET /goods/multi/{itemId}?span=0
GET /goods/multi/{itemId}/show-window   # 橱窗商品
```

**响应**：

```json
{
  "status": "ok",
  "data": {
    "goods": [
      {
        "goods_id": "10001",
        "name": "皮肤A",
        "price": 120,
        "price_type": "diamond",
        "status": "init",
        "mall_image": { "url": "https://..." },
        "intro_image": { "url": "https://..." },
        "discount": null,
        "reject_msg": ""
      }
    ]
  }
}
```

## 商品状态操作

统一接口，通过 `status` 区分动作：

```
PUT /goods/{gameType}/{itemId}/{status}
Content-Type: application/json
```

**请求体**：

```json
{ "goods_id_list": ["10001", "10002"] }
```

| `status` 值 | 动作 | 说明 |
|---|---|---|
| `self_test` | **开始自测** | 商品提交自测（状态 → `self_test`） |
| `cancel_self_test` | **取消自测** | 取消打包自测（状态 → `init`） |
| `reviewing` | 提交审核 | 商品提交审核（状态 → `reviewing`） |
| `cancel_review` | 撤销审核 | 撤销审核（状态 → `init`） |
| `online` | 上架 | 更新到橱窗（状态 → `online`） |
| `offline` | 下架 | 下架（状态 → `accept`） |

`gameType` 取值：`pe`、`pe_multi`、`multi` 等（按平台）。

## 删除商品 ✅

> 来源：官方网页版（`handleDeleteGood`）

```
POST /goods/{gameType}/{itemId}/delete_goods/
Content-Type: application/json
```

**请求体**：

```json
{ "goods_id_list": ["10001", "10002"] }
```

::: warning 注意
网页版限制：**已上架（`online`）的商品无法删除**；承接礼包类型商品（`gift`）禁止删除。
:::

## 商品分组管理

### 获取分组

```
GET /goods/multi/{itemId}/groups/
```

### 操作分组（增删改）

```
PUT /goods/{gameType}/{itemId}/groups/{groupId?}
```

### 排序分组

```
PUT /goods/{gameType}/{itemId}/groups/
```

## 商品状态枚举

| 状态 | 说明 | 可用操作 |
|---|---|---|
| `init` | 待提交 | 编辑、提交审核、自测 |
| `self_test` / `self_test_prepare` | 自测中 / 自测准备中 | 取消自测 |
| `reviewing` | 审核中 | 撤销审核 |
| `reject` | 被拒绝 | 再次编辑、查看反馈 |
| `accept` | 待上架 | 下架（回到待上架前）、上架 |
| `online` | 已上架（橱窗） | 下架、更新到橱窗 |
| `preparing` | 上传商品中 | — |