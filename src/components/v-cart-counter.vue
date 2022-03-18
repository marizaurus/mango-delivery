<template>
  <button class="btn btn-icon btn-orange-light v-cart-counter__btn-cart d-none">
    <font-awesome-icon icon="shopping-basket"/>
  </button>
  <div class="v-cart-counter row">
    <div class="btn-orange-light v-cart-counter__btn v-cart-counter__btn-minus">–</div>
    <div class="v-cart-counter__value">1</div>
    <div class="btn-orange-light v-cart-counter__btn v-cart-counter__btn-plus">+</div>
  </div>
</template>

<script>
  export default {
    name: "v-cart-counter"
  }
</script>

<style lang="scss">
  .v-cart-counter {
    border-top: 2px solid $orange-light;
    border-bottom: 2px solid $orange-light;
    border-radius: 2px;
    box-sizing: border-box;
    height: 3rem;
    font-weight: 500;
    text-align: center;

    &__btn {
      color: $white;
      font-size: 2.4rem;
      width: 2.2rem;
      cursor: pointer;

      &-cart {
        height: 3rem;
        width: 7.5rem;
        margin: 0 !important;
      }
    }

    &__value {
      font-size: 2rem;
      width: 3.6rem;
    }
  }
</style>