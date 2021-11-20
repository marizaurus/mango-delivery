<template>
  <div class="category-card"
     :style="{ backgroundImage: `url(${ categoryData.image })` }">
    <div class="category-card__title">{{ categoryData.name }}</div>
    <div class="category-card__description">{{ categoryData.description }}</div>
  </div>
</template>

<script>
export default {
  name: "v-category-card",
  props: {
    categoryData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
  .category-card {
    border-radius: 5px;
    background-size: cover;
    position: relative;
    flex-basis: 25%;
    height: 150px;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 4rem;
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 5px;
      opacity: 0;
      transition: .2s linear;
      background-color: rgba($white, 0.9);
    }

    &__title {
      font-size: 3.6rem;
      font-weight: 800;
      text-transform: uppercase;
      color: rgba($white, 0.9);
      opacity: 1;
      transition: .2s linear;
    }

    &__description {
      width: 100%;
      padding: 0 14px;
      box-sizing: border-box;
      color: $grey;
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