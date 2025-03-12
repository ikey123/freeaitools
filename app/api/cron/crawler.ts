/* eslint-disable no-template-curly-in-string */

// 爬虫请求参数接口定义
type CrawlerRequest = {
  url: string; // 待爬取的网站URL
  tags: string[]; // 可用的分类标签列表
  callback_url: string; // 爬虫完成后的回调地址
  key: string; // 验证密钥
};

// 爬虫响应数据接口定义
type CrawlerResponse = {
  code: number; // 响应状态码
  msg: string; // 响应消息
};

// 已注释的数据结构，用于参考爬虫返回的完整数据格式
// type CrawlerData = {
//   description: string;    // 网站描述
//   detail: string;        // 详细信息
//   languages: string[];   // 支持的语言
//   name: string;         // 网站名称
//   screenshot_data: string;    // 网站截图
//   screenshot_thumbnail_data: string;  // 缩略图
//   tags: string[] | null;     // 分类标签
//   title: string;        // 网站标题
//   url: string;         // 网站URL
// };

// 主要功能：调用外部爬虫服务的函数
// 参数说明：
// - url: 要爬取的网站地址
// - tags: 可用的分类标签
// - callback_url: 爬虫完成后的回调地址
// - key: 用于验证的密钥
export default async function crawler({ url, tags, callback_url, key }: CrawlerRequest) {
  const crawlerKey = process.env.CRAWLER_API_KEY;
  // 调用外部爬虫API
  const res = await fetch(process.env.CRAWLER_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${crawlerKey}`,
    },
    body: JSON.stringify({
      url,
      tags,
      callback_url,
      key,
    }),
  });
  return (await res.json()) as CrawlerResponse;
}
