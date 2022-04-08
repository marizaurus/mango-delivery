<template>
  <div class="cart">
    <div class="container container-slim">
      <h1 class="cart-title">{{ $t('cart.title') }}</h1>
      <div class="grid grid-laptop g-7-3 gg-2">
        <div class="cart__items block-neat">
          <accordion class="cart-section"
            v-for="(cartItem, i) in cartItems" :key="i"
            :initialVisible="initialVisible">
            <template #accordionTrigger>
              <div class="cart-section__header row">
                <h3 class="cart-section__header-title">{{ cartItem.title }}</h3>
                <div class="cart-section__header-items">{{ $t('cart.items') }} {{ cartItem.items.length }}</div>
                <div class="cart-section__header-total">{{ $t('cart.total') }} {{ getTotal(i) }} ₽</div>
              </div>
            </template>
            <template #accordionContent>
              <div class="cart-section__items accordion">
                <product-stripe
                  v-for="(item, j) in cartItem.items" :key="j"
                  :itemData="item" @counterUpdated="cartItems[i].items[j].number = $event"/>
              </div>
            </template>
          </accordion>
        </div>

        <div>
          <div class="block-sticky--laptop">
            <div class="cart__tab block-neat">
              <h3 class="cart__tab-title">{{ $t('cart.tab-title') }}</h3>
              <!-- <datepicker v-model="searchParams.date"
                timePicker/> -->
                <!-- https://vue3datepicker.com/api/props/#modeheight -->
              <h3 class="cart__tab-total">{{ $t('cart.total') }}</h3>
              <h3 class="cart__tab-code">{{ $t('cart.code') }}</h3>
            </div>
            <button class="btn btn-primary btn-orange-light m-auto">
              <span>{{ $t('buttons.order') }}</span>
              <font-awesome-icon icon="angle-right"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <component
        v-for="block in CART_BLOCKS" :key="block.id"
        :is="block.type" :blockData="block"/>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import accordion from '../components/accordion.vue';
  import productStripe from '../components/product-stripe.vue';
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set';
  import comboBlock from '@/components/combo-block';
  import db from "../../db.json";
  import axios from 'axios';

  export default {
    name: "cart",
    components: {
      'product-stripe': productStripe,
      'accordion': accordion,
      'carousel': carousel,
      'promo-set': promoSet,
      'combo-block': comboBlock,
    },
    data() {
      return {
        initialVisible: true,
        cartItems: [
          {
            id: 0,
            title: '',
            total: 0,
            items: [
              {
                id: 0,
                title: '',
                rating: 0,
                image: '',
                number: 1,
                price: 0,
                tags: [],
              }
            ]
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'CART_BLOCKS',
      ]),
    },
    methods: {
      ...mapActions([
        'GET_CART_BLOCKS_API',
      ]),
      getCart() {
        if (process.env.NODE_ENV === 'production') {
          this.cartItems = db['cart-items'];
        } else {
          axios.get(process.env.VUE_APP_API_BASE + 'cart-items')
            .then(response => {
              this.cartItems = response.data;
              this.cartItems.forEach(el => el.items.forEach(i => i.number = i.number || 1));
            });
        }
      },
      getTotal(i) {
        return this.cartItems[i].items.map(el => el.number * el.price).reduce((el, sum) => sum + el, 0);
      },
    },
    mounted() {
      this.GET_CART_BLOCKS_API();
      this.getCart();
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

    &__tab {
      background-color: $white;
      padding: 1.6rem 2rem;
      border-radius: $radius-medium;
      box-sizing: border-box;
      align-self: flex-start;

      h3 {
        font-size: 2rem;
      }
    }

    &-section {
      margin-bottom: 1.6rem;

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

      &__tab h3 {
        font-size: 2.4rem;
      }
    }
  }
</style>