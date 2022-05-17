<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="container">
        <div class="row">
          <img :src="require('@/assets/images/logo.svg')" class="header__logo" alt="logo" @click="() => $router.push({ name: 'home' })"/>
          <button class="btn btn-round btn-orange-light m-none header__catalog" @click="() => $router.push({ name: 'catalog' })">
            <font-awesome-icon icon="bars"/>
            <span>{{ $t('menu.catalog') }}</span>
          </button>
          <div class="ml-auto header__controls">
            <button class="btn btn-round btn-orange-light" @click="() => $router.push({ name: 'cart' })">
              <font-awesome-icon icon="basket-shopping"/>
            </button>
            <button class="btn btn-round btn-orange-light" @click="toggleMenu" ref="accBtn">
              <font-awesome-icon :icon="['far', 'user']"/>
            </button>
            <div class="menu" v-show="menuOpen" tabindex="1" @focusout="checkBlur" ref="menu">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vHeader",
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    openRegister() {
      this.$emit('openRegister');
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      this.$nextTick(() => {
        this.$refs.menu.focus();
      });
    },
    checkBlur(e) {
      // prevent blur when a child is focused, blur otherwise
      if (!e.currentTarget.contains(e.relatedTarget)) {
        this.menuOpen = false;
      }
    }
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
      padding: 1.4rem 0;
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
      margin-right: 1.6rem;
    }

    &__controls {
      position: relative;

      .menu {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(calc(100% + 14px));
        background-color: $beige-medium;
        border-radius: $radius-medium;
        padding: 1.6rem 2rem;
        width: 25rem;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        z-index: 100;

        a:not(:last-child) {
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

      &__catalog {
        display: block;
      }

      .row > *:not(:last-child),
      &__controls > button:not(:last-of-type) {
        margin-right: 2.4rem;
      }

      &__controls {
        .menu {
          transform: translateY(calc(100% + 16px));
        }
      }
    }
  }
</style>