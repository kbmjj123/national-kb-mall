<template>
  <ClientOnly>
    <div class="container flex flex-col gap-4 mt-4 md:flex-row lg:gap-10">
      <section class="flex flex-col gap-8 flex-1">
        <ContactInfo></ContactInfo>
        <Billing></Billing>
        <SelectShipping></SelectShipping>
        <SelectPayMethod></SelectPayMethod>
      </section>
      <OrderSummary></OrderSummary>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import ContactInfo from './components/_ContactInfo.vue'
  import OrderSummary from './components/_OrderSummary.vue'
  import Billing from '~/pages/user-center/index/components/_Billing.vue'
  import SelectShipping from './components/_SelectShipping.vue'
  import SelectPayMethod from './components/_SelectPayMethod.vue'
</script>
