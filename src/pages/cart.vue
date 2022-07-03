<template>
  <div class="cart m-resp">
    <div class="container container-slim block-neat">
      <h1 class="cart-title">{{ $t('cart.title') }}</h1>
      <div class="tabs">
        <button class="btn btn-tab tab" :class="{ 'active': isActive('cartItems'), 'invalid': !validTabs.includes('cartItems') }"
          @click="setActive('cartItems')">{{ $t('cart.tabs.cartItems') }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('orderData'), 'invalid': !validTabs.includes('orderData') }"
          @click="setActive('orderData')">{{ $t('cart.tabs.orderData') }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('tableBooking'), 'invalid': !validTabs.includes('tableBooking') }"
          @click="setActive('tableBooking')" v-show="orderData.deliveryType == 'booking'">{{ $t('cart.tabs.tableBooking') }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('orderConfirm'), 'invalid': !validTabs.includes('orderConfirm') }"
          @click="setActive('orderConfirm')">{{ $t('cart.tabs.orderConfirm') }}</button>
      </div>
    </div>

    <div class="container container-slim m-resp tab__content" v-show="isActive('cartItems')">
      <div class="grid grid-laptop g-7-3 gg-2">
        <div class="cart__items block-neat">
          <accordion class="cart-section" v-for="cartItem in cart" :key="cartItem.id" :initialVisible="initialVisible">
            <template #accordionTrigger>
              <div class="cart-section__header row">
                <h3 class="cart-section__header-title">{{ cartItem.title }}</h3>
                <div class="cart-section__header-items">{{ $t('cart.items') }} {{ cartItem.items.length }}</div>
                <div class="cart-section__header-total">{{ $t('cart.total') }} {{ getTotal(cartItem.id) }} ₽</div>
              </div>
            </template>
            <template #accordionContent>
              <div class="cart-section__items accordion">
                <product-stripe v-for="item in cartItem.items" :key="item.id"
                  :itemData="item" @counterUpdated="($event) => counterUpdated($event, cartItem.id, item.id)"/>
              </div>
            </template>
          </accordion>
        </div>

        <div>
          <div class="block-sticky--laptop block-neat">
            <div class="cart__tab block-neat">
              <h3 class="cart__tab-title">{{ $t('cart.tab-title') }}</h3>
              <div class="row" v-for="cartItem in cart" :key="cartItem.id">
                <div class="form-title">{{ cartItem.title }}</div>
                <div class="form-title ml-auto">{{ getTotal(cartItem.id) }} ₽</div>
              </div>
              <!-- <datepicker v-model="searchParams.date" timePicker/> -->
              <!-- https://vue3datepicker.com/api/props/#modeheight -->
              <div class="row">
                <h3 class="cart__tab-total">{{ $t('cart.total') }}</h3>
                <h3 class="cart__tab-total ml-auto">{{ cart.map(el => getTotal(el.id)).reduce((el, sum) => sum + el, 0) }} ₽</h3>
              </div>
              <h3>{{ $t('cart.code') }}</h3>
              <div class="grid grid-mobile g-2 gg-1 cart__tab-code">
                <div class="custom-input slim">
                  <input type="text" :placeholder="$t('cart.promoCode')" v-model="orderData.promocode">
                </div>
                <!-- TODO: promocode functionality -->
                <button class="btn btn-icon btn-orange-light">
                  <font-awesome-icon icon="check"/>
                </button>
              </div>
            </div>
            <button class="btn btn-primary btn-orange-light m-auto" @click="() => nextStep('orderData', 'btn1')" ref="btn1">
              <span>{{ $t('buttons.nextStep') }}</span>
              <font-awesome-icon icon="angle-right"/>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="m-resp form block-neat tab__content" v-show="isActive('orderData')">
      <div class="container container-slim">
        <div class="grid gv-1">
          <div class="form-title">{{ $t('cart.clientData') }}</div>
          <div class="grid grid-tablet g-2 gg-2 gv-1">
            <div class="grid gv-1 grid-start">
              <div class="grid grid-mobile--wide g-2 gg-1 gv-1" v-if="orderData.profile">
                <div class="custom-input">
                  <input type="text" v-on="formEvents('orderData.profile.name')" v-model="orderData.profile.name">
                  <label class="custom-input-label" :class="checkFocus('orderData.profile.name')">{{ $t('account.main.name') }}<span class="t-red">*</span></label>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('orderData.profile.phone')" v-model="orderData.profile.phone">
                  <label class="custom-input-label" :class="checkFocus('orderData.profile.phone')">{{ $t('account.main.phone') }}<span class="t-red">*</span></label>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('orderData.profile.email')" v-model="orderData.profile.email">
                  <label class="custom-input-label" :class="checkFocus('orderData.profile.email')">{{ $t('account.main.email') }}</label>
                </div>
                <custom-select class="select-form wide" :selectData="deliveryData" v-if="deliveryData" @selectUpdated="orderData.deliveryType = $event" :style="{ 'z-index': 5 }"/>
              </div>

              <div class="grid gv-1" v-show="orderData.deliveryType == 'delivery'" v-if="orderData.address">
                <div class="form-title">{{ $t('cart.deliveryAddress') }}</div>
                <div class="grid grid-tablet g-2 gg-1">
                  <custom-select class="select-form wide" :selectData="addressesData" v-if="addressesData" @selectUpdated="(e) => setAddress(e)" :style="{ 'z-index': 4 }"/>
                </div>
                <div class="account__address-full">{{ orderData.address.fullAddress }}</div>
                <div class="grid grid-mobile g-2 gg-1 account__address-fields">
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('orderData.address.apartment')" v-model="orderData.address.apartment">
                    <label class="custom-input-label" :class="checkFocus('orderData.address.apartment')">{{ $t('account.addresses.apartment') }}<span class="t-red">*</span></label>
                  </div>
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('orderData.address.intercom')" v-model="orderData.address.intercom">
                    <label class="custom-input-label" :class="checkFocus('orderData.address.intercom')">{{ $t('account.addresses.intercom') }}</label>
                  </div>
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('orderData.address.entrance')" v-model="orderData.address.entrance">
                    <label class="custom-input-label" :class="checkFocus('orderData.address.entrance')">{{ $t('account.addresses.entrance') }}</label>
                  </div>
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('orderData.address.floor')" v-model="orderData.address.floor">
                    <label class="custom-input-label" :class="checkFocus('orderData.address.floor')">{{ $t('account.addresses.floor') }}</label>
                  </div>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('orderData.address.comment')" v-model="orderData.address.comment">
                  <label class="custom-input-label" :class="checkFocus('orderData.address.comment')">{{ $t('account.addresses.courierComment') }}</label>
                </div>
              </div>

              <div class="form-title">{{ $t('cart.paymentData') }}</div>
              <div class="grid grid-mobile--wide g-2 gg-1 gv-1">
                <custom-select class="select-form wide" :selectData="paymentData" v-if="paymentData" @selectUpdated="orderData.paymentType = $event" :style="{ 'z-index': 3 }"/>
                <custom-select class="select-form wide" :selectData="cashData" v-if="cashData" @selectUpdated="orderData.cashType = $event" v-show="orderData.paymentType == 'cash'" :style="{ 'z-index': 2 }"/>
                <div class="custom-input custom-input--money" v-show="orderData.cashType == 'withChange'">
                  <input type="text" v-on="formEvents('orderData.cashSum')" v-model="orderData.cashSum">
                  <label class="custom-input-label" :class="checkFocus('orderData.cashSum')">{{ $t('cashOptions.yourSum') }}<span class="t-red">*</span></label>
                </div>
              </div>
            </div>
            
            <div v-if="orderData.profile">
              <div class="block-sticky--tablet form-card block-neat grid gv-1">
                <div class="form-title">{{ $t('cart.tab-title') }}</div>
                <div class="custom-checkbox">
                  <label>
                    <input type="checkbox" v-model="orderData.profile.mailOptions.emailAds">
                    <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendEmail') }}</span>
                  </label>
                </div>
                <div class="custom-checkbox">
                  <label>
                    <input type="checkbox" v-model="orderData.profile.mailOptions.smsAds">
                    <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendSms') }}</span>
                  </label>
                </div>
                <div class="custom-checkbox">
                  <label>
                    <input type="checkbox" v-model="orderData.profile.mailOptions.operatorCall">
                    <span class="custom-checkbox-label">{{ $t('account.mailOptions.operatorCall') }}</span>
                  </label>
                </div>
                <span class="t-small">{{ $t('cart.deliveryOptionsNotice') }}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-orange-light m-auto m-none" @click="() => nextStep(orderData.deliveryType == 'booking' ? 'tableBooking' : 'orderConfirm', 'btn2')" ref="btn2">
            <span>{{ $t('buttons.nextStep') }}</span>
            <font-awesome-icon icon="angle-right"/>
          </button>
        </div>
      </div>
    </div>

    <div class="m-resp form block-neat tab__content" v-show="isActive('tableBooking')" v-if="bookingData">
      <div class="container container-slim">
        <div class="grid gv-1">
          <div class="form-title">{{ $t('booking.clientsData') }}</div>
          <div class="grid grid-tablet g-2 gg-2">
            <div class="grid gv-1 grid-start">
              <div class="grid gv-1 grid-start">
                <div class="grid grid-mobile g-2 gg-1 gv-1">
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('orderData.booking.visitorsNum')" v-model="orderData.booking.visitorsNum">
                    <label class="custom-input-label" :class="checkFocus('orderData.booking.visitorsNum')">{{ $t('booking.visitorsNum') }}<span class="t-red">*</span></label>
                  </div>
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('orderData.booking.cutleryNum')" v-model="orderData.booking.cutleryNum">
                    <label class="custom-input-label" :class="checkFocus('orderData.booking.cutleryNum')">{{ $t('booking.cutleryNum') }}</label>
                  </div>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('orderData.booking.restaurantComment')" v-model="orderData.booking.restaurantComment">
                  <label class="custom-input-label" :class="checkFocus('orderData.booking.restaurantComment')">{{ $t('booking.restaurantComment') }}</label>
                </div>
              </div>

              <div class="form-title">{{ $t('booking.visitData') }}</div>
              <div class="grid grid-mobile g-2 gg-1 gv-1">
                <datepicker v-model="orderData.booking.visitDateTime" :format-locale="language" textInput autoApply v-bind="datePickerOptions">
                  <!-- eslint-disable-next-line vue/no-unused-vars -->
                  <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
                    <div class="custom-input m-none">
                      <input type="text" :value="value">
                      <label class="custom-input-label" :class="{ 'non-empty': value }">{{ $t('booking.visitDateTime') }}<span class="t-red">*</span></label>
                    </div>
                  </template>
                </datepicker>
                <custom-select class="select-form wide" :selectData="visitDurationData" v-if="visitDurationData" @selectUpdated="orderData.visitDuration = $event" :style="{ 'z-index': 3 }"/>
              </div>

              <div class="form-title">{{ $t('booking.preferences') }}</div>
              <div class="grid grid-tablet g-2 gg-2">
                <custom-select class="select-form wide" :selectData="preferenceData" v-if="preferenceData" @selectUpdated="orderData.booking.preference = $event"/>
              </div>
            </div>

            <div>
              <div class="preference-notice">{{ bookingData.clientNotice }}</div>
              <div class="form-title preference-title">{{ bookingData.preferenceTitle }}</div>
              <flickity ref="flickity" :options="options" class="flickity-slider--image" v-if="isActive('tableBooking')">
                <div class="carousel-cell" v-for="item in bookingData.preferenceOptions" :key="item.id">
                  <div class="preference-item">
                    <div class="preference-item-image-wrapper">
                      <img class="img preference-item-image" :class="{ 'img-loaded': item.isLoaded }" :src="item.image" alt="preference image" @load="() => onLoad(item)">
                    </div>
                    <div class="preference-item-name">{{ item.name }}</div>
                  </div>
                </div>
              </flickity>
            </div>
          </div>

          <button class="btn btn-primary btn-orange-light m-auto m-none" @click="() => nextStep('orderConfirm', 'btn3')" ref="btn3">
            <span>{{ $t('buttons.nextStep') }}</span>
            <font-awesome-icon icon="angle-right"/>
          </button>
        </div>
      </div>
    </div>

    <div class="m-resp block-neat tab__content" v-show="isActive('orderConfirm')">
      <div class="container container-slim">
        <!-- TODO: generate orderNum -->
        <h2>{{ $t('cart.orderAccepted', { 'orderNum': '0052' }) }}</h2>
        <p>{{ $t('cart.orderThankYou') }}</p>
        <p>
          <span>{{ $t('cart.trackOrderInAccount') }}</span>
          <router-link :to="{ name: 'orders' }">{{ $t('cart.accountLink') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import accordion from '@/components/accordion.vue';
  import productStripe from '@/components/product-stripe.vue';
  import customSelect from '@/forms/custom-select.vue';
  import Flickity from 'vue-flickity';
  import Datepicker from '@vuepic/vue-datepicker';
  import { ru } from 'date-fns/locale'

  import tabHandler from '@/mixins/tabHandler';
  import formHandler from '@/mixins/formHandler';

  export default {
    name: "cart",
    components: {
      "product-stripe": productStripe,
      "accordion": accordion,
      "custom-select": customSelect,
      Datepicker,
      Flickity,
    },
    mixins: [ tabHandler, formHandler ],
    data() {
      return {
        activeTab: 'cartItems',
        initialVisible: true,
        cart: [{ items: [] }],
        orderData: {      // data to send
          promocode: null,
          profile: null,
          deliveryType: 'delivery',
          address: null,
          paymentType: null,
          cashType: null,
          cashSum: null,
          booking: {
            visitorsNum: null,
            cutleryNum: null,
            restaurantComment: null,
            visitDateTime: null,
            visitDuration: null,
            preference: null,
          }
        },
        validTabs: [ 'cartItems' ],
        deliveryData: null,
        deliveryOptions: [ 'delivery', 'pickup', 'booking' ],
        addresses: null,
        addressesData: null,
        paymentData: null,
        paymentOptions: [ 'online', 'cash' ],
        cashData: null,
        cashOptions: [ 'precise', 'withChange', 'notSure' ],
        bookingData: null,
        visitDurationData: null,
        preferenceData: null,
        language: ru,
        datePickerOptions: {
          format: 'dd MMMM yyyy HH:mm',
          closeOnAutoApply: false,
          locale: 'ru',
          minutesIncrement: 30,
          minutesGridIncrement: 30,
          position: 'left',
          minTime: { hours: 9, minutes: 0 },  // restaurant open hours
          maxTime: { hours: 20, minutes: 0 },
          startTime: { hours: 9, minutes: 0 },
        },
        options: {
          wrapAround: true,
          accessibility: false,
          cellAlign: 'left',
          groupCells: false,
          draggable: true,
          setGallerySize: false,
          imagesLoaded: true,
        }
      }
    },
    methods: {
      getTotal(i) {
        return this.cart.find(el => el.id == i).items.map(el => el.number * el.price).reduce((el, sum) => sum + el, 0);
      },
      // i cry
      counterUpdated($event, i, j) {
        let cartItem = this.cart.find(el => el.id == i);
        let cartIndex = this.cart.indexOf(cartItem);
        let itemIndex = cartItem.items.indexOf(cartItem.items.find(el => el.id == j));

        if ($event == 0) {
          this.cart[cartIndex].items.splice(itemIndex, 1);

          if (this.cart[cartIndex].items.length == 0)
            this.cart.splice(cartIndex, 1);
          return;
        }
        this.cart[cartIndex].items[itemIndex].number = $event;
      },
      async nextStep(step, btnRef) {
        this.$refs[btnRef].classList.add('invalid');
        switch(step) {
          case 'orderData':
            this.$load(async () => {
              if (!this.orderData.profile) {
                let res = await this.$api.account.getProfile();
                this.orderData.profile = res.data || res;
                this.deliveryData = this.getDeliveryData();

                res = await this.$api.account.getAddresses();
                this.addresses = res.data || res;
                this.addressesData = this.getAddressesData();
                this.orderData.address = this.addresses[0];

                this.paymentData = this.getPaymentData();
                this.cashData = this.getCashData();
              }
            }).then(() => {
              if (!this.validTabs.includes(step)) this.validTabs.push(step);
              this.activeTab = step;
              this.$refs[btnRef].classList.remove('invalid');
            });
            break;
          case 'tableBooking':
            this.$load(async () => {
              if (!this.bookingData) {
                let res = await this.$api.cart.getBookingData();
                this.bookingData = res.data || res;

                this.visitDurationData = this.getVisitDurationData();
                this.preferenceData = this.getPreferencesData();
              }
            }).then(() => {
              if (!this.validTabs.includes(step)) this.validTabs.push(step);
              this.activeTab = step;
              this.$refs[btnRef].classList.remove('invalid');
              this.$nextTick(() => {
                // don't breathe, this might've fixed it
                this.$refs.flickity.resize();
              })
            });
            break;
          case 'orderConfirm':
            this.validTabs = [];
            // order processing imitation
            setTimeout(() => {
              this.validTabs.push('orderConfirm');
              this.activeTab = step;
              this.$refs[btnRef].classList.remove('invalid');
            }, 1000);
        }
      },
      getDeliveryData() {
        return {
          code: 'deliveryData',
          title: this.$t('deliveryOptions.deliveryType'),
          optionType: 'radio',
          options: this.deliveryOptions.map(el => ({ code: el, name: this.$t('deliveryOptions.' + el) })),
        }
      },
      getAddressesData() {
        return {
          code: 'addressesData',
          title: this.$t('menu.deliveryAddress'),
          optionType: 'radio',
          options: this.addresses.map(el => ({ code: 'address-' + el.id, name: el.name })),
        }
      },
      setAddress(e) {
        this.orderData.address = this.addresses.find((el) => el.id == e.split('-')[1]);
      },
      getPaymentData() {
        return {
          code: 'paymentData',
          title: this.$t('paymentOptions.paymentType'),
          optionType: 'radio',
          options: this.paymentOptions.map(el => ({ code: el, name: this.$t('paymentOptions.' + el) })),
        }
      },
      getCashData() {
        return {
          code: 'cashData',
          title: this.$t('cashOptions.cashType'),
          optionType: 'radio',
          options: this.cashOptions.map(el => ({ code: el, name: this.$t('cashOptions.' + el) })),
        }
      },
      getVisitDurationData() {
        return {
          code: 'visitDurationData',
          title: this.$t('booking.visitDuration'),
          optionType: 'radio',
          options: this.bookingData.bookingDurationOptions.map(el => ({ code: 'duration-' + el.id, name: el.name })),
        }
      },
      getPreferencesData() {
        return {
          code: 'preferencesData',
          title: this.bookingData.preferenceOptionsTitle,
          optionType: 'radio',
          options: this.bookingData.preferenceOptions.map(el => ({ code: 'preference-' + el.id, name: el.name })),
        }
      },
      onLoad(item) {
        item.isLoaded = true;
      }
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.cart.getCart();
        this.cart = res.data || res;
        this.cart.forEach(el => el.items.forEach(i => i.number = i.number || 1));
      });
    }
  }
</script>

<style lang="scss">
  .cart {
    &.row {
      flex-direction: column;
    }

    &__tab {
      background-color: $beige-medium;
      padding: 1.6rem 2rem;
      border-radius: $radius-medium;
      box-sizing: border-box;
      align-self: flex-start;

      &-code.grid.grid-mobile.g-2 {
        grid-template-columns: auto 4.8rem;
      }

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

    .preference {
      &-notice {
        margin-bottom: 3.2rem;
      }

      &-title {
        margin-bottom: 1rem;
      }

      &-item {
        &-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity .2s linear;

          &-wrapper {
            max-width: 18rem;
            width: 100%;
            height: 12rem;
            border-radius: $radius-small;
            background-image: url('~@/assets/images/placeholder-small.png');
            background-size: cover;
            background-position: center;
            overflow: hidden;
          }

          &.img-loaded {
            opacity: 1;
          }
        }

        &-name {
          font-size: 1.4rem;
          margin-top: .8rem;
          text-align: center;
        }
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