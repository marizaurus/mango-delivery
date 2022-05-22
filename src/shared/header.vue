<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="container">
        <div class="row" v-show="!searchOpen">
          <img :src="require('@/assets/images/logo.svg')" class="header__logo" alt="logo" @click="() => $router.push({ name: 'home' })"/>
          <button class="btn btn-round btn-orange-light m-none tablet mobile" @click="() => $router.push({ name: 'catalog' })">
            <font-awesome-icon icon="bars"/>
          </button>
          <button class="btn btn-primary btn-orange-light m-none laptop" @click="() => $router.push({ name: 'catalog' })">
            <font-awesome-icon icon="bars"/>
            <span>{{ $t('menu.catalog') }}</span>
          </button>
          <button class="btn btn-round btn-orange-light mobile" @click="() => toggleTarget('searchOpen', 'search')">
            <font-awesome-icon icon="magnifying-glass"/>
          </button>
          <div class="custom-input tablet laptop">
            <input type="text" class="t-cut" v-on="formEvents('search')" v-model="search">
            <label class="custom-input-label" :class="checkFocus('search')">{{ $t('menu.globalSearch') }}</label>
          </div>
          <custom-select class="select-form block tablet laptop" :selectData="addressesData" v-if="addressesData"/>
          <div class="ml-auto header__controls">
            <button class="btn btn-round btn-orange-light" @click="() => $router.push({ name: 'cart' })">
              <font-awesome-icon icon="basket-shopping"/>
            </button>
            <button class="btn btn-round btn-orange-light" @click="() => toggleTarget('menuOpen', 'menu')">
              <font-awesome-icon :icon="['far', 'user']"/>
            </button>
            <div class="menu" v-show="menuOpen" tabindex="1" @focusout="(e) => checkBlur(e, 'menuOpen')" ref="menu">
              <custom-select class="select-form block mobile" :selectData="addressesData" v-if="addressesData"/>
              <router-link :to="{ name: 'profile' }">{{ $t('menu.profile') }}</router-link>
              <router-link :to="{ name: 'addresses' }">{{ $t('menu.addresses') }}</router-link>
              <router-link :to="{ name: 'orders' }">{{ $t('menu.orders') }}</router-link>
              <router-link :to="{ name: 'favorites' }">{{ $t('menu.favorites') }}</router-link>
              <router-link :to="{ name: 'editor' }">{{ $t('menu.editor') }}</router-link>
              <router-link :to="{ name: 'restaurant' }">Ресторан</router-link>
              <router-link :to="{ name: 'product' }">Блюдо</router-link>
              <span>ВЫЙТИ</span>
            </div>
          </div>
        </div>
        <div class="mobile tablet" v-show="searchOpen" @focusout="(e) => checkBlur(e, 'searchOpen')" tabindex="1" ref="search">
          <div class="grid grid-mobile g-2 gg-1 header__search">
            <div class="custom-input slim mobile tablet">
              <input type="text" :placeholder="$t('menu.globalSearch')" v-model="search">
            </div>
            <button class="btn btn-icon btn-orange-light" @click="() => { $router.push({ name: 'catalog' }); searchOpen = false; }">
              <font-awesome-icon icon="magnifying-glass"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import customSelect from '@/forms/custom-select';
  
  import formHandler from '../mixins/formHandler';
  
  export default {
    name: "vHeader",
    components: {
      'custom-select': customSelect,
    },
    mixins: [ formHandler ],
    data() {
      return {
        activeField: null,
        menuOpen: false,
        addressesData: null,
        searchOpen: false,    // mobile search
        search: '',
      }
    },
    methods: {
      openRegister() {
        this.$emit('openRegister');
      },
      toggleTarget(targetOpen, targetRef) {
        this[targetOpen] = !this[targetOpen];
        this.$nextTick(() => {
          this.$refs[targetRef].focus();
        });
      },
      checkBlur(e, targetOpen) {
        // prevent blur when a child is focused, blur otherwise
        if (!e.currentTarget.contains(e.relatedTarget)) {
          this[targetOpen] = false;
        }
      },
      getAddressesData() {
        return {
          code: 'addressesData',
          title: this.$t('menu.deliveryAddress'),
          optionType: 'radio',
          // icon: 'location-dot',
          // iconType: 'fas',
          options: this.addresses.map(el => ({ code: 'address-' + el.id, name: el.name })),
        }
      },
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.account.getAddresses();
        this.addresses = res.data || res;

        this.addressesData = this.getAddressesData();
      });
    }
  }
</script>

<style lang="scss">
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;

    &__wrapper {
      background-color: $beige;
      padding: 1.2rem 0;
      min-width: 390px;
      position: relative;
    }

    &__logo {
      height: 45px;
      cursor: pointer;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &__catalog {
      span {
        display: none;
      }
    }

    &__search.grid.grid-mobile.g-2 {
      grid-template-columns: auto 4.8rem;
    }

    &__banner {
      background-color: $beige-medium;
      padding: 1.2rem 0;

      &-row {
        position: relative;
      }

      &-close {
        position: absolute;
        right: 0;
        top: 0;
        margin: 0;
        padding: 0;
        width: auto;
        line-height: 1;
      }
    }

    .row > *:not(:last-child),
    &__controls > button:not(:last-of-type) {
      margin-right: 1rem;
    }

    &__controls {
      position: relative;

      .menu {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(calc(100% + 12px));
        background-color: $beige-medium;
        border-radius: $radius-medium;
        padding: 1.6rem 2rem;
        width: 25rem;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        z-index: 100;

        & > *:not(:last-child) {
          margin-bottom: 1.2rem;
        }
      }
    }
  }

  @include breakpoint(mobile) {
    .header {
      &__wrapper {
        padding: 1rem 0;
      }

      &__logo {
        height: 60px;
        position: static;
        transform: none;
      }

      .row > *:not(:last-child),
      &__controls > button:not(:last-of-type) {
        margin-right: 2rem;
      }

      &__controls {
        .menu {
          transform: translateY(calc(100% + 16px));
        }
      }
    }
  }

  @include breakpoint(tablet) {
    .header {
      &__catalog.btn-round {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.2rem 2rem;
        margin: 1.5rem 0;
        font-weight: 700;
        font-size: 1.8rem;
        line-height: 1.2;
        border-radius: $radius-medium;
        width: unset;
        height: unset;

        svg {
          font-size: 2rem;
          margin-right: 8px;
        }

        span {
          display: block;
        }
      }
    }
  }
</style>