<template>
  <div class="container container-slim m-resp tab__content">
    <div class="grid grid-tablet gg-2 g-7-3">
      <div class="table-wrapper account__orders-table">
        <div class="grid grid-mobile g-5 table__header table__row">
          <span>{{ $t('orderHistory.orderNum') }}</span>
          <span>{{ $t('orderHistory.status') }}</span>
          <span>{{ $t('orderHistory.restaurant') }}</span>
          <span>{{ $t('orderHistory.dateTime') }}</span>
          <span style="text-align: end;">{{ $t('orderHistory.orderSum') }}</span>
        </div>
        <accordion class="table__row-wrapper" :closeOnBlur="true"
          v-for="(order, i) in orders" :key="i" :ref="'accordion-' + i">
          <template #accordionTrigger>
            <div class="grid grid-mobile g-5 table__row" @click.stop="getOrder(order.orderNum, i)">
              <!-- delay accordion toggle until data has loaded -->
              <span>{{ order.orderNum }}</span>
              <span>{{ order.status }}</span>
              <span>{{ order.restaurant }}</span>
              <span>{{ order.dateTime }}</span>
              <span>{{ order.orderSum }} ₽</span>
            </div>
          </template>
          <template #accordionContent v-if="activeOrder">
            <div class="order-history__order-info">
              <div class="row">
                <h3 class="order-history__order-num m-none">{{ $t('orderHistory.order') }} {{ activeOrder.orderNum }}</h3>
                <span>{{ $t('orderHistory.orderFrom') }} {{ activeOrder.orderDate }}</span>
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

      <div class="account__orders-controls">
        <div class="block-sticky--tablet block-neat">
          <h3 class="account__orders-controls-title">{{ $t('orderHistory.searchParams.title') }}</h3>
          <div class="search-controls block-neat grid gv-1">
            <div class="custom-input controls-query">
              <input type="text" v-on="formEvents('searchParams.query')" v-model="searchParams.query">
              <label class="custom-input-label" :class="checkFocus('searchParams.query')">{{ $t('orderHistory.searchParams.search') }}</label>
            </div>
            <custom-select class="select-form controls-status wide" :selectData="statusesData" v-if="statusesData" @selectUpdated="searchParams.statuses = $event"/>
            <datepicker v-model="searchParams.date" :format-locale="language" range textInput multiCalendars multiCalendarsSolo autoApply v-bind="datePickerOptions">
              <!-- eslint-disable-next-line vue/no-unused-vars -->
              <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
                <div class="custom-input controls-dates m-none">
                  <input type="text" :value="value">
                  <label class="custom-input-label" :class="{ 'non-empty': value }">{{ $t('orderHistory.searchParams.dates') }}</label>
                </div>
              </template>
            </datepicker>
            <div class="controls-sum">
              <div class="row" ref="inputs">
                <div class="controls-sum__input-wrapper">
                  <input type="text" class="controls-sum__input" v-model.number="searchParams.orderSum[0]" @input="(e) => handleInput(e, 0)"/>
                </div>
                <div class="controls-sum__input-wrapper">
                  <input type="text" class="controls-sum__input" v-model.number="searchParams.orderSum[1]" @input="(e) => handleInput(e, 1)"/>
                </div>
              </div>
              <vue-slider ref="slider" v-model="searchParams.orderSum" v-bind="sliderOptions"></vue-slider>
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
</template>

<script>
  import accordion from '../../components/accordion';
  import Datepicker from '@vuepic/vue-datepicker';
  import customSelect from '../../forms/custom-select';
  import productStripe from '../../components/product-stripe';
  import VueSlider from 'vue-slider-component';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { mapGetters } from 'vuex';
  import { ru } from 'date-fns/locale'

  import formHandler from '@/mixins/formHandler';

  export default {
    name: 'orders',
    components: {
      'custom-select': customSelect,
      'product-stripe': productStripe,
      accordion,
      Datepicker,
      VueSlider,
    },
    mixins: [ formHandler ],
    data() {
      return {
        orders: [],
        activeOrder: null,
        activeField: null,
        statusesData: null,
        searchParams: {
          sort: '',
          query: '',
          statuses: [],
          date: null,
          orderSum: [0, 3000],
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
        language: ru,
        datePickerOptions: {
          format: 'dd MMMM yyyy',
          enableTimePicker: false,
          locale: 'ru',
        },
      }
    },
    computed: {
      ...mapGetters({
        statuses: 'getStatuses',
      }),
    },
    methods: {
      // orders
      getOrder(id, i) {
        let acc = 'accordion-' + i;

        if (this.activeOrder && (this.activeOrder.orderNum == id)) {
          this.$refs[acc][0].toggle();
        } else {
          this.$load(async () => {
            let res = await this.$api.account.getOrder(id);
            this.activeOrder = res.data || res;
          }).then(() => this.$refs[acc][0].toggle());
        }
      },
      getStatusesData() {
        return {
          code: 'statusesData',
          title: this.$t('orderHistory.status'),
          options: Object.entries(Object.assign({}, this.statuses)).map(([key, value]) => ({ code: key, name: value })),
        }
      },
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.account.getOrders();
        this.orders = res.data || res;
        this.statusesData = this.getStatusesData();
      });
    }
  }
</script>