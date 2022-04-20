<template>
  <div class="account">
    <div class="container container-slim m-resp">
      <h1 class="account__title">{{ $t('account.title') }}</h1>
      <div class="grid grid-tablet gg-2">
        <div class="row order-history__tabs">
          <div class="order-history__tabs-btns">
            <button class="btn btn-tab" :class="{ 'active': isActive('account') }"
              @click="setActive('account')">{{ $t('account.tabs.account') }}</button>
            <button class="btn btn-tab" :class="{ 'active': isActive('adresses') }"
              @click="setActive('adresses')">{{ $t('account.tabs.adresses') }}</button>
            <button class="btn btn-tab" :class="{ 'active': isActive('orders') }"
              @click="setActive('orders')">{{ $t('account.tabs.orders') }}</button>
          </div>
        </div>

        <div class="order-history__content">
          <div v-show="isActive('account')">Account</div>
          <div v-show="isActive('adresses')">Adresses</div>
          <div v-show="isActive('orders')">Orders</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _get from 'lodash/get';
 
  export default {
    name: 'account',
    data() {
      return {
        activeTab: 'account', // account/adresses/orders
        activeField: '',
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
      },
    }
  }
</script>