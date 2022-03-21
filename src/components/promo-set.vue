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
            if="blockData['tag-type'] === 'cuisine'" >
            {{ blockData.tags[0] }}
          </div>
          <tag
            else
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
      <!-- <div class="promo-set__cards row">
        <product-card
          v-for="item in blockData.items"
          :key="item.id"
          :itemData="item" />
      </div> -->
      <Carousel
        :settings="settings"
        class="promo-set__cards"
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
          <Navigation if="blockData.items.length > blockData.itemsToShow" />
          <!-- TODO: only display on mobile -->
          <!-- TODO: no titles needed!! - remove somehow -->
          <!-- <Pagination /> -->
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
  import productCard from '@/components/product-card';
  import tag from '@/components/tag';
  import { Carousel, Navigation, Slide } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';

  export default {
    name: "promo-set",
    components: {
      'product-card': productCard,
      'tag': tag,
      Carousel,
      Slide,
      // Pagination,
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
          itemsToShow: this.blockData.itemsToShow,
          itemsToScroll: 1,
          snapAlign: 'start',
          wrapAround: true,
          mouseDrag: false,
        },
        // TODO: define breakpoints (mobile first)
        // breakpoints: {
        //   700: {
        //     itemsToShow: 3.5,
        //     snapAlign: 'center',
        //   },
        //   1024: {
        //     itemsToShow: 5,
        //     snapAlign: 'start',
        //   },
        // },
      }
    },
  }
</script>

<style lang="scss">
  .promo-set {
    &__info {
      width: 33%;
      margin-right: 3.5rem;

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
    }

    &__cards {
      width: 66%;
      justify-content: center;
      align-items: flex-start !important;
    }
  }
</style>