<template>
  <div class="recipe block-slim grid grid-laptop g-7-3 gg-2 m-resp"
    :style="{ gridTemplateRows: assetsHeight }">
    <div class="recipe-info block-neat">
      <h2 class="recipe-info__title laptop">{{ blockData.title }}</h2>
      <div class="recipe-step row"
        v-for="(step, index) in getSteps()"
        :key="index">
        <div class="recipe-step__number">{{ zeroPad(index + 1, 2) }}</div>
        <div class="recipe-step__description">{{ step }}</div>
      </div>
      <accordion
        :initialVisible="visible"
        v-if="blockData.steps.length > limit">
        <template #accordionContent>
          <div class="recipe-step row"
            v-for="(step, index) in blockData.steps.slice(limit)"
            :key="index"
            ref="steps">
            <div class="recipe-step__number">{{ zeroPad(index + limit + 1, 2) }}</div>
            <div class="recipe-step__description">{{ step }}</div>
          </div>
        </template>
        <template #accordionTrigger="accProps">
          <button ref="collapseBtn" class="recipe-info__btn btn btn-outline">{{ btnValue(accProps.visible) }}</button>
        </template>
      </accordion>
    </div>

    <div class="recipe-assets block-neat" ref="assets">
      <h2 class="recipe-assets__title mobile">{{ blockData.title }}</h2>
      <div class="recipe-ingredients block-neat">
        <h3 class="recipe-ingredients__title">{{ $t('blocks.ingredients') }}</h3>
        <div class="recipe-ingredient row"
          v-for="ingredient in blockData.ingredients"
          :key="ingredient.id">
          <div>{{ ingredient.name }}</div>
          <div class="recipe-ingredient__amount">{{ ingredient.amount }}</div>
        </div>
      </div>
    </div>

    <div class="recipe-offer block-neat">
      <h3 class="recipe-offer__title">{{ $t('blocks.tryChef') }}</h3>
      <product-card :itemData="blockData.item" class="m-auto"/>
    </div>
  </div>
</template>

<script>
  import productCard from '@/components/product-card';
  import accordion from '@/components/accordion';

  export default {
    name: "recipe",
    components: {
      'product-card': productCard,
      accordion,
    },
    data() {
      return {
        limit: this.isMobile() ? 3 : 5,
        visible: false,
        assetsHeight: null,
      }
    },
    props: {
      blockData: {
        title: String,
        steps: Array,
        ingredients: Array,
        item: Object
      }
    },
    methods: {
      // add fancy zeros
      zeroPad(num, places) {
        return String(num).padStart(places, '0');
      },
      btnValue(visible) {
        return visible ? this.$t('buttons.readLess') : this.$t('buttons.readMore');
      },
      isMobile() {
        //nextTick() - waits for the state update, might need somewhere later 
        return window.screen.width < 769;
      },
      getSteps() {
        return this.blockData.steps.slice(0, Math.min(this.limit, this.blockData.steps.length));
      }
    },
    mounted() {
      this.assetsHeight = this.$refs.assets.offsetHeight + 'px auto';
    }
  }
  // some debounce stuff
  // https://vuejs.org/guide/essentials/reactivity-fundamentals.html#stateful-methods
</script>

<style lang="scss">
  .recipe {
    &-info {
      grid-row: 2;

      .accordion__item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .accordion__trigger {
          order: 1;
          margin-top: 1rem;
        }
      }
    }

    &-step {
      &.row {
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      &__number {
        font-size: 3.4rem;
        line-height: 1;
        font-weight: 800;
        color: $beige;
        margin-right: 1.2rem;
        user-select: none;
        flex-shrink: 0;
        width: 4.5rem;
      }
    }

    &-assets {
      grid-row: 1;
    }

    &-ingredients__title,
    &-offer__title {
      font-size: 2.4rem;
    }

    &-ingredients {
      background-color: $white;
      border-radius: $radius-medium;
      padding: 1.2rem 2rem;
      margin-bottom: 2rem;
    }

    &-ingredient {
      margin-bottom: .4rem;

      &.row {
        justify-content: space-between;
        align-items: flex-start;
      }

      &__amount {
        flex-shrink: 0;
      }
    }
  }

  @include breakpoint(tablet) {
    .recipe-step__number {
      font-size: 6.4rem;
      margin-right: 1.6rem;
      width: 9rem;
    }
  }

  @include breakpoint(laptop) {
    .recipe {
      &-info {
        grid-row: 1/3;
      }

      &-assets {
        grid-column: 2;
      }

      &-offer {
        grid-column: 2;
        grid-row: 2;
      }
    }
  }
</style>