<template>
  <ul
    class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
    <li
      v-for="(item, index) in platformDescListRef"
      :key="index"
      class="flex flex-row items-center gap-x-2 shadow-sm rounded-xl p-3 gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:shadow-black">
      <img src="" class="w-7" />
      <div class="flex-1 flex flex-col gap-y-1">
        <p class="font-bold">{{ item.title }}</p>
        <p>{{ item.desc }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  const { t, locale } = useI18n()
  const { config } = useSafeAppConfig()

  const { platformDescList } = config

  const platformDescListRef = ref()

  const updateTranslatedLinks = () => {
    platformDescListRef.value = reactive(platformDescList).map((item) => ({
      title: t('index.platformDesc.' + item.titleKey),
      desc: t('index.platformDesc.' + item.descKey),
      // icon: () => import(`~/assets/icons/${item.icon}`),
    }))
  }
  watch(locale, () => {
    updateTranslatedLinks()
  })

  onMounted(() => {
    updateTranslatedLinks()
  })
</script>
