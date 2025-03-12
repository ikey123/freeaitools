# 手动数据入库步骤

## 1. 准备数据
- 收集您要插入的数据，包括：
  - 网站名称
  - 网站 URL
  - 网站描述
  - 主要功能/服务
  - 分类信息
  - 网站图标 URL
  - 缩略图 URL
  - 收集时间（格式：YYYY-MM-DD HH:MM:SS）

### 字段说明
- **image_url**: 
  - 这是指向网站主图像的完整 URL。通常是网站的标志性图像或主要展示图像，用于在列表中展示该网站的视觉效果。
  - 示例: `https://example.com/image.png`

- **thumbnail_url**: 
  - 这是指向网站缩略图的完整 URL。缩略图通常是较小的图像，用于在列表中以较小的尺寸展示，帮助用户快速识别网站。
  - 示例: `https://example.com/thumbnail.png`

- **collection_time**: 
  - 这是记录数据收集时间的字段，格式为 `YYYY-MM-DD HH:MM:SS`。它用于标记数据何时被收集或插入数据库，便于后续的数据管理和更新。
  - 示例: `2024-06-18 12:00:00`

- **tag_name**: 
  - 这是用于标记网站的分类标签，可以是一个或多个关键词，帮助用户快速了解网站的主题或功能。
  - 示例: `AI工具, 资源`

- **website_data**: 
  - 这是指向网站的相关数据或附加信息的字段，通常用于存储 JSON 格式的数据，包含网站的额外信息或功能。
  - 示例: `{"功能": "在线编辑", "支持语言": ["中文", "英文"]}`

- **star_rating**: 
  - 这是一个整数值，用于表示网站的评分，通常范围为 0 到 5，帮助用户了解网站的受欢迎程度或质量。
  - 示例: `4`（表示 4 星评分）

- **category_name**: 
  - 这是指网站所属的分类名称，用于将网站归类，便于用户在浏览时进行筛选。
  - 示例: `设计, 开发`

## 2. 打开数据库管理工具
- 登录到您的 Supabase 账户。
- 选择您要操作的数据库。

## 3. 插入数据到 `web_navigation` 表
- 在 Supabase 的 SQL 编辑器中，使用以下 SQL 语句插入数据：

```sql
INSERT INTO public.web_navigation (
    name, 
    title, 
    content, 
    detail, 
    url, 
    image_url, 
    thumbnail_url, 
    collection_time, 
    tag_name, 
    website_data, 
    star_rating, 
    category_name
) VALUES (
    '网站名称',
    '网站标题',
    '网站内容',
    '网站详细信息',
    'https://example.com',
    'https://example.com/image.png',
    'https://example.com/thumbnail.png',
    '2024-06-18 12:00:00',
    'AI工具, 资源',
    '{"功能": "在线编辑", "支持语言": ["中文", "英文"]}',
    4,
    '设计'
);
```

- 替换上述 SQL 语句中的字段值为您收集到的实际数据。

## 4. 执行 SQL 语句
- 在 SQL 编辑器中执行插入语句，确保没有错误。
- 检查返回的结果，确认数据是否成功插入。

## 5. 验证数据
- 在 Supabase 的表格视图中查看 `web_navigation` 表，确认新插入的数据是否正确显示。
- 检查数据的完整性和准确性。

## 6. 更新其他相关表（如有需要）
- 如果需要，您还可以在其他表（如 `submit` 表）中插入相关数据，确保数据之间的关联性。

## 注意事项
- **数据格式**：确保插入的数据格式与数据库表的字段类型匹配。
- **数据完整性**：在插入数据之前，检查是否有重复数据，避免插入相同的记录。
- **备份**：在进行任何数据操作之前，建议备份数据库，以防止数据丢失。

## 示例
假设您要插入一个名为 "AI工具" 的网站，您可以使用以下 SQL 语句：

```sql
INSERT INTO public.web_navigation (
    name, 
    title, 
    content, 
    detail, 
    url, 
    image_url, 
    thumbnail_url, 
    collection_time, 
    tag_name, 
    website_data, 
    star_rating, 
    category_name
) VALUES (
    'AI工具',
    '最好的AI工具平台',
    '提供各种AI工具的集合',
    '详细介绍AI工具的功能和使用方法。',
    'https://ai-tools.com',
    'https://ai-tools.com/image.png',
    'https://ai-tools.com/thumbnail.png',
    '2024-06-18 12:00:00',
    'AI工具, 资源',
    '{"功能": "在线编辑", "支持语言": ["中文", "英文"]}',
    4,
    '设计'
);
```

通过以上步骤，您可以手动将数据插入到 Supabase 数据库中。如果您有其他问题或需要进一步的帮助，请告诉我！ 