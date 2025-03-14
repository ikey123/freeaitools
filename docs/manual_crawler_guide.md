# 手动爬虫操作指南

## 1. 站点信息收集
- 访问目标网站
- 记录以下信息：
  - 网站名称
  - 网站URL
  - 网站描述
  - 主要功能/服务
  - 网站分类（AI工具、资源等）
  - 网站语言
  - 网站图标URL
  - 网站截图

## 2. 数据提取
- 手动浏览网站，收集以下数据：
  - 主要功能模块
  - 特色功能
  - 定价信息（如有）
  - 用户评价/评分
  - 社交媒体链接
  - 联系方式
  - API文档（如有）

## 3. 数据清洗
- 整理收集的数据：
  - 去除重复信息
  - 统一格式（如日期、价格等）
  - 翻译非中文内容
  - 补充缺失字段
  - 验证URL有效性

## 4. 数据入库
- 打开数据库管理工具
- 连接到Supabase数据库
- 在`ai_tools`表中插入新记录：
  - 使用`db/supabase/insert_data.sql`中的格式
  - 确保所有字段都有值
  - 注意数据类型匹配

## 5. 生成web_navigation表
- 在`web_navigation`表中插入新记录：
  - 网站名称
  - 网站URL
  - 网站图标
  - 网站描述
  - 分类信息
  - 排序权重
  - 是否推荐
  - 创建时间

## 6. 数据验证
- 检查数据库记录：
  - 确认数据完整
  - 测试链接可用性
  - 检查数据一致性
  - 验证多语言支持

## 7. 更新网站内容
- 重新部署网站
- 检查新内容是否显示正确
- 测试搜索功能
- 验证导航菜单

## 8. 记录与维护
- 记录操作日志
- 更新操作手册
- 定期检查数据有效性
- 维护站点信息更新

> 注意：每次手动操作后，请及时备份数据库
