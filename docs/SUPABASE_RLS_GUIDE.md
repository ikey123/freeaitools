# Supabase Row Level Security (RLS) 配置指南

## 1. RLS 概述

Row Level Security (RLS) 是 Supabase/PostgreSQL 的一个安全特性，用于控制用户对行级数据的访问。默认情况下，启用 RLS 后所有访问都会被拒绝，需要通过策略明确允许访问。

## 2. 基础配置

### 2.1 启用 RLS
```sql
-- 为所有主要表启用 RLS
alter table web_navigation enable row level security;
alter table navigation_category enable row level security;
alter table submit enable row level security;
```

### 2.2 基本角色说明
- `anon`: 匿名用户
- `authenticated`: 已认证用户
- `service_role`: 服务角色（具有最高权限）

## 3. 表策略配置

### 3.1 web_navigation 表（工具展示表）
```sql
-- 允许所有用户读取已发布的工具
create policy "Public read published tools"
  on web_navigation
  for select
  to anon
  using (true);  -- 如果需要状态控制：using (status = 'published')

-- 允许管理员完全访问
create policy "Admin full access web_navigation"
  on web_navigation
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');
```

### 3.2 navigation_category 表（分类表）
```sql
-- 允许所有用户读取分类
create policy "Public read categories"
  on navigation_category
  for select
  to anon
  using (true);

-- 允许管理员管理分类
create policy "Admin manage categories"
  on navigation_category
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');
```

### 3.3 submit 表（提交表）
```sql
-- 允许匿名用户提交
create policy "Public submit"
  on submit
  for insert
  to anon
  with check (true);

-- 允许管理员查看所有提交
create policy "Admin read submissions"
  on submit
  for select
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin');
```

## 4. 验证和测试

### 4.1 检查现有策略
```sql
-- 查看特定表的所有策略
select *
from pg_policies
where schemaname = 'public'
  and tablename = 'web_navigation';
```

### 4.2 测试数据访问
```typescript
// 在前端测试数据访问
const { data, error } = await supabase
  .from('web_navigation')
  .select('*');

if (error) {
  console.error('Access error:', error);
}
```

## 5. 故障排除

### 5.1 数据访问问题
如果数据突然不可见，请检查：

1. **确认 RLS 策略是否正确启用**
```sql
-- 检查特定表的 RLS 状态
select relname, relrowsecurity
from pg_class
where relname = 'web_navigation';
```

2. **验证角色权限**
```sql
-- 确保基本的选择权限
grant select on web_navigation to anon;
grant select on web_navigation to authenticated;
```

3. **临时禁用 RLS 进行测试（仅开发环境）**
```sql
alter table web_navigation disable row level security;
```

### 5.2 常见错误解决

1. **策略冲突**
```sql
-- 删除冲突的策略
drop policy if exists "policy_name" on table_name;
```

2. **权限不足**
```sql
-- 授予必要的权限
grant usage on schema public to anon;
grant usage on schema public to authenticated;
```

## 6. 最佳实践

1. **始终使用最小权限原则**
   - 仅授予必要的权限
   - 使用具体的条件而不是 `true`

2. **正确使用角色**
   - `anon` 用于公共访问
   - `authenticated` 用于登录用户
   - `service_role` 仅用于后端服务

3. **定期审查策略**
   - 检查是否有不必要的策略
   - 验证策略是否按预期工作

## 7. 安全注意事项

1. **避免在策略中暴露敏感信息**
2. **使用参数化查询而不是字符串拼接**
3. **定期审计访问日志**
4. **为生产环境使用更严格的策略**

## 8. 更新记录

- 2024-01-25: 初始文档创建
- [后续更新记录...]
```

## 9. 相关资源

- [Supabase RLS 官方文档](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS 文档](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) 