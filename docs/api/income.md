# 收益

> Base URL：`https://mc-launcher.webapp.163.com/`

## 收益列表

```
GET /incomes?platform=pe&start=0&span=50
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | `pe`，默认 `pe` |
| `start` | int | 偏移，默认 0 |
| `span` | int | 数量，默认 `Int.MAX_VALUE` |

**响应**：`IncomeDetailVO`

## 申请提现

```
PUT /incomes/apply
```

**请求体**（ApplyIncomeDTO）：

```json
{
  "platform": "pe",
  "amount": 100,
  "apply_type": "wechat"
}
```

**响应**：`{ status: "ok", data: null }`

## 提现详情

```
GET /incomes/{id}
```

**响应**：`ApplyIncomeDetailVO`

## 激励基金

```
GET /incentive_fund/detail?platform=pe&start=0&span=50
```

**响应**：`IncentiveListDTO`

| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | `pe`，默认 `pe` |
| `start` | int | 偏移，默认 0 |
| `span` | int | 数量，默认 `Int.MAX_VALUE` |