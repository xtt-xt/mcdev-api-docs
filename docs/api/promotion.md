# 推广

> Base URL：`https://mc-launcher.webapp.163.com/`

## 是否可以申请推广

```
GET /promotion-banner/pe/can_apply
```

**响应**：

```json
{
  "status": "ok",
  "data": { "can_apply": true }
}
```

## 我的推广申请列表

```
GET /promotion-banner/user-applications
```

## 申请推广

```
POST /promotion-banner/apply/
```

**请求体**（ApplyPromotionDTO）：

```json
{
  "item_id": "10001",
  "banner_pic": "https://...",
  "start_time": "2024-08-01 00:00:00",
  "end_time": "2024-08-31 23:59:59"
}
```

## 修改推广申请

```
PUT /promotion-banner/apply/modify/{applicationId}
```