<template>
  <div class="carousel m-resp">
    <h2 class="carousel__header">{{ blockData.title }}</h2>
    <Carousel :settings="settings">  
      <Slide
        :class="[ ('carousel__slide--' + blockData.items[0].type) ]"
        v-for="item in blockData.items"
        :key="item.id" >
        <component
          class="carousel__item"
          :is="item.type"
          :itemData="item" />
      </Slide>

      <template #addons>
        <Navigation v-if="blockData.items.length > blockData.itemsToShow" />
        <!-- TODO: only display on mobile -->
        <!-- TODO: no titles needed!! - remove somehow -->
        <!-- <Pagination /> -->
      </template>
    </Carousel>
  </div>
</template>

<script>
  import categoryCard from '@/components/category-card';
  import productCard from '@/components/product-card';
  import { Carousel, Navigation, Slide } from 'vue3-carousel';

  import 'vue3-carousel/dist/carousel.css';

  export default {
    name: 'carousel',
    components: {
      'category-card': categoryCard,
      'product-card': productCard,
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
            itemsToShow: 0,
            items: []
          }
        }
      }
    },
    data() {
      return {
        settings: {
          itemsToShow: this.blockData.itemsToShow,
          // TODO: why does this break if images aren't loaded
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
</style>