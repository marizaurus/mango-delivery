<template>
  <div class="account m-resp">
    <div class="container container-slim">
      <h1 class="account__title">{{ $t('account.title') }}</h1>
      <div class="row order-history__tabs">
        <div class="order-history__tabs-btns">
          <button class="btn btn-tab" :class="{ 'active': isActive('main') }"
            @click="setActive('main')">{{ $t('account.tabs.main') }}</button>
          <button class="btn btn-tab" :class="{ 'active': isActive('addresses') }"
            @click="setActive('addresses')">{{ $t('account.tabs.addresses') }}</button>
          <button class="btn btn-tab" :class="{ 'active': isActive('orders') }"
            @click="setActive('orders')">{{ $t('account.tabs.orders') }}</button>
        </div>
      </div>
    </div>
    <div class="account__content">
      <div v-show="isActive('main')">
        <div class="container container-slim" v-if="!editMode">
          <div class="grid grid-tablet g-2 gg-2">
            <div>
              <div class="row">
                <h2>{{ account.main.name }}</h2>
                <button class="btn btn-outline ml-auto" @click="editMode = true">{{ $t('buttons.edit') }}</button>
              </div>
              <div class="grid grid-mobile account__main-grid">
                <span class="t-medium">{{ $t('account.main.birthday') }}:</span><span>{{account.main.birthday}}</span>
                <span class="t-medium">{{ $t('account.main.sex') }}:</span><span>{{$t('account.sexOptions.f')}}</span>
                <span class="t-medium">{{ $t('account.main.phone') }}:</span><span>{{account.main.phone}}</span>
                <span class="t-medium">{{ $t('account.main.email') }}:</span><span>{{account.main.email}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="m-resp account__main-edit block-neat" v-else>
          <div class="container container-slim">
            <div class="grid grid-tablet g-2 gg-2">
              <div class="account__main-edit-grid grid grid-tablet g-2 gg-2">
                <div class="custom-input">
                  <input type="text" v-on="formEvents('account.main.name')" v-model="account.main.name">
                  <label class="custom-input-label" :class="checkFocus('account.main.name')">{{ $t('account.main.name') }}<span class="t-red">*</span></label>
                </div>
                <span></span>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('account.main.birthday')" v-model="account.main.birthday">
                  <label class="custom-input-label" :class="checkFocus('account.main.birthday')">{{ $t('account.main.birthday') }}</label>
                </div>
                <custom-select class="select-form wide" :style="{ 'z-index': 1 }" :selectData="sexData" @selectUpdated="account.main.sex = $event"/>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('account.main.phone')" v-model="account.main.phone">
                  <label class="custom-input-label" :class="checkFocus('account.main.phone')">{{ $t('account.main.phone') }}<span class="t-red">*</span></label>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('account.main.email')" v-model="account.main.email">
                  <label class="custom-input-label" :class="checkFocus('account.main.email')">{{ $t('account.main.email') }}</label>
                </div>
              </div>
              <div class="block-neat">
                <div class="comments__features-title">{{ $t('account.mailOptions.adsOptions') }}</div>
                <div class="comments__features-card block-neat">
                  <div class="custom-checkbox">
                    <label>
                      <input type="checkbox" v-model="account.mailOptions.emailAds">
                      <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendEmail') }}</span>
                    </label>
                  </div>
                  <div class="custom-checkbox">
                    <label>
                      <input type="checkbox" v-model="account.mailOptions.smsAds">
                      <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendSms') }}</span>
                    </label>
                  </div>
                </div>
                <div class="comments__features-title">{{ $t('account.mailOptions.billOptions') }}</div>
                <div class="comments__features-card block-neat">
                  <div class="custom-checkbox">
                    <label>
                      <input type="checkbox" v-model="account.mailOptions.emailBills">
                      <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendEmail') }}</span>
                    </label>
                  </div>
                  <div class="custom-checkbox">
                    <label>
                      <input type="checkbox" v-model="account.mailOptions.smsBills">
                      <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendSms') }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-orange-light m-auto" @click="editMode = false">{{ $t('buttons.save') }}</button>
        </div>
      </div>

      <div v-show="isActive('addresses')">
        <div class="container container-slim m-resp">
          <div class="grid grid-tablet g-2 gg-2">
            <div class="account__adresses-table table--slim">
              <div class="grid grid-mobile g-4 table__header table__row">
                <span></span>
                <span>{{ $t('account.addresses.name') }}</span>
                <span>{{ $t('account.addresses.fullAddress') }}</span>
                <button class="btn btn-outline-icon" @click="addAddress">
                  <font-awesome-icon icon="plus"/>
                  <span class="t-medium">{{ $t('buttons.add') }}</span>
                </button>
              </div>
              <accordion class="table__row-wrapper" :closeOnBlur="true"
                v-for="(address, i) in account.addresses" :key="address.id">
                <template #accordionTrigger>
                  <div class="grid grid-mobile g-3 table__row">
                    <div class="pin-wrapper">
                      <div class="pin">
                        <font-awesome-icon icon="location-pin"/>
                        <span class="pin-label pin-label--list">{{ i + 1 }}</span>
                      </div>
                    </div>
                    <span>{{ address.name }}</span>
                    <span>{{ address.fullAddress }}</span>
                  </div>
                </template>
                <template #accordionContent>
                  <div class="account__address grid gv-1">
                    <div class="grid grid-mobile g-2 gg-1">
                      <div class="custom-input">
                        <input type="text" v-on="formEvents('account.addresses[' + i + '].name')" v-model="address.name">
                        <label class="custom-input-label" :class="checkFocus('account.addresses[' + i + '].name')">{{ $t('account.addresses.name') }}<span class="t-red">*</span></label>
                      </div>
                      <div>
                        <div class="custom-checkbox">
                          <label>
                            <input type="checkbox" v-model="address.main">
                            <span class="custom-checkbox-label">{{ $t('account.addresses.markMain') }}</span>
                          </label>
                        </div>
                        <button class="btn btn-outline-icon" @click="() => removeAddress(i)">
                          <font-awesome-icon :icon="['far', 'trash-can']"/>
                          <span>{{ $t('buttons.delete') }}</span>
                        </button>
                      </div>
                    </div>
                    <div class="account__address-full">{{ address.fullAddress }}</div>
                    <div class="grid grid-mobile g-4 gg-1">
                      <div class="custom-input">
                        <input type="text" v-on="formEvents('account.addresses[' + i + '].apartment')" v-model="address.apartment">
                        <label class="custom-input-label" :class="checkFocus('account.addresses[' + i + '].apartment')">{{ $t('account.addresses.apartment') }}<span class="t-red">*</span></label>
                      </div>
                      <div class="custom-input">
                        <input type="text" v-on="formEvents('account.addresses[' + i + '].intercom')" v-model="address.intercom">
                        <label class="custom-input-label" :class="checkFocus('account.addresses[' + i + '].intercom')">{{ $t('account.addresses.intercom') }}</label>
                      </div>
                      <div class="custom-input">
                        <input type="text" v-on="formEvents('account.addresses[' + i + '].entrance')" v-model="address.entrance">
                        <label class="custom-input-label" :class="checkFocus('account.addresses[' + i + '].entrance')">{{ $t('account.addresses.entrance') }}</label>
                      </div>
                      <div class="custom-input">
                        <input type="text" v-on="formEvents('account.addresses[' + i + '].floor')" v-model="address.floor">
                        <label class="custom-input-label" :class="checkFocus('account.addresses[' + i + '].floor')">{{ $t('account.addresses.floor') }}</label>
                      </div>
                    </div>
                    <div class="custom-input">
                      <input type="text" v-on="formEvents('account.addresses[' + i + '].comment')" v-model="address.comment">
                      <label class="custom-input-label" :class="checkFocus('account.addresses[' + i + '].comment')">{{ $t('account.addresses.courierComment') }}</label>
                    </div>
                  </div>
                </template>
              </accordion>
            </div>
            <div>
              <div class="block-sticky--tablet">
                <yandex-map v-bind="mapSettings" ymap-class="order-history__map-content">
                  <ymap-marker v-for="(pin, i) in pins" :key="i" v-bind="pin" :marker-id="i" @click="mapSettings.coords = pin.coords"/>
                </yandex-map>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="isActive('orders')">
        <div class="container container-slim m-resp">
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
                v-for="(order, i) in account.orders" :key="i" :ref="'accordion-' + i">
                <template #accordionTrigger>
                  <div class="grid grid-mobile g-5 table__row"
                    @click.stop="getOrder(order.orderNum, i)">
                    <!-- delay accordion toggle until data has loaded -->
                    <span>{{ order.orderNum }}</span>
                    <span>{{ order.status }}</span>
                    <span>{{ order.restaurant }}</span>
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
                <div class="search-controls block-neat">
                  <div class="custom-input controls-query">
                    <input type="text" v-on="formEvents('searchParams.query')" v-model="searchParams.query">
                    <label class="custom-input-label" :class="checkFocus('searchParams.query')">{{ $t('orderHistory.searchParams.search') }}</label>
                  </div>
                  <custom-select class="select-form controls-status" :selectData="statusesData" @selectUpdated="searchParams.statuses = $event"/>
                  <datepicker v-model="searchParams.date"
                    range textInput multiCalendars multiCalendarsSolo autoApply
                    v-bind="datePickerOptions"/>
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
    </div>
  </div>
</template>

<script>
  import pin from '../assets/icons/location-pin.svg';
  import customSelect from '../forms/custom-select';
  import accordion from '../components/accordion';
  import productStripe from '../components/product-stripe';
  import VueSlider from 'vue-slider-component';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import _get from 'lodash/get';
  import db from '../../db.json'
  import axios from 'axios';
 
  export default {
    name: 'account',
    components: {
      'custom-select': customSelect,
      'product-stripe': productStripe,
      accordion,
      Datepicker,
      VueSlider,
    },
    data() {
      return {
        activeTab: 'main', // main/addresses/orders
        activeField: '',
        activeOrder: {
          orderNum: '',
          status: '',
          restaurant: '',
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
        editMode: false,
        account: {
          main: {},
          mailOptions: {},
          addresses: [],
        },
        sexOptions: [
          "m",
          "f"
        ],
        sexData: {
          code: 'sortData',
          title: this.$t('account.main.sex'),
          optionType: 'radio',
          options: [],
        },
        // map
        mapSettings: {
          coords: [ 59.92694994, 30.33902649 ],
          zoom: 12,
          controls: ['geolocationControl', 'searchControl', 'zoomControl'],
        },
        pins: [],
        // orders
        searchParams: {
          sort: '',
          query: '',
          statuses: [],
          date: null,
          orderSum: [0, 3000],
        },
        statusesOptions: [
          "new",
          "inProgress",
          "delivery"
        ],
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
        datePickerOptions: {
          format: 'dd.MM.yyyy - dd.MM.yyyy',
          enableTimePicker: false,
          // hideInputIcon: true,
        },
      }
    },
    methods: {
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
        this.editMode = false;
      },
      // map & addresses
      setPins() {
        this.account.addresses.forEach((el, i) => {
          this.pins.push({
            icon: {
              layout: 'default#imageWithContent',
              imageHref: pin,
              imageSize: [36, 36],
              imageOffset: [-18, -36],
              content: i + 1,
              contentOffset: [0, 4],
              contentLayout: '<span class="pin-label pin-label--map">$[properties.iconContent]</span>'
            },
            coords: el.coords,
          });
        });
      },
      // TODO: update labels on map pins
      // updatePins() {
      //   this.pins.forEach((pin, i) => pin.content = i + 1);
      // },
      removeAddress(i) {
        this.account.addresses.splice(i, 1);
        this.pins.splice(i, 1);
        // this.updatePins();
      },
      addAddress() {
        console.log(this.account.addresses.slice(-1));
        // let id = +this.account.addresses.slice(-1).id++;
        let id = 2;
        this.account.addresses.push({
          id: id,
          name: 'Новый адрес',
          fullAddress: '',
          apartment: '',
          intercom: '',
          entrance: '',
          floor: '',
          comment: '',
          main: false,
          coords: [ ]
        });
      },
      // orders
      getOrder(id, i) {
        let acc = 'accordion-' + i;

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
    },
    mounted() {
      if (process.env.NODE_ENV === 'production') {
        this.account = db.account;
        this.setPins();
      } else {
        axios.get(process.env.VUE_APP_API_BASE + 'account')
          .then(response => {
            this.account = response.data;
            this.setPins();
          });
      }

      this.sexData.options = this.sexOptions.map(el => ({
        code: el,
        name: this.$t('account.sexOptions.' + el),
        isChecked: this.account.main.sex == el,
      }));
      this.statusesData.options = this.statusesOptions.map(el => ({
        code: el,
        name: this.$t('orderHistory.statusesOptions.' + el),
      }));
    }
  }
</script>

<style lang="scss">
  .account {
    &__content .m-resp {
      margin-top: 2.4rem;
    }

    &__main {
      &-grid {
        grid-template-columns: 17rem auto;
        grid-gap: .8rem 4rem;
      }

      &-edit {
        background-color: $beige-medium;
        padding: 2rem 0;

        &-grid.grid.grid-tablet.g-2.gg-2 {
          row-gap: 1rem;
          align-self: flex-start;
        }
      }
    }

    &__adresses-table {
      .table__row {
        &.grid.grid-mobile.g-3 {
          grid-template-columns: 4rem 12rem auto;
        }

        &.grid.grid-mobile.g-4 {
          grid-template-columns: 4rem 12rem auto 11rem;
        }
      }
    }

    &__address {
      background-color: $beige-medium;
      border-radius: $radius-small;
      padding: 1rem 1.6rem;
    }

    &__orders-table {
      .table__row {
        &:not(.table__header) > span {
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
  }
</style>
