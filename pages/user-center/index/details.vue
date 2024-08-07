<template>
  <div class="flex flex-col gap-6">
    <PersonalInformation></PersonalInformation>
    <Billing></Billing>
    <Shipping></Shipping>
    <Password></Password>
  </div>
</template>

<script setup lang="ts">
  import PersonalInformation from './components/_PersonalInformation.vue'
  import Billing from './components/_Billing.vue'
  import Shipping from './components/_Shipping.vue'
  import Password from './components/_Password.vue'
</script>
