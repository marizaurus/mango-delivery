<template>
  <div class="combo-block block-small grid grid-tablet g-2 gg-1 m-resp" :class="getComboClass">
    <div class="combo-block__info block-neat">
      <h2 class="combo-block__info-title">{{ blockData.title }}</h2>
      <div class="combo-block__info-description" v-html="blockData.description"/>
      <div class="combo-block__info-items">
        <div class="combo-block__info-item" v-for="(item, i) in blockData.items" :key="i">{{ item.title }}</div>
      </div>
      <div class="row combo-block__info-prices">
        <h2 class="product__info-price m-none">{{ blockData.newPrice }} ₽</h2>
        <h2 class="product__info-price product__info-price-old m-none">{{ blockData.price }} ₽</h2>
      </div>
      <button class="btn btn-primary btn-orange-light m-none">
        <span>{{ $t('buttons.toCart') }}</span>
        <font-awesome-icon icon="basket-shopping"/>
      </button>
    </div>

    <div class="combo-block__images">
      <div class="combo-block__image-wrapper combo-block__image-combo" v-if="blockData.imageType == 'combo'">
        <img class="combo-block__image" :class="{ 'img-loaded': this.isLoaded[0] }"
          :src="blockData.comboImage" alt="combo image" @load="() => onLoad(0)">
      </div>
      
      <template v-else>
        <div class="combo-block__image-wrapper" :class="'combo-block__image-' + (i + 1)"
          v-for="(item, i) in blockData.items" :key="i">
          <img class="combo-block__image" :class="{'img-loaded': this.isLoaded[i] }"
            :src="item.image" alt="combo image" @load="() => onLoad(i)">
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'combo-block',
    data() {
      return {
        isLoaded: Array(3).fill(false), // block can have up to 3 images
      }
    },
    props: {
      blockData: {
        title: String,
        description: String,
        items: Array,
        newPrice: Number,
        price: Number,
        imageType: String, // 1 'combo' image/2-3 'product' images
        comboImage: String,
      }
    },
    methods: {
      onLoad(i) {
        this.isLoaded[i] = true;
      }
    },
    computed: {
      getComboClass() {
        if (!this.blockData || this.blockData.imageType == 'combo') return '';
        return 'combo-block--' + this.blockData.items.length;
      }
    }
  }
</script>

<style lang="scss">
  .combo-block {
    min-height: 29rem;

    &.grid.grid-tablet.g-2 {
      grid-template-columns: auto 250px;
    }

    &--3.combo-block {
      min-height: 35rem;
    }

    &__info {
      &-title,
      &-description {
        margin-bottom: 1.2rem;
      }

      &-items {
        margin-bottom: 2.4rem;
      }

      // TODO: replace with links
      &-item {
        margin-bottom: .4rem;
        text-decoration: underline;
        cursor: pointer;
      }

      &-prices.row {
        align-items: baseline;
        margin-bottom: 2rem;
      }
    }

    &__images {
      position: relative;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity .2s linear;

      &-wrapper {
        width: 25rem;
        height: 18rem;
        border-radius: $radius-medium;
        overflow: hidden;
        background-image: url('~@/assets/images/placeholder-small.png');
        background-size: cover;
        background-position: center;

        &.combo-block__image-combo {
          background-image: url('~@/assets/images/placeholder-big.png');
          width: 25rem;
          height: 29rem;
        }
      }

      &.img-loaded {
        opacity: 1;
      }

      &-2 {
        position: absolute;
        top: 11rem;
        right: 14rem;
      }

      &-3 {
        position: absolute;
        top: 17rem;
        left: 7rem;
      }
    }
  }
</style>