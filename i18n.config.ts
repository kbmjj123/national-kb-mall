import zhCN from "./locates/zh-CN.json"
import en from "./locates/en.json"
import zhTW from './locates/zh-TW.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zhCN',
	fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh-CN': zhCN,
		'zh-TW': zhTW
  }
}))
