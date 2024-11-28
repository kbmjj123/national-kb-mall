## 自定义组合式API
> 记录在项目过程中所自定义的辅助项目项目开发的自定义组合式API

1. useKbFetch.ts: 统一的网络请求封装器，主要用于发起网络请求以及统一的请求头、响应处理等一系列与网络交互有关的操作；
2. useLoading.ts: 统一的纯客户端发起的网络请求方法，自动管理loading、与现有的业务请求模块无缝结合；
3. useSafeAppConfig.ts: 安全使用的app配置方法；
4. useSafeRuntimeConfig.ts: 安全使用的运行时配置方法；
5. useTipModal.ts: 全局直接自定义modal的调用方法，对`nuxt-ui`的`modal`进行了一个二次封装
6. useImgLink.ts: 全局的图片拼接方法，用于加载自己的远程图片；
7. useTiModal.ts: 全局的可通过api调用的提示窗口，用于在非vue实例上下文调用病展示窗口的方法；
8. useLogin.ts: 全局的可通过api调用的登录窗口，用于一键快速唤起登录窗口，并在登录成功后，可通过配置的回调方法去执行对应的成功回调操作