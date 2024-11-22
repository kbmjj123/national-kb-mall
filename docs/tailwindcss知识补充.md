### tailwindcss知识补充
> 在自己之前的[一篇文章](https://www.91temaichang.com/2023/09/14/how-to-use-tailwindcss/index.html)中有简单介绍关于`tailwindcss`的使用，本章节将详细具体解析关于`tailwindcss`的工作过程，加深对`tailwindcss`的理解与使用！

#### tailwindcss过程分析

> 首先先看 :point_down: 的一张关于`tailwindcss`工作过程的流程图：
![tailwincss的工作过程](./assets/images/tailwincss的工作过程.png)
:point_down: 将对这个过程进行一一分析：
1. 配置tailwindcss.config.ts: `tailwind.config.ts`，这个是`tailwindcss`的配置文件，用于*定义基本配置、扩展的自定义配置和插件配置，可以在这个文件中定义颜色、间距、排版等自定义样式，以及设置哪些变体(如`hover`、`focus`)需要生成*，关于这个`tailwind.config.ts`的内容如下：
```typescript
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
	theme: {
		extend: {
			colors: {
				customBlue: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					// 其他颜色变体
				}
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ['hover', 'focus'],
			textColor: ['hover', 'focus'],
		}
	},
	plugins: []
}
```
上述的配置我们定义了自定义的颜色`customBlue`以及对应的变体，那么将会生成自定义的类型：`bg-customBlue-50`、`hover:text-customBlue-50`等样式；

2. 引用tailwindcss：在自定义css中引用`tailwindcss`的基础层、组件层以及使用工具层，该文件一般位于`assets/css/tailwind.css`，其内容如下：
```css
/* assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
:stars: 这里三者属于`tailwindcss`的核心元素，各自有如下的意义：
- **base**: 全局样式，通常包括重置和定义基础样式，比如`html`与`body`标签的默认样式；
- **components**: 组件样式，通常用于定义更复杂的UI组件，如按钮、卡片等；
- **utilities**: 实用工具类，用于设置像颜色、边距、排版等样式

3. 在上述的`assets/css/tailwind.css`文件中追加自定义的额外样式，用于作为基础的样式作为最终合成，其内容如下：
```css
/* assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
/* 以下是自定义的额外样式 */
@layer base{
	h1 {
		@apply text-2xl font-bold;
	}
}
```
:t-rex: 在上述的配置中，`@layer`指令用于指定在那个层次中定义，`@apply`则对这个标签/类定义赋予哪些属性，一般直接应用`tailwindcss`已有的使用工具类，减少重复的代码！

4. 生成`tailwind.css`结果样式表：`tailwind`的核心core将根据配置文件以及引用的层次来生成一个完整的`tailwind.css`样式文件，这个生成过程包括组合配置、扩展自定义配置以及合并在自定义css文件中引用的配置；
5. 使用生成的`tailwind.css`：在html中引用已生成的`tailwind.css`，使其生效
```html
<link href="/public/tailwind.css" rel="stylesheet">
```

6. PurgeCSS优化生产环境：在生产环境中，`tailwindcss`将使用`PurgeCSS`来移除未使用到的样式，从而减少最终生成的css文件大小

#### tailwindcss结合nuxt-ui使用思考
> 整理关于在使用`tailwindcss`过程中的最佳实践

##### 关于主题切换
> 官网关于主题切换，是通过在对应标签元素中的class中添加`dark:`前缀的方式，让目标元素支持夜间模式的样式， :thinking: 但是如果我们在目标元素上设置一个个的颜色相关的类也是不打现实，整体项目下来需要堆很多的样式，而且，如果在不同的标签中写错了样式，那么将会导致整体站点app风格不搭，那么是否有那么一种方式，可以帮助自己更好的来管理系统的日间以及夜间的样式，保持统一，且无需在具体的标签节点中一个个地进行配置呢？
> **应该依赖于全局样式以及`tailwindcss`提供的实用工具类，以便于更容易管理和切换不同模式下的样式！**，主要可采用以下的流程步骤来实现：
1. 在`tailwind.config.ts`中定义日间以及夜间模式的相关颜色
```typescript
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
	theme: {
		extend: {
			colors: {
				backgroud: {
					light: '#fff',
					dark: '#121212'
				},
				text: {
					light: '#000',
					dark: '#fff'
				},
				primary: {
					light: '#3b82f6',
					dark: '#60a5fa'
				}
			}
		}
	}
}
```
2. 在自定义的`tailwind.css`中使用对应的实用工具类以及`dark`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
	body{ 
		@apply bg-background-light text-text-light;
	}
	.dark body{
		@apply bg-background-dark text-text-dark;
	}
}
```

