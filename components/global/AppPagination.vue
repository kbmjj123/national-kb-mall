<template>
  <UPagination
    v-bind="paginationProps"
    @click="handleClick"
    @update:modelValue="updatePage"
  />
</template>

<script>
import {UPagination} from '#ui/components/navigation/Pagination.vue'; // 导入原始组件

export default {
  components: {
    UPagination
  },
  props: {
    // 传递所有原始组件的props
    ...Pagination.props
  },
  methods: {
    updatePage(page) {
      this.$emit('update:modelValue', page);
    },
    handleClick(event) {
      const target = event.target;
      if (target.getAttribute('aria-label') === 'Prev') {
        this.$emit('prev');
        if (this.paginationProps.onPrev) {
          this.paginationProps.onPrev();
        }
      } else if (target.getAttribute('aria-label') === 'Next') {
        this.$emit('next');
        if (this.paginationProps.onNext) {
          this.paginationProps.onNext();
        }
      }
    }
  },
  computed: {
    paginationProps() {
      return {
        ...this.$props
      };
    }
  }
};
</script>
