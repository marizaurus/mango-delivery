<template>
  <div class="product-input row" :class="{ 'invalid': invalid, 'active': active }">
    <font-awesome-icon icon="grip-lines" class="handle" v-if="showHandle"/>
    <div class="product-input-grid grid grid-mobile g-3">
      <div class="product-input-title t-medium">{{ itemData.title }}</div>
      <div class="product-input-tags">{{ itemData.tags.join(' · ') }}</div>
      <div class="product-input-price">{{ itemData.newPrice || itemData.price }} ₽</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product',
    props: {
      itemData: {
        title: String,
        tags: Array,
        price: Number,
        newPrice: Number,
      },
      showHandle: Boolean,
      invalid: Boolean,
      active: Boolean,
    },
  }
</script>

<style lang="scss">
  .product-input {
    padding: 1rem;
    background-color: $beige-medium;
    border-radius: $radius-small;
    flex-grow: 1;
    max-width: 470px;

    &.row > *:not(:last-child) {
      margin-right: .8rem;
    }

    &-grid.grid.grid-mobile.g-3 {
      align-items: baseline;
      flex-grow: 1;
      grid-template-columns: minmax(110px, 1fr) minmax(60px, 1fr) 60px;
    }

    &-title {
      @extend .t-cut;
    }

    &-tags {
      font-size: 1.2rem;
      color: $grey-dark;
      @extend .t-cut;
    }

    &-price {
      text-align: end;
      font-weight: 700;
    }

    &.invalid {
      opacity: 0.5;
      pointer-events: none;
    }

    &.active {
      background-color: $beige;
    }
  }
</style>