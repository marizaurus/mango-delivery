<template>
  <div class="catalog">
    <div class="container m-resp">
      <div class="grid grid-tablet g-2-10 gg-2">
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
            <custom-select class="catalog__sort-options" :style="{ 'z-index': 8 }"
              :selectData="sortData" @selectUpdated="searchParams.sort = $event"/>
          </div>
        </div>

        <div class="catalog__controls">
          <div class="block-sticky--tablet">
            <div class="controls block-neat">
              <custom-select class="select-form controls-status" :style="{ 'z-index': 7 }"
                :selectData="categoriesData" @selectUpdated="searchParams.categories = $event"/>
              <custom-select class="select-form controls-status" :style="{ 'z-index': 6 }"
                :selectData="cuisinesData" @selectUpdated="searchParams.cuisines = $event"/>
              <div class="controls-sum">
                <div class="row" ref="inputs">
                  <div class="controls-sum-input-wrapper">
                    <input type="text" class="controls-sum-input" v-model.number="searchParams.productCost[0]" @input="(e) => handleInput(e, 0)"/>
                  </div>
                  <div class="controls-sum-input-wrapper">
                    <input type="text" class="controls-sum-input" v-model.number="searchParams.productCost[1]" @input="(e) => handleInput(e, 1)"/>
                  </div>
                </div>
                <!-- deal with @error later - add red border to input -->
                <!-- https://nightcatsama.github.io/vue-slider-component/#/advanced/input -->
                <vue-slider ref="slider" v-model="searchParams.productCost" v-bind="sliderOptions"></vue-slider>
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
            <product-card v-for="(item, i) in catalog.menu" :key="i" :itemData="item"/>
          </div>
          <div class="catalog__content row" v-show="isActive('restaurants')">
            <restaurant-stripe v-for="(item, i) in catalog.restaurants" :key="i" :itemData="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import customSelect from '@/forms/custom-select';
  import VueSlider from 'vue-slider-component'
  import productCard from "../components/product-card";
  import restaurantStripe from "../components/restaurant-stripe";
  import 'vue-slider-component/theme/material.css'
  import _get from 'lodash/get';

  export default {
    name: 'catalog',
    components: {
      'custom-select': customSelect,
      'product-card': productCard,
      'restaurant-stripe': restaurantStripe,
      VueSlider,
    },
    data() {
      return {
        activeField: '',
        activeTab: 'menu',
        searchParams: {
          categories: [],
          cuisines: [],
          productCost: [0, 3000],
          sort: '',
        },
        categoriesData: {
          code: 'categoriesData',
          wide: true,
          title: this.$t('catalog.searchParams.categories'),
          options: [],
        },
        cuisinesData: {
          code: 'cuisinesData',
          wide: true,
          title: this.$t('catalog.searchParams.cuisines'),
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
      }
    },
    computed: {
      ...mapGetters({
        catalog: 'CATALOG',
      }),
    },
    methods: {
      ...mapActions([
        'GET_CATALOG_API',
      ]),
      // form fields
      formEvents(target) {
        return {
          focus: () => this.setField(target),
          blur: this.clearFocus,
        }
      },
      setField(target) {
        this.activeField = target; 
      },
      clearFocus() {
        this.activeField = '';
      },
      checkFocus(target) {
        return { 'non-empty': this.activeField == target || !!_get(this.$data, target) };
      },
      handleInput(e, data) {
        this.searchParams.orderSum.splice(data, 1, +e.target.value || 0);
        this.$refs.slider.setValue(this.searchParams.orderSum);
      },
      // tabs
      isActive(menuItem) {
        return this.activeTab === menuItem;
      },
      setActive(menuItem) {
        this.activeTab = menuItem;
      },
    },
    watch: {

    },
    mounted() {
      this.GET_CATALOG_API().then(() => {
        this.categoriesData.options = this.catalog.searchParams.categories;
        this.cuisinesData.options = this.catalog.searchParams.cuisines;
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
      display: none;

      .controls {
        background-color: $beige-medium;
        padding: 1.2rem 1.6rem;
        border-radius: $radius-medium;

        &-sum {
          margin-bottom: 1rem;

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
      }
    }

    &__content.row {
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: center;
      margin-bottom: -4rem;

      .product-card {
        flex-basis: 100%;
        margin-bottom: 4rem;
      }
    }
  }

  @include breakpoint(mobile) {
    .catalog {
      &__content.row {

        &.catalog__content--menu {
          margin-right: -1.6rem;
        }

        .product-card {
          flex-basis: calc(50% - 1.6rem);
          margin-right: 1.6rem;
        }
      }
    }
  }

  @include breakpoint(tablet) {
    .catalog {
      &__controls {
        display: block;
      }

      &__content.row {
        .product-card {
          flex-basis: calc(50% - 2.5rem);
          margin-right: 2.5rem;
        }
      }
    }
  }

  @include breakpoint(laptop) {
    .catalog {
      &__content.row {
        .product-card {
          flex-basis: calc(33% - 2rem);
          margin-right: 2rem;
        }
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