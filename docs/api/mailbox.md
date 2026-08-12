# 站内信

> Base URL：`https://mc-launcher.webapp.163.com/`

## 未读数

```
GET /mailbox/unread/count
```

**响应**：

```json
{
  "status": "ok",
  "data": { "count": 3 }
}
```

## 站内信列表

```
GET /mailbox?start=0&span=50
```

## 站内信详情

```
GET /mailbox/{mailId}
```

## 删除站内信（批量）

```
POST /mailbox/delete_many
```

**请求体**（DeleteMailDTO）：

```json
{
  "mail_ids": ["10001", "10002"]
}
```

## 标记已读（批量）

```
POST /mailbox/read_mail
```

**请求体**（ReadMailDTO）：

```json
{
  "mail_ids": ["10001", "10002"]
}
```