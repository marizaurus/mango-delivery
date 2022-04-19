<template>
  <div class="product-stripe grid grid-mobile g-3" :class="{ 'product-stripe--history': type == 'history' }">
    <div class="product-stripe__img-wrapper">
      <img class="product-stripe__img" :class="{ 'img-loaded': this.isLoaded }"
        :src="itemData.image" alt="product image" @load="onLoad">
    </div>
    <div class="product-stripe__info">
      <div class="product-stripe__info-name row" :class="{ 'product-stripe__info-name--combo' : itemData.stripeType == 'combo' }">
        <span>{{ itemData.title }}</span>
        <div class="product-stripe__info-rating row" v-if="itemData.stripeType != 'combo'">
          <font-awesome-icon icon="star"/>
          <div class="product-stripe__info-rating-value">{{ itemData.rating }}</div>
          <font-awesome-icon :icon="isFavorite ? ['fas', 'heart'] : ['far', 'heart']"
            class="product-stripe__favorite" @click="isFavorite = !isFavorite"/>
        </div>
      </div>
      <div class="product-stripe__info-tags">{{ itemData.stripeType == 'combo' ? itemData.items.join(' · ') : itemData.tags.join(' · ') }}</div>
    </div>
    <div class="product-stripe__controls row">
      <span class="product-stripe__units" v-if="type == 'history'">{{ counter }} {{ $t('units.piece') }} x {{ itemData.price }}₽</span>
      <div class="row" v-else>
        <cart-counter :number="counter" :type="'cart'" @counterUpdated="counter = $event"/>
        <span class="product-stripe__units--counter" v-show="counter > 0">x {{ itemData.price }}₽</span>
      </div>
      <div class="product-stripe__price">{{ counter * itemData.price }} ₽</div>
    </div>
  </div>
</template>

<script>
  import cartCounter from '@/components/cart-counter';

  export default {
    name: 'product-stripe',
    components: {
      'cart-counter': cartCounter,
    },
    data() {
      return {
        isLoaded: false,
        isFavorite: this.itemData.isFavorite,
        counter: this.itemData.number || 1,
      }
    },
    props: {
      itemData: {
        title: String,
        rating: Number,
        image: String,
        tags: Array,
        price: Number,
        number: Number,
        isFavorite: Boolean,
        stripeType: String,   // product/combo
        items: Array,         // items in combo
      },
      type: String,           // cart/history
    },
    methods: {
      onLoad() {
        this.isLoaded = true;
      },
    },
    watch: {
      'counter': function() {
        this.$emit("counterUpdated", this.counter);
      },
      'itemData.number': function() {
        this.counter = this.itemData.number;
      },
    }
  }
</script>

<style lang="scss">
  .product-stripe {
    padding: 1rem 1.2rem;
    border-radius: $radius-small;

    &:nth-child(even) {
      background-color: $white;
    }

    &.grid.grid-mobile.g-3 {
      grid-template-columns: auto 8rem 0;
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity .2s linear;

      &-wrapper {
        display: none;
        height: 5rem;
        width: 7rem;
        margin-right: 1.4rem;
        border-radius: $radius-small;
        background-image: url('~@/assets/images/placeholder-tiny.png');
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      &.img-loaded {
        opacity: 1;
      }
    }

    &__info {
      align-self: center;
      &-name {
        margin-bottom: .8rem;

        span {
          font-weight: 700;
          font-size: 2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 15rem;
        }

        &--combo span {
          width: 24rem;
        }
      }

      &-rating {
        color: $yellow;
        margin-left: .8rem;
        line-height: 2.4rem;
        align-self: flex-start;

        &-value {
          margin-left: .4rem;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .product-stripe__favorite {
          margin-left: 1rem;
          font-size: 2rem;
          color: $red;
          cursor: pointer;
        }
      }

      &-tags {
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 24rem;
      }
    }

    &__controls {
      flex-wrap: wrap;
      margin-top: -0.4rem;
      
      .cart-counter-wrapper,
      .product-stripe__price,
      .product-stripe__units {
        margin-top: .4rem;
      }
    }

    &__price {
      font-weight: 700;
      font-size: 2rem;
      margin-left: auto;
    }

    &__units--counter {
      margin-left: .8rem;
      margin-top: .4rem;
      display: none;
    }

    &--history.product-stripe {
      padding: .8rem 1.6rem;

      .product-stripe {
        &__info-rating {
          .product-stripe__favorite {
            display: none;
          }

        }
        &__price {
          font-size: 1.6rem;
        }
      }
    }
  }

  @include breakpoint(mobile) {
    .product-stripe {
      &.grid.grid-mobile.g-3 {
        grid-template-columns: min-content auto 8rem;
      }

      &__img-wrapper {
        display: block;
      }

      &__info-name {
        span {
          width: 17rem;
        }

        &--combo span {
          width: 26rem;
        }
      }
    }
  }

  @include breakpoint(tablet) {
    .product-stripe {
      padding: 1.2rem 2rem;

      &.grid.grid-mobile.g-3 {
        grid-template-columns: min-content auto 24rem;
      }

      &__controls {
        justify-content: space-between;
      }

      &--history.product-stripe {
        &.grid.grid-mobile.g-3 {
          grid-template-columns: min-content auto 17rem;
        }
      }

      &__units--counter {
        display: block;
      }
    }
  }
</style>