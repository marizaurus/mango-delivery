<template>
  <div class="cart-counter">
    <button class="btn btn-icon btn-orange-light cart-counter__btn-cart"
      v-show="counter < 1" @click="counter = 1">
      <font-awesome-icon icon="basket-shopping"/>
    </button>
    <div class="row" v-show="counter > 0" >
      <div class="btn-orange-light cart-counter__btn cart-counter__btn-minus" @click="counter--">
        <font-awesome-icon icon="minus"/>
      </div>
      <div class="cart-counter__value">{{ counter }}</div>
      <div class="btn-orange-light cart-counter__btn cart-counter__btn-plus" @click="counter++">
        <font-awesome-icon icon="plus"/>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: "cart-counter",
    data() {
      return {
        counter: 0,
      }
    }
  }
</script>

<style lang="scss">
  .cart-counter {
    font-weight: 500;
    text-align: center;
    border-radius: $radius-small;
    overflow: hidden;
    background-color: $white;

    .row {
      height: 3rem;
      align-items: stretch;
    }

    &__btn {
      color: $white;
      font-size: 1.8rem;
      line-height: 3rem;
      width: 2.2rem;
      cursor: pointer;
      transition: background .1s linear;

      &-cart {
        height: 100%;
        width: 8rem;
      }
    }

    &__value {
      font-size: 2rem;
      width: 3.6rem;
      border-top: 2px solid $orange-light;
      border-bottom: 2px solid $orange-light;
    }
  }
</style>