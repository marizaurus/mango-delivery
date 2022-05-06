<template>
  <div class="recipe block-slim grid grid-laptop g-7-3 gg-2 m-resp"
    :style="{ gridTemplateRows: assetsHeight }">
    <numbered-list :blockData="recipeSteps"/>

    <div class="recipe-assets block-neat">
      <h2 class="recipe-assets__title" v-if="!isLaptop">{{ blockData.title }}</h2>
      <div class="recipe-ingredients block-neat" ref="assets">
        <h3 class="recipe-ingredients__title">{{ $t('blocks.ingredients') }}</h3>
        <div class="recipe-ingredient row"
          v-for="ingredient in blockData.ingredients" :key="ingredient.id">
          <div>{{ ingredient.name }}</div>
          <div class="recipe-ingredient__amount">{{ ingredient.number }}</div>
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
  import numberedList from '@/components/numbered-list';

  export default {
    name: "recipe",
    components: {
      'product-card': productCard,
      'numbered-list': numberedList,
    },
    data() {
      const laptopQuery = window.matchMedia('(min-width: 1024px)');
      return {
        limit: laptopQuery.matches ? 5 : 3,
        actualVisible: null,
        assetsHeight: null,
        laptopViewQuery: laptopQuery,
        isLaptop: laptopQuery.matches,
        recipeSteps: {
          title: '',
          items: [],
        },
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
      calcAssetsHeight() {
        if (!this.$refs.assets) return;
        return this.$refs.assets.offsetHeight + 'px auto';
      }
    },
    mounted() {
      if (this.isLaptop)
        this.assetsHeight = this.calcAssetsHeight();

      this.laptopViewQuery.addEventListener('change', () => {
        this.isLaptop = this.laptopViewQuery.matches;
        this.$nextTick(() => {
          this.assetsHeight = this.isLaptop ? this.calcAssetsHeight() : 'auto';
        });
      });

      this.recipeSteps = {
        title: this.blockData.title,
        items: this.blockData.steps.map((el) => ({ content: el })),
      }
    },
    watch: {
      'blockData.steps': function() {
      }
    }
  }
</script>

<style lang="scss">
  .recipe {
    &-info {
      grid-row: 2;

      .accordion {
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