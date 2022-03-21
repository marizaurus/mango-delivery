<template>
  <ul class="accordion">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'accordion',
  };
</script>

<style lang="scss">
  .accordion {
    list-style: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

    &__item:last-child {
      border-bottom: none;
    }
  }
</style>
