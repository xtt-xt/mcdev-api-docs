# 评论

> Base URL：`https://mc-launcher.webapp.163.com/`

## 评论列表

```
GET /items/comment/pe/?item_id=<itemId>&start=0&span=50
```

**响应**：`CommentListVO`

## 回复评论

```
PUT /items/comment/pe/{id}/reply
```

**请求体**（ReplyDTO）：

```json
{
  "content": "感谢支持！",
  "reply_type": "text"
}
```