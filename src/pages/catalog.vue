<template>
  <div class="catalog">
    <div class="container m-resp">
      <div class="grid grid-laptop g-2-10 gg-2">
        <h1 class="catalog__title m-none">{{ $t('catalog.title') }}</h1>
        <div class="catalog__navigation-wrapper">
          <div class="catalog__tabs-btns mobile m-auto">
            <button class="btn btn-tab" :class="{ 'active': isActive('menu') }"
              @click="setActive('menu')">{{ $t('catalog.tabs.menu') }}</button>
            <button class="btn btn-tab" :class="{ 'active': isActive('restaurants') }"
              @click="setActive('restaurants')">{{ $t('catalog.tabs.restaurants') }}</button>
          </div>
          <div class="catalog__navigation row">
            <!-- TODO: fix items counter -->
            <span class="catalog__navigation-total">{{ $t('catalog.itemsFound') + 0 }}</span>
            <div class="catalog__tabs-btns laptop">
              <button class="btn btn-tab" :class="{ 'active': isActive('menu') }"
                @click="setActive('menu')">{{ $t('catalog.tabs.menu') }}</button>
              <button class="btn btn-tab" :class="{ 'active': isActive('restaurants') }"
                @click="setActive('restaurants')">{{ $t('catalog.tabs.restaurants') }}</button>
            </div>
            <custom-select class="catalog__sort-options block" :style="{ 'z-index': 8 }"
              :selectData="sortData" v-if="sortData && sortData.options.length" @selectUpdated="searchParams.sort = $event"/>
          </div>
        </div>

        <div class="catalog__controls">
          <div class="block-sticky--tablet">
            <div class="controls block-neat grid gv-1">
              <custom-select class="select-form controls-status wide" :style="{ 'z-index': 8 }"
                :selectData="categoriesData" v-if="categoriesData && categoriesData.options.length" @selectUpdated="searchParams.categories = $event"/>
              <custom-select class="select-form controls-status wide" :style="{ 'z-index': 7 }"
                :selectData="cuisinesData" v-if="cuisinesData && cuisinesData.options.length" @selectUpdated="searchParams.cuisines = $event"/>
              <custom-select class="select-form controls-status wide" :style="{ 'z-index': 6 }"
                :selectData="tagsData" v-if="tagsData && tagsData.options.length" @selectUpdated="searchParams.tags = $event"/>
              <div class="controls-sum">
                <div class="row" ref="inputs">
                  <div class="controls-sum-input-wrapper">
                    <input type="text" class="controls-sum-input" v-model.number="searchParams.orderSum[0]" @input="(e) => handleInput(e, 0)"/>
                  </div>
                  <div class="controls-sum-input-wrapper">
                    <input type="text" class="controls-sum-input" v-model.number="searchParams.orderSum[1]" @input="(e) => handleInput(e, 1)"/>
                  </div>
                </div>
                <!-- deal with @error later - add red border to input -->
                <!-- https://nightcatsama.github.io/vue-slider-component/#/advanced/input -->
                <vue-slider class="controls-sum-slider" ref="slider" v-model="searchParams.orderSum" v-bind="sliderOptions"></vue-slider>
              </div>
              <div class="custom-input controls-rating">
                <label class="custom-input-label non-empty">{{ $t('catalog.searchParams.ratingFrom') }}</label>
                <star-rating v-bind="ratingOptions" v-model:rating="searchParams.rating"/>
                <div class="controls-rating-close icon-close" v-show="searchParams.rating > 0" @click="searchParams.rating = 0">
                  <font-awesome-icon icon="xmark"/>
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-orange-light m-auto">
              <span>{{ $t('buttons.search') }}</span>
              <font-awesome-icon icon="angle-right"/>
            </button>
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

        <!-- <pagination class="catalog__pagination m-auto"/> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import customSelect from '@/forms/custom-select';
  import VueSlider from 'vue-slider-component'
  import productCard from "../components/product-card";
  import restaurantStripe from "../components/restaurant-stripe";
  // import pagination from '../components/pagination';
  import StarRating from 'vue-star-rating'
  import 'vue-slider-component/theme/material.css'

  import tabHandler from '@/mixins/tabHandler';
  import formHandler from '@/mixins/formHandler';

  export default {
    name: 'catalog',
    components: {
      'custom-select': customSelect,
      'product-card': productCard,
      'restaurant-stripe': restaurantStripe,
      'star-rating': StarRating,
      // pagination,
      VueSlider,
    },
    mixins: [ tabHandler, formHandler ],
    data() {
      return {
        activeField: '',
        activeTab: 'menu',
        searchParams: {
          categories: [],
          cuisines: [],
          orderSum: [0, 3000],
          sort: '',
          rating: 0,
        },
        categoriesData: {
          code: 'categoriesData',
          title: this.$t('catalog.searchParams.categories'),
          options: [],
        },
        cuisinesData: {
          code: 'cuisinesData',
          title: this.$t('catalog.searchParams.cuisines'),
          options: [],
        },
        tagsData: {
          code: 'tagsData',
          title: this.$t('catalog.searchParams.tags'),
          options: [],
        },
        sliderOptions: {
          max: 3000,
          dragOnClick: true,
          duration: 0.2,
          tooltip: 'none',
          contained: true,
          silent: true,
          railStyle: {
            backgroundColor: '#FFFFFF',
          },
          processStyle: {
            backgroundColor: '#EFE2BE',
          },
        },
        sortData: {
          code: 'sortData',
          title: this.$t('catalog.sortOptions'),
          optionType: 'radio',
          options: [],
          alignment: 'right',
        },
        sortOptions: [
          'popular',
          'cheap',
          'expensive',
          'highlyRated',
          'onSale',
        ],
        ratingOptions: {
          'show-rating': false,
          'rounded-corners': true,
          'border-width': 3,
          'star-size': 17,
          'inactive-color': '#ffffff',
          'active-color': '#ffc93c',
          'border-color': '#ffffff',
          'active-border-color': '#ffc93c',
        },
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
        this.categoriesData.options = Object.entries(Object.assign({}, this.categories)).map(([key, value]) => ({ code: key, name: value }));
        this.cuisinesData.options = Object.entries(Object.assign({}, this.cuisines)).map(([key, value]) => ({ code: key, name: value }));
        this.tagsData.options = JSON.parse(JSON.stringify(this.tags)).map((el) => ({ code: el.code, name: el.name }));
      });

      this.$load(async () => {
        let res = await this.$api.restaurants.getRestaurants();
        this.restaurants = res.data || res;
      });

      this.sortData.options = this.sortOptions.map(el => ({ code: el, name: this.$t('catalog.sortParams.' + el) }));
      this.sortData.options[0].isChecked = true;
    }
  }
