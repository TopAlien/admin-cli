import { createI18n  } from "vue-i18n";
import zhCN from './zh-CN.json'
import en from './en.json'

export const i18n = createI18n({
  legacy: false, // componsition API需要设置为false 
  locale: 'en',
  globalInjection: true, // 可以在template模板中使用$t
  messages: {
    en,
    zhCN
  }
})