<template>
  <div class="v-header">
    <div class="v-header__wrapper">
      <div class="container">
        <div class="row">
          <img :src="require('@/assets/images/logo.svg')" class="v-header__logo" alt="logo"/>
          <div class="temp-links">
            <router-link :to="{ name: 'home' }">Главная</router-link>
            <router-link :to="{ name: 'cart' }">Корзина</router-link>
            <router-link :to="{ name: 'restaurant' }">Ресторан</router-link>
            <router-link :to="{ name: 'product' }">Блюдо</router-link>
            <!-- <router-link :to="{ name: 'page-editor' }">Редактор</router-link> -->
            <router-link :to="{ name: 'order-history' }">История</router-link>
            <router-link :to="{ name: 'catalog' }">Каталог</router-link>
          </div>
        </div>
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
  name: "vHeader"
}
</script>

<style lang="scss">
  .v-header {
    &__wrapper {
      background-color: $beige;
      padding: 1rem 0;
      min-width: 390px;
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

  .temp-links {
    margin-top: -5px;

    a {
      margin-left: 2.5rem;
      display: inline-block;
      margin-top: 5px;
    }
  }
</style>