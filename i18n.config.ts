import zhCN from "./locates/zh-CN.json"
import en from "./locates/en.json"
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zhCN',
  messages: {
    'en': en,
    'zhCN': zhCN,
  }
}))
