# KB商城国际版
> 主要提供普通商家自己的商品线上销售的直营电商前端系统，采用`Nuxt3.0` + `vue3.0`全家桶进行的项目！

## 项目启动
1. 安装相关的依赖: `pnpm install`
2. 运行项目: `pnpm run dev`

## 项目目录结构
```
national-kb-mall
├─ LICENSE
├─ README.md
├─ api
├─ app.vue
├─ assets
│  ├─ css
│  │  └─ tailwind.css
│  ├─ icons
│  └─ images
├─ components
│  ├─ CopyRight.vue
│  ├─ Navigator.vue
│  ├─ README.md
│  ├─ global
│  └─ icons
│     ├─ 403.vue
│     ├─ 500.vue
│     ├─ C404.vue
│     ├─ Empty.vue
│     └─ Loading.vue
├─ composables
│  └─ useKbFetch.ts
├─ config
│  ├─ app.ts
│  └─ pwa.ts
├─ directives
├─ i18n.config.ts
├─ locates
│  ├─ en.json
│  └─ zh-CN.json
├─ middleware
│  └─ auth.global.ts
├─ nuxt.config.ts
├─ package.json
├─ pages
│  ├─ 404
│  │  └─ index.vue
│  ├─ 500
│  │  └─ index.vue
│  └─ index
│     └─ index.vue
├─ plugins
├─ public
│  └─ favicon.ico
├─ server
│  └─ tsconfig.json
├─ store
├─ tailwind.config.ts
├─ tsconfig.json
└─ utils
```
## 项目所使用的库
1. 官方ui库(@nuxt/ui)，便于快速开发并管理，官网：[https://ui.nuxt.com/](https://ui.nuxt.com/);
2. seo(@nuxt/seo)，统一接管项目的seo的相关模块，包括有：；
3. pinia(@pinia-plugin-persistedstate/nuxt)，使app像spa开发维护pinia一样简单，官网：[https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html](https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html)；
4. pwa(@vite-pwa/nuxt)，0配置生成项目的pwa配置，官网：[https://vite-pwa-org.netlify.app/frameworks/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt)；
5. vueuse(@vueuse/nuxt)，vue社区提供的三方组合式工具API，官网：[https://vueuse.org/](https://vueuse.org/)
6. 

## 项目过程文档记录
> 本章节将记录在进行整体项目开发调试过程中所遇到的相关问题，并进行发散性思维，联想相关的知识，并记录下来

### Nuxt相关知识补充

### 踩坑之路
> 记录在项目过程中所踩的坑
#### 升级了版本之后发现sharp不兼容
> 打开一个比较久的项目，升级相关的库版本信息，发现`sharp`不兼容（一个将常见格式的大图像转换为较小的、web友好的不同格式的图片）， :point_right: 但是要求这个node的版本必须大于18.17.0，因此需要对应升级一下！


### 最佳实践

## 思考总结
