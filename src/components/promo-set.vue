<template>
  <div class="promo-set m-resp">
    <div class="row">
      <div
        class="promo-set__info block-neat"
        :class="[ ('align-' + blockData.infoAlignment) ]" >
        <h2 class="promo-set__info-title">{{ blockData.title }}</h2>
        <div class="promo-set__info-tags row">
          <div
            class="promo-set__info-cuisine"
            v-if="blockData.tagType === 'cuisine'" >
            {{ blockData.tags[0] }}
          </div>
          <tag
            v-else
            v-for="tag in blockData.tags"
            :key="tag.id"
            :tag-data="tag" />
        </div>
        <div class="promo-set__info-desc">{{ blockData.description }}</div>
        <button class="btn btn-primary btn-green-light promo-set__info-button">
          <span>{{ $t('buttons.browseAll') }}</span>
          <font-awesome-icon icon="angle-right"/>
        </button>
      </div>
      <flickity
        ref="flickity"
        :options="options"
        class="promo-set__items flickity-slider--promo-set">
        <div
          class="carousel-cell"
          v-for="item in blockData.items"
          :key="item.id">
          <product-card
            class="carousel__item"
            :itemData="item" />
        </div>
      </flickity> 
    </div>
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
  }
</script>

<style lang="scss">
  .promo-set {
    & > .row {
      flex-direction: column;
    }

    &__info {
      width: 100%;
      margin-bottom: 2rem;
      order: 0;

      & > * {
        margin-bottom: 1rem;
      }

      &-cuisine {
        font-family: $comforter;
        font-size: 3.2rem;
      }

      &-button {
        margin: 1.5rem auto 0 !important;
      }
    }

    &__items {
      order: 1;
      width: 100%;
      justify-content: center;
      align-items: flex-start !important;
    }
  }

  @include breakpoint(tablet) {
    .promo-set {
      & > .row {
        flex-direction: row;
      }

      &__info {
        width: 35%;
        margin-bottom: 0;

        &.align-right {
          order: 2;
          margin-left: 3.5rem;
        }

        &.align-left {
          margin-right: 3.5rem;
        }

        &-button {
          margin: revert !important;
        }
      }

      &__items {
        width: 65%;
      }
    }
  }
</style>