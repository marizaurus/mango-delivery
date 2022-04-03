<template>
  <div class="category-card">
    <div class="category-card__image" ref="image"
      :style="{ backgroundImage: `url(${ itemData.image })` }">
      <div class="category-card__title">{{ itemData.title }}</div>
      <div class="category-card__description">{{ itemData.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "category-card",
  props: {
    itemData: {
      title: String,
      description: String,
      image: String
    },
  },
  methods: {
    onLoad() {
      // placeholder workaround for background-image
      let img =  new Image();
      img.onload = () => this.$refs.image.classList.add('img-loaded');
      img.src = this.itemData.image;
    }
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style lang="scss">
  .category-card {
    border-radius: $radius-medium;
    background-image: url('~@/assets/images/placeholder-medium.png');
    background-size: cover;
    background-position: center;
    position: relative;
    width: 100%;
    max-width: 42rem;
    height: 15rem;
    overflow: hidden;
    cursor: pointer;

    &__image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0;
      transition: opacity .2s linear;

      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: .2s linear;
        background-color: $white;
      }

      &.img-loaded {
        opacity: 1;
      }
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

    &:hover .category-card__image.img-loaded {
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