<template>
  <div
      class="v-tag"
      :class="[ ('bg-' + tagData.color) ]"
  >{{ tagData.title }}</div>
</template>

<script>
  export default {
    name: "v-tag",
    props: {
      tagData: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss">
  .v-tag {
    user-select: none;
    white-space: nowrap;
    border-radius: $radius-small;
    color: $white;
    font-size: 1.2rem;
    font-weight: 500;
    padding: .2rem .6rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
</style>