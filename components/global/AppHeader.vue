<template>
  <header
    class="bg-white sticky top-0 flex justify-between items-center p-4 shadow-sm dark:shadow-black dark:bg-gray-900">
    <div class="flex items-center gap-4">
      <UButton icon="i-heroicons-bars-3-16-solid" color="gray" variant="ghost" aria-label="Theme"></UButton>
      <AppIcon></AppIcon>
    </div>

    <div class="flex items-center gap-3 text-lg">
      <ToggleLanguage></ToggleLanguage>
      <ToggleColor></ToggleColor>
      <UButton icon="i-heroicons-outline-magnifying-glass" color="gray" variant="ghost" aria-label="Theme"></UButton>
      <UButton icon="i-ph-shopping-cart-bold" color="gray" variant="ghost" aria-label="Theme"></UButton>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
