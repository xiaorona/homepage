Astro 主页

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
project-root/
├── public/            # 静态资源
│   └── images/        # 图片资源
├── src/
│   ├── components/    # 可复用组件
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/       # 页面布局模板
│   │   └── MainLayout.astro
│   └── pages/         # 路由页面
│       ├── index.astro  # 首页
│       ├── about.astro  # 关于我
│       └── contact.astro # 联系我
├── astro.config.mjs   # Astro配置
└── package.json       # 项目依赖
