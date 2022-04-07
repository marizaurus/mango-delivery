<template>
  <div class="order-history">
    <div class="container container-slim m-resp">
      <h1 class="order-history__title">{{ $t('orderHistory.title') }}</h1>
      <div class="grid grid-tablet g-7-3 gg-2">
        <div class="row order-history__tabs">
          <button class="btn btn-tab" :class="{ 'active': isActive('active') }"
            @click="setActive('active')">{{ $t('orderHistory.tabs.active') }}</button>
          <button class="btn btn-tab" :class="{ 'active': isActive('completed') }"
            @click="setActive('completed')">{{ $t('orderHistory.tabs.completed') }}</button>
        </div>
        <span></span>
        <div>
          <div v-show="isActive('active')">
            <div class="grid grid-mobile g-5 order-history__table-box order-history__table-header">
              <span>{{ $t('orderHistory.orderNum') }}</span>
              <span>{{ $t('orderHistory.status') }}</span>
              <span>{{ $t('orderHistory.client') }}</span>
              <span>{{ $t('orderHistory.dateTime') }}</span>
              <span style="text-align: end;">{{ $t('orderHistory.orderSum') }}</span>
            </div>
            <!-- :closeOnBlur="true" -->
            <accordion class="order-history__table-row" :closeOnBlur="true"
              v-for="(order, i) in orderHistory.active" :key="i" :ref="'accordion-' + i">
              <template #accordionTrigger>
                <div class="grid grid-mobile g-5 order-history__table-row-info order-history__table-box"
                  @click.stop="getOrder(order.orderNum, 'accordion-' + i)">
                  <!-- delay accordion toggle until data has loaded -->
                  <span>{{ order.orderNum }}</span>
                  <span>{{ order.status }}</span>
                  <span>{{ order.client }}</span>
                  <span>{{ order.dateTime }}</span>
                  <span>{{ order.orderSum }} ₽</span>
                </div>
              </template>
              <template #accordionContent>
                <div class="order-history__order-info">
                  <div class="row">
                    <h3 class="order-history__order-num m-none">{{ $t('orderHistory.order') }} {{ activeOrder.orderNum }}</h3>
                    <span>{{ $t('orderHistory.orderFrom') }} {{ activeOrder.orderDate }}</span>
                  </div>
                  <div class="row">
                    <span class="t-medium">{{ $t('orderHistory.client') }}: </span>
                    <span>{{ activeOrder.client }}</span>
                    <span>{{ activeOrder.clientTel }}</span>
                    <button class="btn btn-outline ml-auto">{{ $t('buttons.clientChat') }}</button>
                  </div>
                </div>
                <div class="order-history__order-items">
                  <product-stripe v-for="(item, i) in activeOrder.items" :key="i" :itemData="item" :type="'history'"/>
                </div>
                <div class="row order-history__order-total">
                  <span class="ml-auto t-medium">{{ $t('orderHistory.orderSum') }}:</span>
                  <span class="t-bold">{{ activeOrder.orderSum }}₽</span>
                </div>
              </template>
            </accordion>
            
          </div>
          <div v-show="isActive('completed')">Completed</div>
        </div>
        <div class="order-history__controls">
          <div class="block-sticky--tablet block-neat">
            <h3 class="order-history__controls-title">{{ $t('orderHistory.searchParams.title') }}</h3>
            <div class="controls block-neat">
              <div class="custom-input controls-query">
                <input type="text" v-on="formEvents('searchParams.query')" v-model="searchParams.query">
                <label class="custom-input-label" :class="checkFocus('searchParams.query')">{{ $t('orderHistory.searchParams.search') }}</label>
              </div>
              <custom-select class="select-form controls-status" :selectData="statusesData" @selectUpdated="searchParams.statuses = $event"/>
              <div class="controls-sum">
                <div class="row" ref="inputs">
                  <div class="controls-sum__input-wrapper">
                    <input type="text" class="controls-sum__input" v-model.number="searchParams.orderSum[0]" @input="(e) => handleInput(e, 0)"/>
                  </div>
                  <div class="controls-sum__input-wrapper">
                    <input type="text" class="controls-sum__input" v-model.number="searchParams.orderSum[1]" @input="(e) => handleInput(e, 1)"/>
                  </div>
                </div>
                <!-- deal with @error later - add red border to input -->
                <!-- https://nightcatsama.github.io/vue-slider-component/#/advanced/input -->
                <vue-slider ref="slider" v-model="searchParams.orderSum" v-bind="sliderOptions"></vue-slider>
              </div>
              <div class="custom-checkbox">
                <label>
                  <input type="checkbox" v-model="searchParams.bothTabs">
                  <span class="custom-checkbox-label">{{ $t('orderHistory.searchParams.bothTabs') }}</span>
                </label>
              </div>
            </div>
            <button class="btn btn-primary btn-orange-light m-auto">
              <span>{{ $t('buttons.search') }}</span>
              <font-awesome-icon icon="angle-right"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import customSelect from '@/forms/custom-select';
  import { mapActions, mapGetters } from "vuex";
  import accordion from '../components/accordion.vue';
  import productStripe from '../components/product-stripe.vue';
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/material.css'
  import _get from 'lodash/get';
  // it's spreading.. the depresssion..
  import db from "../../db.json";
  import axios from 'axios';

  export default {
    name: 'order-history',
    components: {
      'custom-select': customSelect,
      'product-stripe': productStripe,
      VueSlider,
      accordion,
    },
    data() {
      return {
        activeTab: 'active',
        currentField: '',
        searchParams: {
          query: '',
          statuses: [],
          orderSum: [0, 3000],
          bothTabs: false,
        },
        statusesData: {
          code: 'statusesData',
          title: this.$t('orderHistory.status'),
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
        activeOrder: {
          orderNum: '',
          status: '',
          client: '',
          clientTel: '',
          orderDate: '',
          orderSum: 0,
          items: [
            {
              id: 0,
              title: '',
              rating: 0,
              image: '',
              tags: [],
              number: 1,
              price: 0,
            }
          ],
        },
      }
    },
    computed: {
      ...mapGetters({
        orderHistory: 'ORDER_HISTORY',
      }),
    },
    methods: {
      ...mapActions([
        'GET_ORDER_HISTORY_API',
      ]),
      // form fields
      formEvents(target) {
        return {
          focus: () => this.setField(target),
          blur: this.clearFocus,
        }
      },
      setField(target) {
        this.currentField = target; 
      },
      clearFocus() {
        this.currentField = '';
      },
      checkFocus(target) {
        return { 'non-empty': this.currentField == target || !!_get(this.$data, target) };
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
      getOrder(id, accordionRef) {
        if (this.activeOrder.orderNum == id) {
          this.$refs[accordionRef][0].toggle();
        } else if (process.env.NODE_ENV === 'production') {
          this.activeOrder = db.orders.find(el => el.orderNum == id);
          this.$refs[accordionRef][0].toggle();
        } else {
          axios.get(process.env.VUE_APP_API_BASE + 'orders?orderNum=' + id)
            .then(response => {
              this.activeOrder = response.data[0];
              this.$refs[accordionRef][0].toggle();
            });
        }
      }
    },
    mounted() {
      this.GET_ORDER_HISTORY_API().then(() => { this.statusesData.options = this.orderHistory.searchParams.statuses });
    }
  }
</script>

<style lang="scss">
  .order-history {
    &__tabs {
      justify-content: center;
    }

    .controls {
      background-color: $beige-medium;
      padding: 1.2rem 1.6rem;
      border-radius: $radius-medium;

      &-query input {
        width: 100%;
        max-width: unset;
      }

      &-status {
        z-index: 6;
      }

      &-sum {
        margin-bottom: 1rem;

        & > .row {
          justify-content: space-between;
          margin-bottom: .8rem;
        }

        &__input {
          background-color: $white;
          border-radius: $radius-small;
          border: none;
          padding: .8rem;
          font-size: 1.6rem;
          font-family: $montserrat;
          box-sizing: border-box;
          border-right: 2rem solid $white;
          width: 10rem;
        
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

    &__table {
      &-header {
        font-weight: 500;
        background-color: $beige;
      }

      &-row {
        &:nth-child(odd) .order-history__table-box {
          background-color: $white;
          border-radius: $radius-small;
        }

        &-info {
          & span {
            &:first-child {
              text-decoration: underline;
            }

            &:last-child {
              text-align: end;
              font-weight: 700;
            }
          }
        }
      }

      &-box {
        padding: 1.2rem 1.6rem;
      }
    }

    &__order {
      &-info {
        padding: 1.6rem 1.6rem 0;

        & > .row {
          margin-bottom: 1.2rem;
          align-items: baseline;

          span:not(:first-child) {
            margin-left: 1.6rem;
          }
        }
      }

      &-total {
        padding: .4rem 1.6rem 1.6rem;

        span:last-child {
          margin-left: 1.6rem;
        }
      }
    }
  }
</style>