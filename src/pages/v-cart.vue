<template>
  <div class="v-cart">
    <div class="container">
      <div class="container-slim">
        <h1 class="cart-title">{{ $t('cart.title') }}</h1>
        <div class="row a-start">
          <accordion class="cart__items">
            <accordion-item
              v-for="cartItem in this.CART_ITEMS"
              :key="cartItem.id"
              class="cart-section">
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
            </accordion-item>
          </accordion>
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
  import { mapActions, mapGetters } from "vuex";
  import accordion from '../components/accordion.vue';
  import accordionItem from "../components/accordion-item.vue";
  import productStripe from '../components/product-stripe.vue';

  export default {
    name: "v-cart",

    components: {
      'product-stripe': productStripe,
      'accordion-item': accordionItem,
      'accordion': accordion,
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
      border-radius: $radius-medium;

      // @include shadow-angle($grey-light);
    }

    &-section {
      margin-bottom: 3.2rem;

      &__header {
        padding: 1.6rem 1.8rem;
        background-color: $beige;
        border-radius: $radius-medium;
        font-size: 1.6rem;
        font-weight: 500;
        
        @include shadow-bottom($beige-dark);

        &-title {
          margin: 0;
        }

        &-items {
          margin-left: auto;
          margin-right: 2rem;
        }
      }

      .accordion__trigger--active .cart-section__header{
        top: -5px;
        box-shadow: 0 5px 0 $beige-dark;
      }
    }
  }
</style>