<template>
  <div class="category-card"
     :style="{ backgroundImage: `url(${ itemData.image })` }">
    <div class="category-card__title">{{ itemData.title }}</div>
    <div class="category-card__description">{{ itemData.description }}</div>
  </div>
</template>

<script>
export default {
  name: "v-category-card",
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  methods: {}
}
</script>

<style lang="scss">
  .category-card {
    border-radius: $radius-medium;
    background-size: cover;
    position: relative;
    width: 100%;
    height: 15rem;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 4rem;
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border-radius: $radius-medium;
      opacity: 0;
      transition: .2s linear;
      background-color: $white;
    }

    &__title {
      font-size: 3.6rem;
      font-weight: 800;
      text-transform: uppercase;
      color: $white;
      opacity: 1;
      transition: .2s linear;
      user-select: none;
    }

    &__description {
      width: 100%;
      padding: 0 1.4rem;
      box-sizing: border-box;
      color: $grey-dark;
      opacity: 0;
      transition: .2s linear;
      z-index: 1;
    }

    &__title,
    &__description {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:hover {
      &::after,
      .category-card__description {
        opacity: 1;
      }
      .category-card__title {
        opacity: 0;
      }
    }
  }
</style>