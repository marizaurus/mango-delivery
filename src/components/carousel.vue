<template>
  <div class="carousel m-resp">
    <h2 class="carousel__header">{{ blockData.title }}</h2>
    <flickity
      ref="flickity"
      :options="options"
      :class="[ ('flickity-slider--' + blockData.items[0].type) ]">
      <div
        class="carousel-cell"
        v-for="item in blockData.items"
        :key="item.id">
        <component
          class="carousel__item"
          :is="item.type"
          :itemData="item" />
      </div>
    </flickity>  
  </div>
</template>

<script>
  import categoryCard from '@/components/category-card';
  import productCard from '@/components/product-card';
  import Flickity from 'vue-flickity';

  export default {
    name: 'carousel',
    components: {
      'category-card': categoryCard,
      'product-card': productCard,
      Flickity,
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
        options: {
          wrapAround: true,
          accessibility: false,
          cellAlign: 'left',
          groupCells: true,
        }
      }
    },
  }
</script>
