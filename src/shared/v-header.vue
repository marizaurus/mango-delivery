<template>
  <div class="v-header">
    <div class="v-header__wrapper">
      <div class="container row">
        <img :src="require('@/assets/images/logo.svg')" class="v-header__logo" />
        <router-link :to="{ name: 'home' }">Главная</router-link>
        <router-link :to="{ name: 'cart' }">Корзина</router-link>
      </div>
    </div>
<!--    <div class="v-header__banner">-->
<!--      <div class="v-header__banner-row text-center">-->
<!--        <i class="bi bi-x v-header__banner-close"></i>-->
<!--        <span>Test message</span>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "v-header"
}
</script>

<style lang="scss">
  .v-header {
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