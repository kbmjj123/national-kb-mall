import zhCN from "./locates/zh-CN.json"
import en from "./locates/en.json"
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zhCN',
	fallbackLocale: 'en',
  messages: {
    'en': en,
    'zhCN': zhCN,
  }
}))
