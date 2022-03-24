<template>
  <div class="cart">
    <div class="container container-slim">
      <h1 class="cart-title">{{ $t('cart.title') }}</h1>
      <div class="cart row a-start">
        <div class="cart__items">
          <accordion class="cart-section"
            v-for="cartItem in this.CART_ITEMS"
            :key="cartItem.id">
            <template #accordionTrigger>
              <div class="cart-section__header row">
                <h3 class="cart-section__header-title">{{ cartItem.title }}</h3>
                <div class="cart-section__header-items">{{ $t('cart.items') }} {{ cartItem.items.length }}</div>
                <div class="cart-section__header-total">{{ $t('cart.total') }} {{ cartItem.total }} ₽</div>
              </div>
            </template>
            <template #accordionContent>
              <div class="cart-section__items accordion">
                <product-stripe
                  v-for="item in cartItem.items"
                  :key="item.id"
                  :itemData="item"/>
              </div>
            </template>
          </accordion>
        </div>

        <div class="cart__tab block-neat">
          <h3 class="cart__tab-title">{{ $t('cart.tab-title') }}</h3>
          <h3 class="cart__tab-total">{{ $t('cart.total') }}</h3>
          <h3 class="cart__tab-code">{{ $t('cart.code') }}</h3>
          <button class="btn btn-primary btn-orange-light m-auto">
            <span>{{ $t('buttons.order') }}</span>
            <font-awesome-icon icon="angle-right"/>
          </button>
        </div>
      </div>
    </div>
    <div class="container">
      <component
        v-for="block in this.CART_BLOCKS"
        :key="block.id"
        :is="block.type"
        :blockData="block" />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import accordion from '../components/accordion.vue';
  import productStripe from '../components/product-stripe.vue';
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'

  export default {
    name: "cart",

    components: {
      'product-stripe': productStripe,
      'accordion': accordion,
      'carousel': carousel,
      'promo-set': promoSet,
    },
    computed: {
      ...mapGetters([
        'CART_ITEMS',
        'CART_BLOCKS',
      ]),
    },
    methods: {
      ...mapActions([
        'GET_CART_ITEMS_API',
        'GET_CART_BLOCKS_API',
      ]),
    },
    mounted() {
      this.GET_CART_ITEMS_API();
      this.GET_CART_BLOCKS_API();
    }
  }
</script>

<style lang="scss">
  .cart {
    &-title {
      margin-top: 6rem;
    }
    
    &.row {
      flex-direction: column;
    }

    &__items {
      width: 100%;
    }

    &__tab {
      width: 100%;
      background-color: $white;
      padding: 1.6rem 2rem;
      border-radius: $radius-medium;
      box-sizing: border-box;

      h3 {
        font-size: 2rem;
      }
    }

    &-section {
      margin-bottom: 3.2rem;

      &__header {
        padding: 1rem 1.2rem;
        background-color: $beige;
        border-radius: $radius-medium;
        font-size: 1.6rem;
        font-weight: 500;
        flex-wrap: wrap;
        
        @include shadow-bottom($beige-dark);

        &-title {
          margin: 0;
          width: 100%;
          margin-bottom: .4rem;
        }

        &-items {
          margin-right: 2rem;
        }

        &-items,
        &-total {
          font-size: 1.4rem;
        }
      }

      .accordion__trigger--active .cart-section__header{
        top: -5px;
        box-shadow: 0 5px 0 $beige-dark;
      }
    }
  }

  @include breakpoint(tablet) {
    .cart {
      &-section {
      margin-bottom: 3.2rem;

        &__header {
          padding: 1.6rem 1.8rem;

          &-title {
            width: auto;
            margin-bottom: 0;
          }

          &-items {
            margin-left: auto;
          }

          &-items,
          &-total {
            font-size: 1.6rem;
          }
        }
      }
    }
  }

  @include breakpoint(laptop) {
    .cart {
      &.row {
        flex-direction: row;
      }

      &__items {
        width: 70%;
        margin-right: 2.8rem;
      }

      &__tab {
        width: 30%;
        h3 {
          font-size: 2.4rem;
        }
      }
    }
  }
</style>