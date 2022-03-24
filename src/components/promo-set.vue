<template>
  <div class="promo-set m-resp grid grid-tablet gg-2"
    :class="getGrid(blockData.infoAlignment)">
    <div class="promo-set__info block-neat grid-center">
      <h2 class="promo-set__info-title">{{ blockData.title }}</h2>
      <div class="promo-set__info-tags row">
        <div class="promo-set__info-cuisine"
          v-if="blockData.tagType === 'cuisine'">
          {{ blockData.tags[0] }}
        </div>
        <tag
          v-else
          v-for="tag in blockData.tags"
          :key="tag.id"
          :tag-data="tag"/>
      </div>
      <div class="promo-set__info-desc">{{ blockData.description }}</div>
      <button class="btn btn-primary btn-green-light promo-set__info-button m-auto">
        <span>{{ $t('buttons.browseAll') }}</span>
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>

    <flickity class="promo-set__items flickity-slider--promo-set"
      ref="flickity"
      :options="options">
      <div class="carousel-cell"
        v-for="item in blockData.items"
        :key="item.id">
        <product-card class="carousel__item"
          :itemData="item" />
      </div>
    </flickity> 
  </div>
</template>

<script>
  import productCard from '@/components/product-card';
  import tag from '@/components/tag';
  import Flickity from 'vue-flickity';

  export default {
    name: "promo-set",
    components: {
      'product-card': productCard,
      'tag': tag,
      Flickity,
    },
    props: {
      blockData: {
        type: Object,
        default() {
          return {
            cards: []
          }
        }
      }
    },
    data() {
      return {
        options: {
          wrapAround: true,
          // contain: true,
          accessibility: false,
          cellAlign: 'left',
          groupCells: true,
        }
      }
    },
    computed: {
      getGrid() {
        return (side) => side === 'left' ? 'g-1-2' : 'g-2-1'
      },
    }
  }
</script>

<style lang="scss">
  .promo-set {
    &__info {
      & > * {
        margin-bottom: 1rem;
      }

      &-cuisine {
        font-family: $comforter;
        font-size: 3.2rem;
      }
    }
  }

  @include breakpoint(tablet) {
    .promo-set {
      &.g-2-1 .promo-set {
        &__info {
          grid-column: 2;
        }

        &__items {
          grid-column: 1;
          grid-row: 1;
        }
      }

      &__info-button {
        margin-top: 1.5rem;
      }
    }
  }
</style>