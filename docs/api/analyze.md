# 数据分析

> Base URL：`https://mc-launcher.webapp.163.com/`

## 日详情

```
GET /data_analysis/day_detail/?platform=pe&category=<cat>&start_date=2024-01-01&end_date=2024-01-31&item_list_str=<ids>&sort=dateid&order=ASC&start=0&span=50&is_need_us_rank_data=true
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | 平台 |
| `category` | string | 分类 |
| `start_date` / `end_date` | string | 起止日期（YYYY-MM-DD） |
| `item_list_str` | string | 作品 ID 列表 |
| `sort` | string | 排序字段，默认 `dateid` |
| `order` | string | 排序方向 `ASC` / `DESC` |
| `is_need_us_rank_data` | bool | 是否需要榜单数据 |

**响应**：`ResDetailVO`

## 月详情

```
GET /data_analysis/month_detail/?platform=pe&category=<cat>&start_date=2024-01-01&end_date=2024-01-31&sort=monthid&order=DESC&start=0&span=50&day_sort=cnt_buy&day_span=50&day_dateid=<date>
```

**响应**：`ResMonthDetailVO`

## 单作品实时收益

```
GET /items/categories/{platform}/{iid}/incomes/?begin_time=2024-01-01&end_time=2024-01-31
```

| 参数 | 类型 | 说明 |
|---|---|---|
| `platform` | string | 平台 |
| `iid` | string | 作品 ID |
| `begin_time` / `end_time` | string | 时间范围 |

**响应**：`OneResRealtimeIncomeVO`