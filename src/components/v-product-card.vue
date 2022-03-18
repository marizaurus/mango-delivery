<template>
  <div class="v-product-card">
    <img class="v-product-card__image" :src="cardData.image">
    <div class="v-product-card__info">
      <div class="v-product-card__info-row row">
        <div class="v-product-card__info-name">{{ cardData.name }}</div>
        <div class="v-product-card__info-rating row">
          <font-awesome-icon icon="star"/>
          <div class="v-product-card__info-rating-value">{{ cardData.rating }}</div>
        </div>
      </div>
      <div class="v-product-card__info-tags v-product-card__info-row row">{{ cardData.tags.join(' · ') }}</div>
      <div class="v-product-card__info-row row">
        <div class="v-product-card__cart-price">{{ cardData.price }} ₽</div>
        <div class="v-product-card__cart-controls row">
          <v-cart-counter/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vCartCounter from '@/components/v-cart-counter';

  export default {
    name: "product-card",
    components: {
      'v-cart-counter': vCartCounter,
    },
    props: {
      cardData: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }

  // https://via.placeholder.com/200x200
</script>

<style lang="scss">
  .v-product-card {
    flex-basis: 24%;
    background-color: $white;
    border-radius: 5px;
    overflow: hidden;

    @include shadow-angle($beige);

    &:not(:last-child) {
      margin-right: 3rem;
    }

    &__image {
      width: 100%;
      height: 160px;
      object-fit: cover;
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
</style>