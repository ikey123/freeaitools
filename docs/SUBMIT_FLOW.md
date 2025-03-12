# Tools AI Free 提交流程文档

## 1. 提交流程概述

### 1.1 用户提交入口
- 用户通过 `https://toolsaifree.com/submit` 页面提交网站
- 需要提供：email、url、name 等基本信息

### 1.2 数据存储流程
```typescript
// 提交数据存储过程
1. 检查 Authorization
2. 验证 submitKey
3. 检查 URL 是否已存在于 web_navigation 表
4. 如果不存在，将数据插入 submit 表
```

## 2. 数据处理流程

### 2.1 自动处理
- **定时任务触发**：
  - Vercel 定时调用 `/api/cron` 接口
  - 免费版：每天 1 次
  - Pro 版：可自定义频率

- **爬虫处理**：
  ```sh
  CRAWLER_API="https://{crawler_domain}/site/crawl_async"
  ```
  - 自动获取网站信息
  - 生成网站描述
  - 分类标签处理

- **数据入库**：
  - 处理后的数据存入 web_navigation 表
  - 更新 submit 表状态

### 2.2 手动处理
当爬虫失败时，需要站长手动处理：
1. 查询 submit 表未处理数据
2. 手动创建网站内容
3. 插入 web_navigation 表

## 3. 数据表说明

### 3.1 submit 表
存储用户提交的原始数据：
- email：提交者邮箱
- url：网站链接
- name：网站名称
- status：处理状态
- created_at：提交时间

### 3.2 web_navigation 表
存储最终展示的数据：
- url：网站链接
- name：网站名称
- description：网站描述
- tags：分类标签
- markdown_content：详情页内容
- status：状态

## 4. 内容生成

### 4.1 基础信息
- 网站标题
- 网站描述
- 标签分类
- 缩略图

### 4.2 详情页内容
- 由 GPT-4 自动生成
- 包含功能介绍
- 使用场景
- 特色功能

## 5. 角色职责

### 5.1 站长职责
1. 监控系统运行状态
2. 处理爬虫失败案例
3. 审核自动生成内容
4. 维护内容质量

### 5.2 用户职责
1. 提供准确的网站信息
2. 确保网站可访问
3. 关注提交状态

## 6. 优化建议

### 6.1 功能优化
1. 添加提交状态查询
2. 集成邮件通知系统
3. 提供内容编辑入口
4. 完善提交指南

### 6.2 流程优化
1. 改进爬虫成功率
2. 优化内容生成质量
3. 加快处理响应时间

## 7. 环境变量配置

```sh
# 必需的环境变量
NEXT_PUBLIC_SITE_URL="https://toolsaifree.com"
NEXT_PUBLIC_SUPABASE_URL="https://xxxyyyzzz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="XXX.YYY.ZZZ"

# 爬虫相关
CRAWLER_API="https://{crawler_domain}/site/crawl_async"
CRAWLER_API_KEY="xxxx"

# 验证相关
SUBMIT_AUTH_KEY="xxxx"
CRON_AUTH_KEY="keyxxxx"
```

## 8. 常见问题处理

### 8.1 爬虫失败
- 检查网站可访问性
- 验证反爬虫机制
- 考虑手动处理

### 8.2 内容质量
- 审核自动生成内容
- 优化 GPT 提示词
- 人工补充修正

### 8.3 处理延迟
- 检查定时任务配置
- 优化处理队列
- 考虑升级 Vercel 版本

## 9. 相关资源

- [Tools AI Free Crawler](https://github.com/ikey123/freeaitools-crawler)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs#cron-expressions)
- [Supabase 文档](https://supabase.com/docs)

## 10. 更新记录

- 2024-01-25: 初始文档创建
- [后续更新记录...] 