<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <img class="img product-card__image" :class="{ 'img-loaded': this.isLoaded }"
        :src="itemData.image" alt="product image" @load="onLoad">
    </div>
    <div class="product-card__like-wrapper" :class="{ 'active': isFavorite }" @click="isFavorite = !isFavorite">
      <font-awesome-icon :icon="isFavorite ? ['fas', 'heart'] : ['far', 'heart']" class="product-stripe__favorite"/>
    </div>
    <div class="product-card__info">
      <div class="product-card__info-row row">
        <div class="product-card__info-name">{{ itemData.title }}</div>
        <div class="product-card__info-rating row">
          <font-awesome-icon icon="star"/>
          <div class="product-card__info-rating-value">{{ itemData.rating }}</div>
        </div>
      </div>
      <div class="product-card__info-tags product-card__info-row row">{{ itemData.tags.join(' · ') }}</div>
      <div class="product-card__info-row row">
        <div class="product-card__cart-price">{{ itemData.price }} ₽</div>
        <div class="product-card__cart-controls row">
          <cart-counter/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import cartCounter from '@/components/cart-counter';

  export default {
    name: 'product-card',
    components: {
      'cart-counter': cartCounter,
    },
    data() {
      return {
        isLoaded: false,
        isFavorite: this.itemData.isFavorite,
      }
    },
    props: {
      itemData: {
        title: String,
        rating: Number,
        image: String,
        tags: Array,
        price: Number,
        isFavorite: Boolean,
      }
    },
    methods: {
      onLoad() {
        this.isLoaded = true;
      }
    }
  }
</script>

<style lang="scss">
  .product-card {
    width: 100%;
    max-width: 28rem;
    background-color: $white;
    border-radius: $radius-medium;
    overflow: hidden;
    position: relative;
    // box-shadow: 0 0 15px $grey-light;

    &:hover {
      .product-card__like-wrapper {
        display: block;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity .2s linear;

      &-wrapper {
        width: 100%;
        height: 16rem;
        background-image: url('~@/assets/images/placeholder-small.png');
        background-size: cover;
        background-position: center;
      }

      &.img-loaded {
        opacity: 1;
      }
    }

    &__like {
      &-wrapper {
        border-radius: 50%;
        background-color: $white;
        position: absolute;
        left: 1rem;
        top: 1rem;
        height: 3.6rem;
        width: 3.6rem;
        text-align: center;
        padding: .6rem 0;
        box-sizing: border-box;
        color: $red;
        font-size: 2.4rem;
        display: none;
        cursor: pointer;

        &.active {
          display: block;
        }
      }
    }

    &__info {
      padding: 1.2rem 1.2rem 1.4rem;

      &-row:not(:last-child) {
        margin-bottom: 0.8rem;
      }

      &-name {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
      }

      &-rating {
        margin-left: auto;
        color: $yellow;
        align-self: flex-start;
        line-height: 2.4rem;

        &-value {
          margin-left: 4px;
          font-size: 1.8rem;
          font-weight: 700;
        }
      }

      &-tags {
        color: $grey-dark;
        font-size: 1.2rem;
      }
    }

    &__cart {
      &-price {
        color: $orange-light;
        font-weight: 700;
        font-size: 2rem;
      }

      &-controls {
        margin-left: auto;
      }
    }
  }

  @include breakpoint(tablet) {
    .product-card {
      // @include shadow-angle($beige);
    }
  }
</style>