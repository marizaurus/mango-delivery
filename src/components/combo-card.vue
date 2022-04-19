<template>
  <div class="combo-card category-card">
    <div class="category-card__image" ref="image"
      :style="{ backgroundImage: `url(${ itemData.comboImage })` }">
      <div class="combo-card__info">
        <div class="combo-card__info-title category-card__title">{{ itemData.title }}</div>
      </div>
      <div class="combo-card__content">
        <div class="combo-card__content-description category-card__description">{{ itemData.description }}</div>
        <div class="combo-card__content-items combo-block__info-items">
          <div class="combo-block__info-item" v-for="(item, i) in itemData.items" :key="i">{{ item.title }}</div>
        </div>
        <div class="combo-card__content-prices row">
          <h2 class="combo-card__content-price m-none t-orange-light">{{ itemData.newPrice }} ₽</h2>
          <h2 class="combo-card__content-price product__info-price product__info-price-old m-none">{{ itemData.price }} ₽</h2>
        </div>
        <button class="btn btn-primary btn-orange-light m-none m-auto">
          <span>{{ $t('buttons.toCart') }}</span>
          <font-awesome-icon icon="basket-shopping"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "combo-card",
    props: {
      itemData: {
        title: String,
        description: String,
        newPrice: Number,
        price: Number,
        items: Array,
        comboImage: String
      },
    },
    methods: {
      onLoad() {
        let img =  new Image();
        img.onload = () => this.$refs.image.classList.add('img-loaded');
        img.src = this.itemData.comboImage;
      }
    },
    mounted() {
      this.onLoad();
    }
  }
</script>

<style lang="scss">
  .combo-card {
    background-image: url('~@/assets/images/placeholder-big.png');
    max-width: 25rem;
    height: 29rem;
    cursor: unset;

    &__info,
    &__content {
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      transition: .2s linear;
      position: absolute;
    }

    &__info {
      opacity: 1;
      text-align: center;
      width: 100%;
      padding: 0 .4rem;
      box-sizing: border-box;

      &-title {
        font-size: 2.8rem;
        position: unset;
        transform: unset;
        margin-bottom: 2rem;
      }
    }

    &__content {
      opacity: 0;
      z-index: 1;
      padding: 0 1.4rem;
      width: 100%;
      box-sizing: border-box;

      &-description {
        position: unset;
        transform: unset;
        z-index: 2;
        padding: 0;
        font-size: 1.4rem;
      }

      &-description,
      &-prices {
        margin-bottom: 1.6rem;
      }

      &-items.combo-card__content-items {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      &-prices.row {
        align-items: baseline;
      }
    }

    &:hover .category-card__image {
      &::after,
      .combo-card__content {
        opacity: 1;
      }
      .combo-card__info {
        opacity: 0;
      }
    }
  }
</style>