</script>

<style lang="scss">
  .catalog {
    &__navigation {
      &-wrapper {
        display: flex;
        flex-flow: column;
        align-items: center;
      }

      &.row {
        align-self: stretch;
        justify-content: space-between;
        align-items: flex-end;
      }

      &-total {
        font-weight: 500;
        font-size: 2rem;
      }
    }

    &__sort-options {
      margin-bottom: 0;
    }

    &__tabs-btns.mobile {
      margin-bottom: 1.2rem;
    }

    &__controls {
      .controls {
        background-color: $beige-medium;
        padding: 1.2rem 1.6rem;
        border-radius: $radius-medium;

        &-sum {
          & > .row {
            justify-content: space-between;
            margin-bottom: .8rem;
          }

          &-input {
            background-color: $white;
            border-radius: $radius-small;
            border: none;
            padding: .8rem;
            font-size: 1.6rem;
            font-family: $montserrat;
            box-sizing: border-box;
            border-right: 2rem solid $white;
            width: 9rem;
          
            &:active,
            &:focus {
              outline: none;
            }

            &-wrapper {
              position: relative;

              &::after {
                position: absolute;
                right: .4rem;
                top: 50%;
                transform: translateY(-50%);
                content: '₽';
              }
            }
          }

          .vue-slider-dot-handle {
            background-color: $beige-dark;

            &::after {
              background-color: transparent;
            }
          }
        }

        &-rating.custom-input {
          height: 4rem;

          label.non-empty {
            color: $grey-dark;
            left: 0;
            top: 0;
          }

          .vue-star-rating {
            left: -.2rem;
            top: 1.7rem;
          }
        }

        &-rating-close {
          top: 1.6rem;
          left: 12.4rem;
        }

        .vue-star-rating-star {
          height: 20px;
        }
      }
    }

    &__content.row {
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: -4rem;

      &.catalog__content--menu {
        margin-right: -1.6rem;
      }

      .product-card {
        flex-basis: calc(50% - 1.6rem);
        margin-bottom: 4rem;
        margin-right: 1.6rem;
      }
    }
  }

  @include breakpoint(mobile) {
    .catalog {
      &__content.row {

        .product-card {
          flex-basis: calc(50% - 2.5rem);
          margin-right: 2.5rem;
        }
      }
    }
  }

  @include breakpoint(tablet) {
    .catalog {
      &__content.row {
        .product-card {
          flex-basis: calc(33% - 2rem);
          margin-right: 2rem;
        }
      }

      &__pagination {
        grid-column: 2;
      }
    }
  }

  @include breakpoint(desktop) {
    .catalog {
      &__content.row {
        .product-card {
          flex-basis: calc(25% - 2rem);
          margin-right: 2rem;
        }
      }
    }
  }
</style>