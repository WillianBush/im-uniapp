import store from "../store";
import Vue from 'vue'
import en from '@/i18n/en.json'
import VueI18n from 'vue-i18n'
import {activeConfig} from "@/common/appConfig";
import zh from '@/i18n/zh.json'
import {configLive1} from "../common/appConfig";
Vue.use(VueI18n)
store.commit("setLang",activeConfig.language);
const i18n = new VueI18n({
	locale: store.state.lang,
	messages: {
		'en-US': en,
		'zh-CN': zh
	}
})

export default i18n;
