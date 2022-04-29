<template>
  <div class="cart-counter-wrapper">
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
    <!-- <font-awesome-icon :icon="['far', 'trash-can']" class="cart-counter__trash"
      v-show="counter < 1 && type == 'cart'"/> -->
  </div>
</template>

<script>
  export default {
    name: "cart-counter",
    data() {
      return {
        counter: this.number || 0,
      }
    },
    props: {
      number: Number,
      type: String,
    },
    watch: {
      'counter': function() {
        this.$emit("counterUpdated", this.counter);
      },
      'number': function() {
        this.counter = this.number;
      },
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

    &-wrapper {
      position: relative;
    }

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

    &__trash {
      position: absolute;
      right: -3.2rem;
      font-size: 2rem;
      color: $grey;
      top: 50%;
      transform: translateY(-50%);
      display: none;
    }
  }

  @include breakpoint(tablet) {
    .cart-counter {
      &__trash {
        display: block;
      }
    }
  }
</style>