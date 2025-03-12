# 多语言实现方案指南

## 1. 现状分析

### 1.1 当前实现
- 网站界面已实现多语言支持
- 使用 next-i18next 进行国际化
- 工具详情页内容未实现多语言

### 1.2 存在问题
- 爬虫未配置语言参数
- 数据库缺少多语言字段
- 内容展示未区分语言

## 2. 改进方案

### 2.1 数据库调整
```sql
-- 添加多语言字段
ALTER TABLE web_navigation 
ADD COLUMN content_en TEXT,
ADD COLUMN content_zh TEXT,
ADD COLUMN description_en TEXT,
ADD COLUMN description_zh TEXT,
ADD COLUMN title_en TEXT,
ADD COLUMN title_zh TEXT;
```

### 2.2 爬虫服务更新

#### 2.2.1 请求参数调整
```typescript
type CrawlerRequest = {
  url: string;        // 待爬取的网站URL
  tags: string[];     // 可用的分类标签列表
  callback_url: string; // 爬虫完成后的回调地址
  key: string;        // 验证密钥
  language: string;   // 新增：语言参数 'en' | 'zh'
};
```

#### 2.2.2 爬虫调用逻辑
```typescript
// app/api/cron/route.ts
const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/cron_callback`;

// 英文内容爬取
const resEn = await crawler({
  url: firstSubmitData.url!,
  tags: categoryList!.map((item) => item.name),
  callback_url: callbackUrl,
  key: cronKey,
  language: 'en'
});

// 中文内容爬取
const resZh = await crawler({
  url: firstSubmitData.url!,
  tags: categoryList!.map((item) => item.name),
  callback_url: callbackUrl,
  key: cronKey,
  language: 'zh'
});
```

### 2.3 回调接口更新

```typescript
// app/api/cron_callback/route.ts
export async function POST(req: NextRequest) {
  try {
    const { 
      description, 
      detail, 
      name,
      title,
      language,
      url 
    } = await req.json();

    const supabase = createClient();

    // 根据语言更新对应字段
    const updateData = language === 'en' 
      ? {
          description_en: description,
          content_en: detail,
          title_en: title
        }
      : {
          description_zh: description,
          content_zh: detail,
          title_zh: title
        };

    const { error } = await supabase
      .from('web_navigation')
      .update(updateData)
      .eq('url', url);

    if (error) throw error;

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### 2.4 前端展示逻辑

```typescript
// app/[locale]/tools/[id]/page.tsx
import { useRouter } from 'next/router';

export default function ToolDetail({ tool }) {
  const { locale } = useRouter();
  
  // 根据当前语言选择对应内容
  const content = locale === 'en' ? tool.content_en : tool.content_zh;
  const description = locale === 'en' ? tool.description_en : tool.description_zh;
  const title = locale === 'en' ? tool.title_en : tool.title_zh;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>{content}</div>
    </div>
  );
}
```

## 3. 实施步骤

### 3.1 准备工作
1. 备份当前数据库
2. 准备数据迁移脚本
3. 更新爬虫服务代码

### 3.2 执行顺序
1. 执行数据库结构更新
2. 部署爬虫服务更新
3. 更新 API 接口代码
4. 更新前端展示逻辑
5. 测试新功能

### 3.3 数据迁移
```sql
-- 将现有内容复制到英文字段
UPDATE web_navigation 
SET 
  content_en = content,
  description_en = description,
  title_en = title;

-- 使用翻译服务生成中文内容
-- 这部分需要单独编写脚本处理
```

## 4. 注意事项

### 4.1 性能考虑
- 爬虫需要处理两种语言，处理时间会增加
- 数据库存储空间需求增加
- 考虑内容缓存策略

### 4.2 错误处理
- 某种语言爬取失败的备选方案
- 内容翻译质量保证
- 数据一致性维护

### 4.3 SEO优化
- 确保正确使用 hreflang 标签
- 维护语言特定的 sitemap
- 针对不同语言市场优化内容

## 5. 后续优化

### 5.1 功能扩展
- 添加更多语言支持
- 实现自动翻译功能
- 添加内容审核机制

### 5.2 维护计划
- 定期检查翻译质量
- 更新过期内容
- 监控用户语言偏好

## 6. 更新记录

- 2024-01-25: 初始文档创建
- [后续更新记录...] 