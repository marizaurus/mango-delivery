<template>
  <div class="order-history">
    <div class="container container-slim m-resp">
      <h1 class="order-history__title">{{ $t('orderHistory.title') }}</h1>
      <div class="grid grid-tablet gg-2" :class="activeUser == 'manager' ? 'g-7-3' : 'g-2'">
        <div class="row order-history__tabs">
          <div class="order-history__tabs-btns">
            <button class="btn btn-tab" :class="{ 'active': isActive('active') }"
              @click="setActive('active')">{{ $t('orderHistory.tabs.active') }}</button>
            <button class="btn btn-tab" :class="{ 'active': isActive('completed') }"
              @click="setActive('completed')">{{ $t('orderHistory.tabs.completed') }}</button>
          </div>
          <custom-select class="order-history__tabs-sort m-none" :selectData="tableSort" @selectUpdated="searchParams.sort = $event"/>
        </div>

        <!-- temp solution for user switch -->
        <custom-select class="order-history__user-select m-none ml-auto" :style="{ 'z-index': 1 }"
          :selectData="userData" @selectUpdated="activeUser = $event"/>

        <div class="order-history__content">
          <div v-show="isActive('active')" class="order-history__table-wrapper">
            <div class="grid grid-mobile g-5 order-history__table-box order-history__table-header" :class="{ 'order-history__table-box--courier' : activeUser == 'courier' }">
              <span v-if="activeUser == 'courier'"></span>
              <span>{{ $t('orderHistory.orderNum') }}</span>
              <span v-if="activeUser == 'manager'">{{ $t('orderHistory.status') }}</span>
              <span>{{ $t('orderHistory.client') }}</span>
              <span>{{ $t('orderHistory.dateTime') }}</span>
              <span style="text-align: end;">{{ $t('orderHistory.orderSum') }}</span>
            </div>
            <accordion class="order-history__table-row" :closeOnBlur="true"
              v-for="(order, i) in orderHistory.active" :key="i" :ref="'accordion-' + i">
              <template #accordionTrigger>
                <div class="grid grid-mobile g-5 order-history__table-row-info order-history__table-box" :class="{ 'order-history__table-box--courier' : activeUser == 'courier' }"
                  @click.stop="getOrder(order.orderNum, i)">
                  <!-- delay accordion toggle until data has loaded -->
                  <div v-if="activeUser == 'courier'">
                    <div class="order-history__pin">
                      <font-awesome-icon icon="location-pin"/>
                      <span class="order-history__pin-label order-history__pin-label--list">{{ i + 1 }}</span>
                    </div>
                  </div>
                  <span>{{ order.orderNum }}</span>
                  <span v-if="activeUser == 'manager'">{{ order.status }}</span>
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

        <div class="order-history__controls" v-if="activeUser == 'manager'">
          <div class="block-sticky--tablet block-neat">
            <h3 class="order-history__controls-title">{{ $t('orderHistory.searchParams.title') }}</h3>
            <div class="controls block-neat">
              <div class="custom-input controls-query">
                <input type="text" v-on="formEvents('searchParams.query')" v-model="searchParams.query">
                <label class="custom-input-label" :class="checkFocus('searchParams.query')">{{ $t('orderHistory.searchParams.search') }}</label>
              </div>
              <custom-select class="select-form controls-status" :selectData="statusesData" @selectUpdated="searchParams.statuses = $event"/>
              <datepicker v-model="searchParams.date"
                range textInput multiCalendars multiCalendarsSolo autoApply
                v-bind="datePickerOptions"/>
              <!-- range presets: this week, last month -->
              <!-- https://vue3datepicker.com/api/props/#presetranges -->
              <!-- position="right" -->
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

        <div class="order-history__map" v-else-if="activeUser == 'courier'">
          <div class="block-sticky--tablet">
            <yandex-map v-bind="mapSettings" :show-all-markers="true" @map-was-initialized="initMap" ymap-class="order-history__map-content">
              <ymap-marker v-for="(pin, i) in pins" :key="i" v-bind="pin" :marker-id="i" @click="mapSettings.coords = pin.coords"/>
            </yandex-map>
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
  import VueSlider from 'vue-slider-component';
  import 'vue-slider-component/theme/material.css';
  import _get from 'lodash/get';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  // it's spreading.. the depresssion..
  import db from "../../db.json";
  import axios from 'axios';
  import pin from '../assets/icons/location-pin.svg';
  // import { loadYmap } from 'vue-yandex-maps';
  // import settings from '../main';

  // var inputControl = null;
  // var ymaps = null;

  export default {
    name: 'order-history',
    components: {
      'custom-select': customSelect,
      'product-stripe': productStripe,
      VueSlider,
      Datepicker,
      accordion,
    },
    data() {
      return {
        activeTab: 'active',
        activeField: '',
        tableSort: {
          code: 'tableSort',
          title: this.$t('orderHistory.tableSort'),
          optionType: 'radio',
          options: [],
          alignment: 'right',
        },
        tableCols: [
          'orderNum',
          'status',
          'client',
          'dateTime',
          'orderSum',
        ],
        // temp solution for user switch
        userData: {
          code: 'userData',
          title: 'Пользователь',
          optionType: 'radio',
          options: [],
          alignment: 'right',
        },
        activeUser: '',
        searchParams: {
          sort: '',
          query: '',
          statuses: [],
          date: null,
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
        datePickerOptions: {
          format: 'dd.MM.yyyy - dd.MM.yyyy',
          enableTimePicker: false,
          // hideInputIcon: true,
        },
        // map
        mapSettings: {
          coords: [ 59.92694994, 30.33902649 ],
          zoom: 12,
          controls: ['geolocationControl', 'searchControl', 'zoomControl'],
        },
        pinsCollection: null,
        pins: [],
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
      // retrieve order
      getOrder(id, i) {
        let acc = 'accordion-' + i;
        this.mapSettings.coords = this.pins[i].coords;

        if (this.activeOrder.orderNum == id) {
          this.$refs[acc][0].toggle();
        } else if (process.env.NODE_ENV === 'production') {
          this.activeOrder = db.orders.find(el => el.orderNum == id);
          this.$refs[acc][0].toggle();
        } else {
          axios.get(process.env.VUE_APP_API_BASE + 'orders?orderNum=' + id)
            .then(response => {
              this.activeOrder = response.data[0];
              this.$refs[acc][0].toggle();
            });
        }
      },
      // map
      initMap(e) {
        this.map = e;
      }
    },
    async mounted() {
      this.GET_ORDER_HISTORY_API().then(() => {
        this.statusesData.options = this.orderHistory.searchParams.statuses;
        this.orderHistory.active.forEach((el, i) => {
          this.pins.push({
            icon: {
              layout: 'default#imageWithContent',
              imageHref: pin,
              imageSize: [36, 36],
              imageOffset: [-18, -36],
              content: i + 1,
              contentOffset: [0, 4],
              contentLayout: '<span class="order-history__pin-label order-history__pin-label--map">$[properties.iconContent]</span>'
            },
            coords: el.coords,
          });
        });
      });

      this.tableSort.options = this.tableCols.map(el => ({ code: el, name: this.$t('orderHistory.' + el) }));
      this.tableSort.options[0].isChecked = true;

      // force watcher update in custom-select
      this.userData.options = [
        {
          code: "manager",
          name: "Менеджер",
          isChecked: true,
        },
        {
          code: "courier",
          name: "Курьер"
        },
      ];

      // await loadYmap({ ...settings, debug: true });
      // inputControl = new ymaps.control.SearchControl({
      //   options: {
      //   }
      // });
    },
  }
</script>

<style lang="scss">
  // ??
  // @import '@vuepic/vue-datepicker/src/Vue3DatePicker/style/main.scss';
  .order-history {
    &__tabs {
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: -1.2rem;
      margin-left: -1.6rem;

      &.row {
        align-items: flex-end;
      }

      &-btns {
        flex-shrink: 0;
        margin-top: 1.2rem;
        margin-left: 1.6rem;
      }

      &-sort {
        margin: 1.2rem 0 0 1.6rem;
      }
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
          align-items: center;

          & span {
            &:first-child {
              text-decoration: underline;
            }

            &:last-child {
              text-align: end;
              font-weight: 700;
            }
          }

          &.order-history__table-box--courier {
            padding: .8rem 1.6rem;
          }
        }
      }

      &-box {
        padding: 1.2rem 1.6rem;

        &--courier.grid.grid-mobile.g-5 {
          grid-template-columns: 4rem 1fr 1fr 1fr 1fr;
        }
      }
    }

    &__pin {
      position: relative;
      display: inline-block;

      svg {
        font-size: 3.2rem;
        color: $red;
      }

      &-label {
        color: $white;

        &--list {
          position: absolute;
          left: 50%;
          top: .3rem;
          transform: translateX(-50%);
        }

        &--map {
          font-weight: 700;
          font-size: 1.6rem;
          font-family: $montserrat;
          display: inline-block;
          text-align: center;
          width: 3.6rem;
        }
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

    &__user-select {
      margin-right: 0 !important;
    }

    &__map {
      &-content {
        width: 100%;
        height: 35rem;
      }
    }
  }

  @include breakpoint(tablet) {
    .order-history {
      &__tabs {
        flex-wrap: nowrap;
      }

      &__content,
      &__controls {
        grid-row: 2;
      }
    }
  }
</style>