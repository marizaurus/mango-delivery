<template>
  <div class="v-cart-counter row">
    <div class="v-cart-counter__btn v-cart-counter__btn-minus">–</div>
    <div class="v-cart-counter__value">1</div>
    <div class="v-cart-counter__btn v-cart-counter__btn-plus">+</div>
  </div>
</template>

<script>
  export default {
    name: "v-cart-counter"
  }
</script>

<style lang="scss">
  .v-cart-counter {
    border-top: 2px solid $beige;
    border-bottom: 2px solid $beige;
    border-radius: 2px;
    box-sizing: border-box;
    height: 30px;
    font-weight: 500;
    text-align: center;

    &__btn {
      color: $white;
      font-size: 2.4rem;
      background-color: $beige;
      width: 2.2rem;
      cursor: pointer;
    }

    &__value {
      font-size: 2rem;
      width: 3.6rem;
    }
  }
</style>