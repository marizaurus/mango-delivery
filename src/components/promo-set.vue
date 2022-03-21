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
      <Carousel
        :settings="settings"
        :breakpoints="breakpoints"
        class="promo-set__items"
        :class="{'carousel--slim': blockData.items.length < blockData.itemsToShow}">  
        <Slide
          :class="[ ('carousel__slide--' + blockData.items[0].type) ]"
          v-for="item in blockData.items"
          :key="item.id" >
          <product-card
            class="carousel__item"
            :itemData="item" />
        </Slide>
        <template #addons>
          <Navigation/>
          <Pagination/>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
  import productCard from '@/components/product-card';
  import tag from '@/components/tag';
  import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';

  export default {
    name: "promo-set",
    components: {
      'product-card': productCard,
      'tag': tag,
      Carousel,
      Slide,
      Pagination,
      Navigation,
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
        settings: {
          snapAlign: 'start',
          wrapAround: true,
          mouseDrag: false,
        },
        breakpoints: {
          480: {
            itemsToShow: 2,
          },
          1200: {
            itemsToShow: 3,
          }
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
      margin-bottom: 3.2rem;

      &.align-right {
        order: 2;
        margin-left: 3.5rem;
        margin-right: 0;
      }

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
        margin-right: 3.5rem;
        margin-bottom: 0;

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