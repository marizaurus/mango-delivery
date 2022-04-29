<template>
  <div class="promo-set m-resp grid grid-tablet gg-2"
    :class="getGrid">
    <div class="promo-set__info block-neat grid-center">
      <h2 class="promo-set__info-title">{{ blockData.title }}</h2>
      <div class="promo-set__info-tags row">
        <div class="promo-set__info-cuisine"
          v-if="blockData.tagType === 'cuisine'">
          {{ blockData.tags[0] }}
        </div>
        <tag v-else
          v-for="tag in blockData.tags" :key="tag.id"
          :tag-data="tag"/>
      </div>
      <div class="promo-set__info-desc" v-html="blockData.description"/>
      <button class="btn btn-primary btn-green-light promo-set__info-button">
        <span>{{ $t('buttons.browseAll') }}</span>
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>

    <product-card class="carousel__item grid-center m-auto"
      v-if="count === 1" :itemData="blockData.items[0]"/>
    <flickity class="promo-set__items flickity-slider--promo-set"
      ref="flickity" :options="options" v-else>
      <div class="carousel-cell"
        v-for="item in blockData.items" :key="item.id">
        <product-card class="carousel__item"
          :itemData="item"/>
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
        title: String,
        infoAlignment: String,
        tagType: String,
        tags: Array,
        description: String,
        items: Array
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
          draggable: true,
        },
        count: 0,
        side: ''
      }
    },
    computed: {
      getGrid() {
        return this.count === 1 ? this.side === 'left' ? 'g-7-3 block-slim' : 'g-3-7 block-slim'
          : this.side === 'left' ? 'g-1-2' : 'g-2-1';
      },
    },
    mounted() {
      this.count = this.blockData.items.length;
      this.side = this.blockData.infoAlignment;
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

      &-button.btn {
        margin-left: auto;
        margin-right: auto;
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

      &__info-button.btn {
        margin-top: 1.5rem;
        margin-left: unset;
      }
    }
  }
</style>