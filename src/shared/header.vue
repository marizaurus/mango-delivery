<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="container row">
        <img :src="require('@/assets/images/logo.svg')" class="header__logo" />
        <router-link :to="{ name: 'home' }">Главная</router-link>
        <router-link :to="{ name: 'cart' }">Корзина</router-link>
      </div>
    </div>
<!--    <div class="header__banner">-->
<!--      <div class="header__banner-row text-center">-->
<!--        <i class="bi bi-x header__banner-close"></i>-->
<!--        <span>Test message</span>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style lang="scss">
  .header {
    &__wrapper {
      background-color: $beige;
      padding: 1rem 0;
    }

    &__logo {
      height: 60px;
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
  }
</style>