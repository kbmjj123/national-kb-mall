<template>
  <ClientOnly>
    <div class="flex flex-row gap-3 items-center" v-if="finalShareList && finalShareList.length > 0">
      <!-- 公共的分享组件 -->
      <ShareNetwork
				v-for="(item, index) in finalShareList" :key="index"
        v-bind="item">
				<UIcon :name="networkIconMap[item.network]" class="uicon w-5 h-5"></UIcon>
      </ShareNetwork>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Props } from 'vue-social-sharing'
const props = defineProps<{
	shareList?: Array<Props>
}>()
// 获取可支持的分享渠道
const { availableSocialNetworks } = useSafeAppConfig().config
const finalShareList: ComputedRef<Array<Props>> = computed(() => {
	if(props.shareList && props.shareList.length > 0){
		return props.shareList
	}else{
		return availableSocialNetworks.map(item => ({
			network: item,
			title: '我是分享的标题',
			description: '我是分享的文本内容',
			url: 'https://www.91temaichang.com'
		}))
	}
})
//! 提供的社交平台图标映射
const networkIconMap: Record<string, string> = {
	email: 'i-ri-mail-line',
	evernote: 'i-ri-evernote-fill',
	facebook: 'i-ri-facebook-circle-fill',
	line: 'i-ri-line-line',
	linkedin: 'i-ri-linkedin-box-fill',
	messenger: 'i-ri-messenger-fill',
	pinterest: 'i-ri-pinterest-fill',
	reddit: 'i-ri-reddit-fill',
	skype: 'i-ri-skype-fill',
	sms: 'i-ri-message-3-fill',
	instagram: 'i-ri-instagram-fill',
	telegram: 'i-ri-telegram-fill',
	kakao: 'i-ri-kakao-talk-fill',
	medium: 'i-ri-medium-fill',
	tumblr: 'i-ri-tumblr-fill',
	twitter: 'i-ri-twitter-x-fill',
	vk: 'i-ri-vk-fill',
	weibo: 'i-ri-weibo-fill',
	whatsapp: 'i-ri-whatsapp-fill',
	wordpress: 'i-ri-wordpress-fill',
	xing: 'i-ri-xing-fill',
	wechat: 'i-ri-wechat-fill',
	qq: 'i-ri-qq-fill',
	zhihu: 'i-ri-zhihu-fill',
	dingding: 'i-ri-zhihu-fill',
	douban: 'i-ri-douban-fill'
}


</script>
