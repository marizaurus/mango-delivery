<template>
  <div class="product-stripe row">
    <img class="product-stripe__img" :src="itemData.image">
    <div>
      <div class="row">
        <div class="product-stripe__name">{{ itemData.title }}</div>
        <div class="product-stripe__rating row">
          <font-awesome-icon icon="star"/>
          <div class="product-stripe__rating-value">{{ itemData.rating }}</div>
        </div>
      </div>
      <div class="product-stripe__tags">{{ itemData.tags.join(' · ') }}</div>
    </div>
    <div class="product-stripe__controls row">
      <font-awesome-icon :icon="['far', 'heart']"/>
      <cart-counter/>
      <div class="product-stripe__price">{{ itemData.price }} ₽</div>
    </div>
  </div>
</template>

<script>
  import vCartCounter from '@/components/v-cart-counter';

  export default {
    name: 'product-stripe',
    components: {
      'cart-counter': vCartCounter,
    },
    props: {
      itemData: {
        type: Object,
        default() {
          return {}
        }
      },
    },
  }
</script>

<style lang="scss">
  .product-stripe {
    padding: 1.2rem 2rem;
    border-radius: $radius-medium;

    // ok fine maybe it IS too much shaking
    // @include shadow-bottom($beige);

    &:nth-child(even) {
      background-color: $white;
    }

    &__img {
      height: 5rem;
      width: 7rem;
      object-fit: cover;
      margin-right: 1.4rem;
      border-radius: $radius-small;
    }

    &__name {
      font-weight: 700;
      font-size: 2rem;
      margin-bottom: 0.8rem;
    }

    &__rating {
      color: $yellow;
      margin-left: 8px;
      line-height: 2.4rem;
      align-self: flex-start;

      &-value {
        margin-left: 4px;
        font-size: 1.8rem;
        font-weight: 700;
      }
    }

    &__tags {
      font-size: 1.2rem;
    }

    &__controls {
      margin-left: auto;
      flex-basis: 33%;

      svg {
        font-size: 2.4rem;
        color: $red;
        margin-right: 2rem;
      }
    }

    &__price {
      font-weight: 700;
      font-size: 2rem;
      margin-left: auto;
    }
  }
</style>