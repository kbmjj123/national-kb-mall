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
1. 官方ui库(@nuxt/ui)，便于快速开发并管理，并自动安装`@nuxtjs/tailwindcss`、`@nuxtjs/color-mode`、`nuxt-icon`模块，**如果已经安装的话，需要手动将已提及到的模块进行移除操作**，而且，关于这个`tailwindcss`，也预先安装了对应的插件: `@tailwindcss/forms`、`@tailwindcss/typography`、`@tailwindcss/aspect-ratio`、`@tailwindcss/container-queries`、`@headlessui/tailwindcss`几大插件，，官网：[https://ui.nuxt.com/](https://ui.nuxt.com/);
2. seo(@nuxt/seo)，统一接管项目的seo的相关模块，包括有：`robots`、`sitemap`、`og image`、`schema.ort`、`seo experiments`、`link checker`；
3. pinia(@pinia-plugin-persistedstate/nuxt)，使app像spa开发维护pinia一样简单，官网：[https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html](https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html)；
4. pwa(@vite-pwa/nuxt)，0配置生成项目的pwa配置，官网：[https://vite-pwa-org.netlify.app/frameworks/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt)；
5. vueuse(@vueuse/nuxt)，vue社区提供的三方组合式工具API，官网：[https://vueuse.org/](https://vueuse.org/)
6. 

## 三方插件
1. @nuxt/devtools:
> `nuxt`专属的调试开发工具，官网：[https://devtools.nuxt.com/](https://devtools.nuxt.com/)
> 运行成功后，点击页面底部按钮，即可进入`devtools`的可视化界面，如下图所示：
![nuxt_devtools的可视化界面](./assets/images/nuxt_devtools的可视化界面.png)
> 接着，需要同意这个`devtools`的权限申请：
![nuxt_dev-tools授权申请.png](./assets/images/nuxt_dev-tools授权申请.png)
> 发起申请后，将会在我们的启动终端中看到这个发起授权申请，如下图所示：
![终端接收到来自浏览器的授权申请](./assets/images/终端接收到来自浏览器的授权申请.png)
> 下面将对这个`devtools`工作台每个模块功能进行一一说明，如下图所示：
![nuxt-dev-tools可视化界面的相关模块说明](./assets/images/nuxt-dev-tools可视化界面的相关模块说明.png)

:point_right: 更多相关的此库的介绍，具体可见[官网描述](https://devtools.nuxt.com/guide/features)

:star2: 当我们的页面/组件比较多的时候，我们可以借助于这个`devtools`所提供的`component`模块，切换到对应的视图，可看到当前项目各页面对各个组件的使用/引用情况，如下图所示：
![devtools中查看使用的组件.png](./assets/images/devtools中查看使用的组件.png)

:star2: 由于在项目中即成了`icones`了，因此可通过这个`devtools`的可视化界面入口，切换到对应的视图，并在该视图下进行相关图标的查找工作：
![devtools中浏览icones图标](./assets/images/devtools中浏览icones图标.png)

2. @nuxt/tailwindcss: 通过对`tailwindcss`的集成，可在项目中方便的使用class来直接作用于样式，且结合[vscode的tailwindcss插件](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)，来实现在项目中快速查看类对应的样式，另外，需要在`.vscode/settings.json`文件中配置以下的配置，使其支持语法高亮以及自动提示
```json
{
	"tailwindCSS.experimental.classRegex": ["tw`(.*?)`", "tw\\('(.*?)'\\)", "tw\\(\\s*('(.*?)'|\"(.*?)\")\\s*\\)"],
	"files.associations": {
      "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
      "strings": true
  }
}
```
通过上述这样子的配置之后，我们就可以在vue代码中采用 :point_down: 的方式来使用到`tailwindcss`的定义的变量了
```vue
<script setup lang="ts">
	const variantClasses = {
		primary: tw`bg-red-400`,
		second: tw('bg-green-400')
	}
</script>
```


## 项目过程文档记录
> 本章节将记录在进行整体项目开发调试过程中所遇到的相关问题，并进行发散性思维，联想相关的知识，并记录下来

### Nuxt相关知识补充

#### Nuxt3中的runtime配置
> 在项目的开发过程中，很经常地需要针对应用程序进行运行时配置，通过运行不同的命令来实现加载不同的环境，请求不同的接口服务的方式，而在`Nuxt`中，则是通过在统一的Nuxt配置文件`nuxt.config.ts`中新增一个属性`runtimeConfig`
```typescript
	// nuxt.config.ts
	export default defineNuxtConfig({
		runtimeConfig: {
			// 下述的这个配置是Nuxt3默认自带的配置
			public: {},
			app: {
				buildId: '',
				baseURL: '/',
				buildAssetsDir: '/_nuxt/',
				cdnURL: ''
			},
			nitro: {
				envPreFix: 'NUXT_'
			},
			// 以下是自己的自定义配置
			apiSecret: '123',	// 这个apiSecret只能在服务端渲染时访问到
			public: {
				// 在public中
				apiBase: '/api'
			}
		}
	})
```
:star2: 从上述的配置我们可以看出客户端渲染与服务端渲染所能够访问到的变量是有所区别的，定义在`runtimeConfig`节点下的变量，能够被服务端所访问到，而且所访问到的都是只读属性的变量，客户端访问不到这个`runtimeConfig`根节点下的变量，只能在根节点下加入一个`public`，在这个`public`节点下的变量都能够被访问到，而且客户端所访问到的变量还可以修改，甚至是响应式的变量

> 当我们结合.env文件来控制加载不同的环境变量的时候，有两点需要注意的
> 1. 在runtimeConfig中定义的变量名称必须以首字母小写并驼峰式的命名方式，而在.env文件中定义的变量则是以`NUXT_`开头，大写字母命名，单词之间用_分割；
> 2. 在.env文件中定义的变量，**必须在这个runtimeConfig节点中存在，以免程序运行时加载不到对应的变量**
```shell
	NUXT_API_SECRET=123
	NUXT_PUBLIC_API_BASE=/api
```

:star2: 当我们在程序中使用不同的文件命名来加载配置的话(比如.env、.env.production、.env.development)，需要在运行的脚本中通过命令来指定将使用哪个环境下的运行时配置！ :point_right: 这个过程就是将环境配置文件中的变量怼到`process.env`对象中！
```shell
nuxt dev --dotenv .env.development
```

:star2: 这个配置文件，在`<template></template>`以及`<script></script>`中，对于配置的访问方式也有所不同，在`<template></template>`中可通过`$config`访问到，而在`<script></script>`中则通过使用组合式api`useRuntimeConfig()`来获取到配置对象！

:warning: 有一个需要注意的是，当我们在生产环境中部署的时候，由于通过打包命令`nuxt build`输出的内容将会是`.output/server/index.mjs`入口文件，这个时候我们是通过执行`node .output/server/index.mjs`的方式来启动服务的， :point_right: 而我们晓得这个命令的执行，它是不会去加载这个配置的，因此，需要通过在命令中告知`node`程序，去加载对应的`.env`环境变量配置！
这个时候，就需要使用追加命令参数的方式，如下所示命令来启动服务
```shell
API_URL=https://api.example.com NODE_ENV=production node .output/server/index.mjs
```
:trollface: 或者是通过自定义一个脚本文件来执行，通过shell命令来执行这个脚本
```shell
	export API_URL=https://api.example.com
	export NODE_ENV=production
	node .output/server/index.mjs
```

:100: 或者如果是在`pm2`中运行的话，则借助于下方的脚本(`ecosystem.config.js`)
```js
module.exports = {
	apps: [
		{
			name: 'nuxt-app',
			script: '.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        API_URL: 'https://api.example.com'
      }
		}
	]
}
```
:point_right: 然后再通过`pm2 start ecosystem.config.js`来启动应用！

:thinking: **思考这样子一个问题：我们在不同环境中的环境变量的配置也有可能部分属性是一样的，那么针对这种情况，应该怎样来维护比较好呢？**
:point_right: 考虑将将脚本与环境变量配置结合起来，将公共的部分给抽取到一个类似名为`.env.common`的文件中，然后再分别新增`.env.development`以及`.env.production`，然后自定义一`node`脚本程序`loadEnv`，当运行脚本的程序的时候，根据运行的命令对应的环境，来将`.env.common`与对应环境的配置文件结合起来，合并结果值到统一的一个环境配置文件中(比如.env)
1. 新增自定义加载环境变量的脚本`loadEnv.mjs`
```javascript
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';

// 读取并合并两个配置文件中的信息
function loadEnv(env){
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)
	const basePath = path.resolve(__dirname)	// 获取当前路径
	const commonEnvPath = path.join(basePath, '.env.common')
	const envPath = path.join(basePath, `.env.${env}`)
	
	// 读取并解析配置文件
	const commonConfig = dotenv.parse(fs.readFileSync(commonEnvPath))
	const envConfig = dotenv.parse(fs.readFileSync(envPath))
	return {
		...commonConfig,
		...envConfig
	}
}

const env = process.env.NODE_ENV || 'development'
const config = loadEnv(env)
for(const key in config){
	process.env[key] = config[key]
}

export default config
```
2. 针对环境变量进行对应的读取动作
```typescript
// nuxt.config.ts
import envConfig from './loadEnv.mjs'
export defineNuxtConfig({
	runtimeConfig: {
    public: {
      baseUrl: envConfig['NUXT_PUBLIC_BASE_URL'],
			common: envConfig['NUXT_PUBLIC_COMMON']
    }
  }
})
```
3. 针对客户端可能会不小心修改到环境变量的值情况，新增typescript类型检测机制，并新增自定义的保护组件式函数`useSafeRuntimeConfig`
```typescript
export const useSafeRuntimeConfig = () => {
	const publicRuntimeConfig = useRuntimeConfig().public	// 获取原始的运行时配置
	return {
		publicConfig: Object.freeze(publicRuntimeConfig),
		runTimeConfig: Object.freeze(useRuntimeConfig())
	}
}
```
4. 使用方式
```vue
<script setup>
const { publicConfig } = useSafeRuntimeConfig()
console.info(publicConfig)
</script>
```

#### Nuxt中的appConfig配置
> 一般来说，一个APP应用，拥有其一些特性(比如站点名称，主题颜色，使用语言等等)，我们可以将这些属性定义到`~/app.config.ts`文件中，但是，对于`Nuxt`而言，定义在`app.config.ts`文件中的属性，都是可以被编辑的，而有些场景下，像站点名称这些是不可以被编辑的，那么 :thinking: 应该怎么做才能够更好的来使用呢？
> :star: 这边采用了自定义新的组合函数来包装`useAppConfig()`的方式，并通过`typescript`的类型检测机制，对原本没有任何类型说明的属性进行了类型定义与说明，实现过程如下所示:

1. 在`app.config.ts`中首先定义app应用的相关特性
```typescript
// app.config.ts
export default defineAppConfig({
	// 应用相关
	appName: 'KB商城',
	// 主题相关
	primaryColor: '#de3428',
	// 使用语言相关
	defaultLanguage: 'zh_cn'
	
})
```
2. 创建自定义组合式api来包装`useAppConfig`
```typescript
// composables/useSafeAppConfig.ts
export interface AppConfig{
	readonly appName: string,
	primaryColor: string,
	defaultLanguage: string
}
const appConfig = useAppConfig() as AppConfig
// 对外暴露app的自定义属性，且不能直接修改，需要修改的话，则通过这个函数返回的changXXX方法来进行修改
export const useSafeAppConfig = () => {
	const frozenConfig = Object.freeze(appConfig)	// 不可直接修改的app配置对象
	const changeTheme = (color: string) => {
		appConfig.primaryColor = color
	}
	const changeLanguage = (lang: string) => {
		appConfig.defaultLanguage = lang
	}
	return {
		config: frozenConfig,
		changeTheme,
		changeLanguage
	}
}
```
3. 配置类型检测
```typescript
// types/index.d.ts
declare module 'nuxt/schema' {
	// 在类型中声明自定义的appConfig属性
	interface AppConfigInput {
		readonly appName: string,
		primaryColor: string,
		defaultLanguage: string
	}
}
```
4. 使用以及效果
![自定义appConfig拥有了类型检测的加持.png](./assets/images/自定义appConfig拥有了类型检测的加持.png)

#### nuxt.config.ts中的app节点配置
> 在`nuxt.config.ts`存在那么的一个属性`app`，主要用于"静态化"地设置当前webapp应用的配置信息，改属性主要有以下那么一些成员属性
| 属性 | 描述 | 默认值 |
|---|---|---|
| baseURL | 站点的根路径 | '/' |
| buildAssetsDir | 已生成站点资源的文件夹名称 | '/_nuxt/' |
| cdnURL | 用于提供公共文件夹的绝对URL（仅限生产） | '' |
| head | 用于设置所有页面的head节点 | `见下方关于head的定义` |
| keepalive | 页面之间keepalive配置的默认值，可由页面中的`definePageMeta`覆盖 | false |
| layoutTransition | 布局间的动画，可由页面中的`definePageMeta`覆盖 | false |
| pageTransition | 页面间的动画，可由页面中的`definePageMeta`覆盖 | false |
| rootAttrs | 自定义根节点的属性 | `{"id": "__nuxt"}` |
| rootId | 根节点id | "__nuxt" |
| rootTag | 根节点名称 | `div` |
| teleportAttrs |  |  |
| teleportId |  |  |
| teleportTag |  |  |
| viewTransition |  |  |

##### 关于head的定义
```json
{
  "meta": [
    {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    },
    {
      "charset": "utf-8"
    }
  ],
  "link": [],
  "style": [],
  "script": [],
  "noscript": []
}
```

##### 关于静态化head设置、动态化全局设置、具体页面单独设置的区别
> :point_up_2: 我们发现可以在`nuxt.config.ts`中定义`app.head`节点来静态化设置所有页面的head标签，但是在实际的情况下，则会出现全局的动态化设置、或者是具体到某个页面来设置，因此，`Nuxt3`提供了`useHead()`以及`useSafeHead()`
> 而这个`useHead()`函数参数成员的签名如下：
```typescript
useHead(meta: MaybeComputedRef<MetaObject>): void
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[]
  htmlAttrs?: HtmlAttributes
  bodyAttrs?: BodyAttributes
}
```
关于各个字段属性如何传参，具体见[官网](https://github.com/unjs/unhead/blob/main/packages/schema/src/schema.ts)

:point_right: `useHead`是一个组合式API，一般在`*.vue`文件中使用

### 踩坑之路
> 记录在项目过程中所踩的坑
#### 升级了版本之后发现sharp不兼容
> 打开一个比较久的项目，升级相关的库版本信息，发现`sharp`不兼容（一个将常见格式的大图像转换为较小的、web友好的不同格式的图片）， :point_right: 但是要求这个node的版本必须大于18.17.0，因此需要对应升级一下！


### 最佳实践

#### 是否可以动态化defineNuxtConfg来配置
> 在`Nuxt3`中，可以通过`defineNuxtConfig`函数来配置对象的基础配置，那么 :thinking: 传递的对象能否由一个函数返回，从而来实现动态化配置的目的？
> 这种方式不可以 :no_good_man: 的，因为`Nuxt3`的配置文件设计的初衷就是想通过静态化的配置来生成app的配置
> :point_right: 但是，我们还是可以通过一个**结果对象(可以结合环境变量等方式来生成的一个对象)**，传递给`defineNuxtConfig`函数，提前生成一个运行好的结果配置对象传递给它，实现设想中的动态化配置的目的！
```typescript
	const settting = {}
	export default defineNuxtConfig(setting)
```

#### 可对照开发的tailwindcss配置
> 在运行项目的时候，当我们不清楚这个`tailwindcss`的相关类时，可借助于本地运行的一个服务(访问地址：http://localhost:3000/_tailwind/)，即可在当前的环境中浏览相关的class所对应的样式以及样式值，因为在启动`Nuxt`的时候，会顺便启动这个服务，启动命令输出如下：
![开启tailwindcss服务.png](./assets/images/开启tailwindcss服务.png)
>而打开此路径对应的效果如下图所示：
![tailwindcss样式对照表.png](./assets/images/tailwindcss样式对照表.png)

## 思考总结
