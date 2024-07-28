<template>
  <ul class="grid gap-3 auto-resize grid-cols-min-200">
    <li
      v-for="(item, index) in 10"
      class="flex flex-col relative gap-y-2 hover:cursor-pointer"
      :key="index">
      <USkeleton class="aspect-9-10 rounded-md"></USkeleton>
      <USkeleton class="w-full h-4"></USkeleton>
      <USkeleton class="w-full h-2"></USkeleton>
      <USkeleton class="w-full h-2"></USkeleton>
    </li>
  </ul>
</template>
