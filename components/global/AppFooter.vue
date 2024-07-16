<template>
	<footer>
		<ul class="sm:columns-4">
			<li v-for="(item, index) in footLinks" :key="index">
				<div class="font-bold text-lg">{{ item.title }}</div>
				<ul v-for="(cItem, cIndex) in item.links" :key="index + '-' +cIndex">
					<NuxtLink :to="cItem.link">{{ cItem.title }}</NuxtLink>
				</ul>
			</li>
		</ul>
	</footer>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const { config } = useSafeAppConfig()

const footLinks = ref([])

const updateTranslatedLinks = () => {
	footLinks.value = markRaw(config.footerLinks).map(item => ({
		...item,
		title: t('footer.' + item.titleKey + '.title'),
		links: item.links.map(cItem => ({
			...cItem,
			title: t('footer.' + item.titleKey + '.' + cItem.key)
		}))
	}))
}


</script>
