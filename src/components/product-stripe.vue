<template>
  <div class="product-stripe row">
    <img class="product-stripe__img" :src="itemData.image">
    <div class="product-stripe__info row">
      <div class="product-stripe__info-name row">
        <span>{{ itemData.title }}</span>
        <div class="product-stripe__info-rating row">
          <font-awesome-icon icon="star"/>
          <div class="product-stripe__info-rating-value">{{ itemData.rating }}</div>
          <font-awesome-icon :icon="['far', 'heart']" class="product-stripe__favorite"/>
        </div>
      </div>
      <div class="break"/>
      <div class="product-stripe__info-tags">{{ itemData.tags.join(' · ') }}</div>
    </div>
    <div class="product-stripe__controls row">
      <div class="break"/>
      <cart-counter/>
      <div class="product-stripe__price">{{ itemData.price }} ₽</div>
    </div>
  </div>
</template>

<script>
  import cartCounter from '@/components/cart-counter';

  export default {
    name: 'product-stripe',
    components: {
      'cart-counter': cartCounter,
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
    padding: 1rem 1.2rem;
    border-radius: $radius-medium;
    justify-content: space-between;

    &:nth-child(even) {
      background-color: $white;
    }

    &__img {
      display: none;
      height: 5rem;
      width: 7rem;
      object-fit: cover;
      margin-right: 1.4rem;
      border-radius: $radius-small;
    }

    &__info,
    &__controls {
      flex-wrap: wrap;
    }

    &__info {
      width: 65%;

      &-name span {
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: 0.8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 15rem;
      }

      &-rating {
        color: $yellow;
        margin-left: .8rem;
        line-height: 2.4rem;
        align-self: flex-start;

        &-value {
          margin-left: .4rem;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .product-stripe__favorite {
          margin-left: 1rem;
          font-size: 2rem;
          color: $red;
        }
      }

      .break {
        flex-basis: 100%;
      }

      &-tags {
        font-size: 1.2rem;
      }
    }

    &__controls {
      margin-top: -.4rem;
      width: 16rem;
      justify-content: flex-end;
      
      .cart-counter,
      .product-stripe__price {
        margin-top: .4rem;
      }
    }

    &__price {
      font-weight: 700;
      font-size: 2rem;
      margin-left: auto;
    }
  }

  @include breakpoint(tablet) {
    .product-stripe {
      padding: 1.2rem 2rem;

      &__img {
        display: block;
      }
    }
  }

  @include breakpoint(laptop) {

  }
</style>