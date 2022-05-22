<template>
  <div class="favorites">
    <div class="container container-slim m-resp">
      <h1 class="favorites__title">{{ $t('favorites.title') }}</h1>
      <div class="catalog__navigation-wrapper">
        <div class="catalog__tabs-btns mobile m-auto">
          <button class="btn btn-tab" :class="{ 'active': isActive('menu') }"
            @click="setActive('menu')">{{ $t('catalog.tabs.menu') }}</button>
          <button class="btn btn-tab" :class="{ 'active': isActive('restaurants') }"
            @click="setActive('restaurants')">{{ $t('catalog.tabs.restaurants') }}</button>
        </div>
        <div class="catalog__navigation row">
          <!-- TODO: fix items counter -->
          <span class="catalog__navigation-total">{{ $t('favorites.itemsAdded') + 0 }}</span>
          <div class="catalog__tabs-btns laptop">
            <button class="btn btn-tab" :class="{ 'active': isActive('menu') }"
              @click="setActive('menu')">{{ $t('catalog.tabs.menu') }}</button>
            <button class="btn btn-tab" :class="{ 'active': isActive('restaurants') }"
              @click="setActive('restaurants')">{{ $t('catalog.tabs.restaurants') }}</button>
          </div>
          <div class="custom-input catalog__navigation-query">
            <input type="text" v-on="formEvents('query')" v-model="query">
            <label class="custom-input-label" :class="checkFocus('query')">{{ $t('favorites.localSearch') }}</label>
          </div>
        </div>
      </div>

      <div class="catalog__content-wrapper">
        <div class="catalog__content catalog__content--menu row" v-show="isActive('menu')">
          <product-card v-for="(item, i) in products" :key="i" :itemData="item"/>
        </div>
        <div class="catalog__content row" v-show="isActive('restaurants')">
          <restaurant-stripe v-for="(item, i) in restaurants" :key="i" :itemData="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import productCard from "@/components/product-card";
  import restaurantStripe from "@/components/restaurant-stripe";

  import tabHandler from '@/mixins/tabHandler';
  import formHandler from '@/mixins/formHandler';

  export default {
    name: 'favorites',
    components: {
      'product-card': productCard,
      'restaurant-stripe': restaurantStripe,
    },
    mixins: [ tabHandler, formHandler ],
    data() {
      return {
        activeTab: 'menu',
        activeField: '',
        query: '',
        products: [],
        restaurants: [],
      }
    },
    computed: {
      ...mapGetters({
        categories: 'getCategories',
        cuisines: 'getCuisines',
        tags: 'getTags',
      }),
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.products.getProducts();
        this.products = res.data || res;
      });

      this.$load(async () => {
        let res = await this.$api.restaurants.getRestaurants();
        this.restaurants = res.data || res;
      });
    }
  }
</script>

<style lang="scss">
  .favorites {
    .catalog__navigation {
      margin-bottom: 2.4rem;

      &-query {
        margin-bottom: 0;
      }
    }
  }
</style>