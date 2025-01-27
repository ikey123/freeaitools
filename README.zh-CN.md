
## 最新功能介绍

- 支持AI工具列表展示
- 支持AI工具分类筛选
- 支持AI工具搜索
- 支持AI工具Markdown详情展示
- SEO友好（支持i18n）

## 技术栈说明

- 使用 NEXT 14 和 app 路由（react服务器组件）
- Supabase serverless 数据库
- 国际化
- SEO友好（支持i18n）
- 动态 sitemap.xml（支持i18n）
- tailwind CSS

## 前端页面截图

![toolsaifree](./public/images/toolsaifree.zh-CN.png)

## 感谢关注链接


如果觉得项目对你有帮助，欢迎请我喝杯咖啡：

<a href="https://www.buymeacoffee.com/toolsaifree" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>



## 部署说明

### 部署Tools AI Free Crawler

具体见[Tools AI Free Crawler](https://github.com/ikey123/freeaitools-crawler) 部署完成后，可以使用平台提供的域名或者自定义域名，作
为生成AI工具网页内容的API接口(示例：https://{crawler_domain}/site/crawl, {crawler_domain}为你的具体域名)，**需要配置到
env环境变量CRAWLER_API**中

### 创建Supabase数据库及执行sql脚本

- 注册[Supabase](https://supabase.com/), 创建数据库，记录SUPABASE_URL和SUPABASE_ANON_KEY, 用于后面vercel环境变量部署
- Supabase后台执行项目中db目录下的sql文件：create_table.sql, insert_category_data.sql, insert_data.sql **注：如需修改数
  据可以参考sql文件，也可以直接上Supabase后台编辑**

### 在Vercel上部署 **（别忘了设置环境变量）**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fikey123%2Ffreeaitools.git&env=NEXT_PUBLIC_SITE_URL,GOOGLE_TRACKING_ID,GOOGLE_ADSENSE_URL,CONTACT_US_EMAIL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,CRAWLER_API,CRAWLER_API_KEY,CRON_AUTH_KEY,SUBMIT_AUTH_KEY&project-name=toolsaifree)

环境变量参考如下: **注：环境变量key必须添加，必须正确的key包括
NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY，其他可填写随意字符串**

```sh
# Your domain
NEXT_PUBLIC_SITE_URL="https://toolsaifree.com"

# Google tracking ID and ad URL
GOOGLE_TRACKING_ID="G-XXXXXXX" GOOGLE_ADSENSE_URL="https://xxxx.googlesyndication.com/xxxxx/xxxxx"

# Contact email at the bottom
CONTACT_US_EMAIL="panleipanlei.qq@gmail.com"

# Supabase database URL and key
NEXT_PUBLIC_SUPABASE_URL="https://xxxyyyzzz.supabase.co" NEXT_PUBLIC_SUPABASE_ANON_KEY="XXX.YYY.ZZZ"

# Web crawler API interface
CRAWLER_API="https://crawler_domain/site/crawl_async"

# Crawler interface verification key
CRAWLER_API_KEY="xxxx"

# Custom interface verification key
CRON_AUTH_KEY="keyxxxx"

# Submit API verification key
SUBMIT_AUTH_KEY="xxxx"

```

**注：此版本采用了vercel的定时任务用来自动读取自动提交的网站并生成网站结果**

- 免费版vercel：仅支持每天调用1次，可以手动调用{doamin}/api/cron, 采用POST, Header: {"Authorization":"Bearer auth_key"},
  其中auth_key为env环境变量自定义配置
- Pro版vercel：可以参照此文档配置[Vercel Cron Jobs](https://vercel.com/docs/cron-jobs#cron-expressions)

## 本地运行

### 安装

- node
- nvm
- pnpm

### 设置

#### （1）克隆此项目

```sh
git clone https://github.com/ikey123/freeaitools.git
```

### 创建Supabase数据库及执行sql脚本

- 注册[Supabase](https://supabase.com/), 创建数据库，记录SUPABASE_URL和SUPABASE_ANON_KEY, 用于后面vercel环境变量部署
- Supabase后台执行项目中db目录下的sql文件：create_table.sql, insert_category_data.sql, insert_data.sql **注：如需修改数
  据可以参考sql文件，也可以直接上Supabase后台编辑**

#### （3）设置环境变量

- 在根目录下，创建 `.env.local` 文件，填入具体数值，例子如下：

环境变量参考如下: **注：环境变量key必须添加，必须正确的key包括
NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY，其他可填写随意字符串**

```sh
# Your domain
NEXT_PUBLIC_SITE_URL="https://toolsaifree.com"

# Google tracking ID and ad URL
GOOGLE_TRACKING_ID="G-XXXXXXX"

GOOGLE_ADSENSE_URL="https://xxxx.googlesyndication.com/xxxxx/xxxxx"

# Contact email at the bottom
CONTACT_US_EMAIL="panleipanlei.qq@gmail.com"

# Supabase database URL and key
NEXT_PUBLIC_SUPABASE_URL="https://xxxyyyzzz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="XXX.YYY.ZZZ"

# Web crawler API interface
CRAWLER_API="https://crawler_domain/site/crawl_async"

# Crawler interface verification key
CRAWLER_API_KEY="xxxx"

# Custom interface verification key
CRON_AUTH_KEY="keyxxxx"

# Submit API verification key
SUBMIT_AUTH_KEY="xxxx"

```

#### （4）在开发模式下运行

切换到特定的node版本

```sh
nvm use
```

安装依赖包

```sh
pnpm i
```

在开发模式下运行

```sh
pnpm dev
```

## 如何更新AI工具生成内容？

### 手动修改数据库

- 修改Supabase中的web_navigation数据表的数据，请注意markdown的格式

### 如果爬虫加载失败如何处理

- 由于不同站点反爬虫机制的兼容性原因，目前爬虫可能出现加载失败的情况，此类问题目前需要手动去查询数据库submit表，然后手动
  去创建网站相关的内容，插入到web_navigation数据表中

### 如何获得初始化需要的AI工具列表？

可以通过Tools AI Free开源的来自其他导航站的13000+个AI工具列表导入(支持sql和csv)：
[AI Source List](https://github.com/ikey123/freeaitools/blob/main/ai_source_list)

## 打算在 Toolsaifree.com 上提交您的网站？

请打开：[Tools AI Free](https://toolsaifree.com/submit)

## 联系我们

- 在这里打开一个问题：[Tools-AI-Free-Directory](https://github.com/ikey123/Tools-AI-Free-Directory/issues)
- 给我们发邮件：[panleipanlei.qq@gmail.com](mailto:panleipanlei.qq@gmail.com)


