<template>
  <div class="v-cart">
    <div class="container">
      <div class="container-slim">
        <h1 class="cart-title">{{ $t('cart.title') }}</h1>
        <div class="row a-start">
          <div class="cart__items">
            <div
              class="cart-section"
              v-for="cartItem in this.CART_ITEMS"
              :key="cartItem.id"
            >
              <div class="cart-section__header row">
                <h3 class="cart-section__header-title">{{ cartItem.name }}</h3>
                <div class="cart-section__header-items">{{ $t('cart.items') }} {{ cartItem.items.length }}</div>
                <div class="cart-section__header-total">{{ $t('cart.total') }} {{ cartItem.total }} ₽</div>
              </div>
              <div class="cart-section__items">
                <div
                  class="cart-item row"
                  v-for="item in cartItem.items"
                  :key="item.id"
                >
                  <img class="cart-item__img" :src="item.image">
                  <div>
                    <div class="row">
                      <div class="cart-item__name">{{ item.name }}</div>
                      <div class="cart-item__rating row">
                        <font-awesome-icon icon="star"/>
                        <div class="cart-item__rating-value">{{ item.rating }}</div>
                      </div>
                    </div>
                    <div class="cart-item__tags">{{ item.tags.join(' · ') }}</div>
                  </div>
                  <div class="cart-item__controls">
                    <div class="row">
                      <v-cart-counter/>
                      <div class="cart-item__price">{{ item.price }} ₽</div>
                    </div>
                    <div class="row">
                      <button class="btn btn-outline btn-control">
                        <font-awesome-icon icon="trash-alt"/>
                        <span>{{ $t('buttons.remove') }}</span>
                      </button>
                      <button class="btn btn-outline">
                        <font-awesome-icon icon="heart"/>
                        <span>{{ $t('buttons.favorite') }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart__tab block-neat">
            <h3 class="cart__tab-title">{{ $t('cart.tab-title') }}</h3>
            <h3 class="cart__tab-title">{{ $t('cart.total') }}</h3>
            <h3 class="cart__tab-title">{{ $t('cart.code') }}</h3>
            <button class="btn btn-primary btn-orange-light m-auto">
              <span>{{ $t('buttons.order') }}</span>
              <font-awesome-icon icon="angle-right"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vCartCounter from '@/components/v-cart-counter';
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "v-cart",

    components: {
      'v-cart-counter': vCartCounter,
    },
    computed: {
      ...mapGetters([
        'CART_ITEMS',
      ]),
    },
    methods: {
      ...mapActions([
        'GET_CART_API',
      ]),
    },
    mounted() {
      this.GET_CART_API();
    }
  }
</script>

<style lang="scss">
  .cart {
    &-title {
      margin-top: 6rem;
    }

    &__items {
      flex-basis: 70%;
      margin-right: 2.8rem;
    }

    &__tab {
      flex-basis: 30%;
      background-color: $white;
      padding: 1.6rem 2rem;
      border-radius: 5px;

      @include shadow-angle($grey-light);
    }

    &-section {
      &__header {
        padding: 1.6rem 1.8rem;
        background-color: $beige;
        border-radius: 5px;

        &-title {
          margin: 0;
        }

        &-items {
          margin-left: auto;
          margin-right: 2rem;
        }
      }
    }

    &-item {
      padding: 1.4rem 2rem;
      border-radius: 5px;

      @include shadow-bottom($beige);

      &:nth-child(even) {
        background-color: $white;
      }

      &__img {
        height: 7rem;
        width: 10rem;
        object-fit: cover;
        margin-right: 1.4rem;
      }

      &__name {
        font-weight: 500;
        font-size: 2rem;
        line-height: 2.8rem;
      }

      &__rating {
        color: $yellow;
        margin-left: 8px;

        &-value {
          margin-left: 4px;
          font-size: 1.8rem;
          font-weight: 700;
        }
      }

      &__controls {
        margin-left: auto;

        & > .row:first-of-type {
          margin-bottom: 1.8rem;
        }

        .btn-control {
          margin-right: 2rem;
        }
      }

      &__price {
        font-weight: 700;
        font-size: 2rem;
        margin-left: 3.2rem;
      }
    }
  }
</style>