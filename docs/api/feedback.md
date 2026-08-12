# 反馈

> Base URL：`https://mc-launcher.webapp.163.com/`

## 审核反馈列表

```
GET /items/feedback/pe/?item_id=<itemId>
```

## 回复审核反馈

```
PUT /items/feedback/pe/{id}/reply
```

**请求体**（ReplyDTO）：

```json
{
  "content": "已修改，请重新审核",
  "reply_type": "text"
}
```

## 提交开发者反馈

```
POST /developer/feedback/add_feedback/
```

**请求体**（DeveloperFeedbackDTO）：

```json
{
  "content": "反馈内容",
  "contact": "联系方式",
  "images": []
}
```