:trollface: 这样子之后，无需在具体的标签中设置对应的颜色，而是**使用全局样式和实用工具类，通过`tailwindcss`的配置文件和全局样式文件集中管理日间和夜间模式的颜色，然后最终使用`tailwindcss`提供的暗黑模式支持，一键切换**！！

##### 拆分`tailwind.css`为不同的模块
> 在使用`tailwindcss`的时候，关于自定义的`tailwind.css`，如果在项目过程中，有自定义不少额外的样式，对`base`、`components`、`utilities`三个层次都有自定义的样式，那么是否可以将这个`tailwind.css`拆分为多个不同的子css文件模块来引用呢？ :point_right: 答案是可以的，我们可以针对三个层次拆分为3个对应的样式文件，如下代码所示：
```css
/* base.css */
@tailwind base;
@layer base{
	h1 {
		@apply text-2xl font-bold;
	}
}
/* components.css */
@tailwind components;
@layer components {
	.btn {
		@apply px-4 py-2 bg-blue-500 text-white rounded;
	}
}
/* utilities.css */
@tailwind utilities;
@layer utilities {
	.text-shadow {
		text-shadow: 2px 2px #ff000;
	}
}
/* tailwind.css */
@import './base.css';
@import './components.css';
@import './utilities.css'
```

##### 结合nuxt-ui进行项目实战
> 在项目中，使用了`nuxt-ui`，主要借助于`app.config.ts`中自定义`ui`节点来实现全局站点样式管理的，根据[官方文档](https://ui.nuxt.com/getting-started/theming#configuration)的介绍，建议我们在搭建日间/夜间模式切换的时候，采用`tailwindcss`生成的`text-primary`、`bg-primary`、`text-primary-500`、`dark:text-primary-400`、`bg-gray-100`、`dark:bg-gray-900`等内置生成的工具类来定义站点的统一样式，能够保持当调整系统的`primary`以及`gray`的时候，站点也能够整体进行风格的改变！
```css
/* assets/css/tailwind.css */
@layer base {
	body{ 
		@apply bg-white text-gray-700;
	}
	.dark body{
		@apply dark:bg-gray-900 text-gray-200;
	}
}
```
:trollface: 这里目前采用的设置`light/dark`的统一默认风格！

##### tailwindcss扩展
> `tailwindcss`本身并没有内置的`minmax`类名，但是我们可以通过配置`tailwindo.config.ts`来添加自定义的`gridTemplateColumns`或者是`gridTemplateRows`规则来实现，如下代码所示：
```typescript
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
	extend: {
		gridTemplateColumns: {
				'min-100': 'repeat(auto-fit, minmax(100px, 1fr))',
				'min-150': 'repeat(auto-fit, minmax(150px, 1fr))',
				'min-180': 'repeat(auto-fit, minmax(180px, 1fr))',
				'min-200': 'repeat(auto-fit, minmax(200px, 1fr))',
				'min-250': 'repeat(auto-fit, minmax(250px, 1fr))',
				'min-300': 'repeat(auto-fit, minmax(300px, 1fr))',
			}
	}
}
```
:stars: 这里配置之后，我们将可以直接在代码中使用`grid-cols-*`比如(`grid-cols-min-100`)的方式来使用这个类！！

:star2: `tailwindcss`给我们提供了默认的配置，如果我们需要像上述对这个`tailwindcss`来扩展自己的类名的话，需要在这个默认[`tailwindcss`配置](https://tailwindcss.com/docs/theme#configuration-reference)，根据实际情况在对应的配置上来扩展自己的类名，当然，还可以通过编写对应的插件进行更加详细的控制！ :point_right: 这里还可以参考一下官方的完整的[默认配置](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js)

##### tailwindcss实现父节点hover，子节点触发效果
> 在没有`tailwindcss`参与的css样式交互控制中，我们可以通过往父节点添加`:hover{子节点样式定义}`的方式来控制当hover父节点的时候，子节点应当做如何展示的一个场景
> :point_right: 但是在`tailwindcss`中，官方则提供了一个`group-*`的机制，实现同样的目的，使用过程如下：
```html
	<div class="group">
		<span class="group-hover:text-2xl">我是孩子节点</span>
	</div>
```
:trollface: 通过上述的操作，可以实现当hover一个div的时候，让这个div下的span节点的字体大小变成`text-2xl`所对应的样式！
