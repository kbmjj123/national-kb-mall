import VueSocialSharing from "vue-social-sharing";
// 自定义创建，用于Nuxt3中直接使用`vue-social-sharing`库的配置
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VueSocialSharing, {
		fakeblock: 'https://fakeblock.com/share?url=@url&title=@title'
	})
})