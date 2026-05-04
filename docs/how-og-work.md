● OG 生成和 OG 图片的实现         

  这个项目使用 Satori + resvg-js 在构建时动态生成 OG 图片，整体流程如下：                                                                                                                                                                                              
  核心依赖                                                                                                                                                                                                                                                                            
  ┌─────────────────┬────────────────────────────────────┐
  │       包        │                作用                │
  ├─────────────────┼────────────────────────────────────┤
  │ satori          │ 将 JSX 虚拟 DOM 渲染为 SVG         │
  ├─────────────────┼────────────────────────────────────┤
  │ @resvg/resvg-js │ 将 SVG 渲染为 PNG（Node 原生插件） │
  ├─────────────────┼────────────────────────────────────┤
  │ sharp           │ 通用图片处理                       │
  └─────────────────┴────────────────────────────────────┘

  配置开关

  在 src/config.ts 中：

  ogImage: "astropaper-og.jpg",   // 静态后备图片
  dynamicOgImage: true,            // 是否开启动态 OG 生成

  数据流

  博客文章（没有设置 ogImage frontmatter）
    → SITE.dynamicOgImage === true?
      → getStaticPaths() 筛选出没有 ogImage 的文章
        → GET /{locale}/posts/{slug}/index.png.ts
          → generateOgImageForPost()
            → post.js 模板用 satori() 生成 SVG
              → loadGoogleFonts() 加载对应语言的 Google Font
            → svgBufferToPngBuffer() 用 @resvg/resvg-js 转 PNG
          → 返回 image/png
            → PostDetails.astro 构建 URL → 传给 Layout.astro
              → <meta property="og:image" content="..." />

  关键文件

  ┌────────────────────────────────────────────────────┬─────────────────────────────────────┐
  │                        文件                        │                职责                 │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/utils/og-templates/post.js                     │ 文章 OG 图片的 SVG 模板（1200×630） │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/utils/og-templates/site.js                     │ 站点 OG 图片的 SVG 模板             │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/utils/generateOgImages.ts                      │ SVG→PNG 转换桥接                    │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/utils/loadGoogleFont.ts                        │ 按需加载 Google Font 供 Satori 使用 │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/pages/[...locale]/posts/[...slug]/index.png.ts │ 文章级 OG 图片端点                  │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/pages/[...locale]/og.png.ts                    │ 站点级 OG 图片端点                  │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/layouts/PostDetails.astro                      │ OG 图片优先级/回退链                │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ src/layouts/Layout.astro                           │ 设置 OG/Twitter meta 标签           │
  ├────────────────────────────────────────────────────┼─────────────────────────────────────┤
  │ public/astropaper-og.jpg                           │ 静态后备图片                        │
  └────────────────────────────────────────────────────┴─────────────────────────────────────┘

  OG 图片优先级（在 PostDetails.astro 中）

  1. Frontmatter 中的远程 URL（ogImage: "https://..."）
  2. Frontmatter 中的本地图片（ogImage: ./image.png）
  3. 动态生成的 OG 图片（当 dynamicOgImage: true 且上面都没设置时）
  4. 站点级 og.png.ts 或静态 astropaper-og.jpg 作为最终后备

  模板设计

  两张 OG 图片模板（post 和 site）都采用相同的视觉风格：嵌套的双层边框 + 偏移阴影效果，背景色 #fefbfb，边框黑色。文章模板展示标题 + 底部栏（作者和站点名），站点模板展示站点标题 + 描述 + 域名。支持 RTL（从右到左）语言。

  字体加载

  loadGoogleFont.ts 会带上 text= 参数请求 Google Fonts API，只下载 OG 图片中实际用到的字符，减少体积。不同语言使用不同的字体（中文用 Noto Sans SC，英文用 IBM Plex Mono），配置在 src/i18n/config.ts 中。