<template>
  <header
    class="bg-white sticky top-0 flex justify-between items-center p-4 shadow-md dark:shadow-black dark:bg-slate-950">
    <div class="flex items-center gap-4">
      <UIcon name="i-heroicons-bars-3-16-solid" class="uicon text-lg"></UIcon>
      <AppIcon></AppIcon>
    </div>

    <div class="flex items-center gap-3 text-lg">
      <ToggleLanguage></ToggleLanguage>
      <ToggleColor></ToggleColor>
      <UIcon name="i-heroicons-outline-magnifying-glass" class="uicon"></UIcon>
      <UIcon name="i-ph-shopping-cart-bold" class="uicon"></UIcon>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
