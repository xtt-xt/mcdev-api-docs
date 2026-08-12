# 活动

> Base URL：`https://mc-launcher.webapp.163.com/`
> 注意：以下路径在官方实现中**需要尾斜杠**（`TrailingSlash`）。

## 评审活动列表

```
GET /activities/pe-review-activities
```

## 评审活动模块候选人 / 作品

```
GET /activities/{activityId}/modules/{modulesId}/candidates
GET /activities/{activityId}/modules/{modulesId}/items
```

## 参加评审活动

```
POST /activities/{activityId}/modules/{modulesId}/join
```

## 折扣活动

```
GET /activities/discount_activities/current
GET /activities/discount_activities/candidates
```

## 参加 / 取消折扣活动

```
POST /activities/discount_activities/join
POST /activities/discount_activities/cancel_join
```

**请求体**（JoinDiscountDTO / CancelJoinDiscountDTO）：

```json
{
  "activity_id": "10001",
  "goods_id_list": ["10001", "10002"]
}
```