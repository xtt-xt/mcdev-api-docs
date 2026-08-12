# 用户与榜单

> Base URL：`https://mc-launcher.webapp.163.com/`

## 用户信息

```
GET /users/me
```

**响应**：`UserInfoVO`

```json
{
  "status": "ok",
  "data": {
    "uid": 123456,
    "nick_name": "开发者",
    "avatar": "https://..."
  }
}
```

## 数据总览

```
GET /data_analysis/overview
```

**响应**：`OverviewVO`（作品数、收益、下载量等汇总）

## 等级信息

```
GET /new_level
```

**响应**：`LevelInfoVO`

## 我的资源列表

```
GET /items/categories/{platform}?start=0&span=50
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | `pe` / `pc`，默认 `pe` |
| `start` | int | 偏移，默认 0 |
| `span` | int | 数量，默认 `Int.MAX_VALUE` |

**响应**：`ResourceListVO`

## 排行榜

### PE 热门榜

```
GET /square/us_rank_list/?type=pe_hot&start=0&span=50&first_type=<int>
```

**响应**：`RankListVO<PeHotData>`

### 热搜榜

```
GET /square/us_rank_list/?type=hot_search&start=0&span=50&first_type=<int>
```

**响应**：`RankListVO<HotSearchData>`

### 通用榜单（下载/销量/点赞）

```
GET /square/rank_list/?type=pe_download&start=0&span=50&first_type=<int>
GET /square/rank_list/?type=pe_sell&start=0&span=50&first_type=<int>
GET /square/rank_list/?type=pc_download&start=0&span=50&first_type=<int>
GET /square/rank_list/?type=pc_like&start=0&span=50&first_type=<int>
```

**响应**：`RankListVO<CommonRankListData>`

| `type` 值 | 说明 |
|---|---|
| `pe_download` | PE 下载榜 |
| `pe_sell` | PE 销量榜 |
| `pc_download` | PC 下载榜 |
| `pc_like` | PC 点赞榜 |