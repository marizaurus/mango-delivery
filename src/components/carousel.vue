<template>
  <div class="carousel m-resp">
    <h2 class="carousel__header">{{ blockData.title }}</h2>
    <flickity
      ref="flickity"
      :options="options"
      :class="[ ('flickity-slider--' + blockData.items[0].type) ]">
      <div class="carousel-cell"
        v-for="item in blockData.items" :key="item.id">
        <component class="carousel__item"
          :is="item.type"
          :itemData="item"/>
      </div>
    </flickity>
  </div>
</template>

<script>
  import categoryCard from '@/components/category-card';
  import productCard from '@/components/product-card';
  import comboCard from '@/components/combo-card';
  import Flickity from 'vue-flickity';

  export default {
    name: 'carousel',
    components: {
      'category-card': categoryCard,
      'product-card': productCard,
      'combo-card': comboCard,
      Flickity,
    },
    props: {
      blockData: {
        title: String,
        items: Array
      }
    },
    data() {
      return {
        options: {
          wrapAround: true,
          accessibility: false,
          cellAlign: 'left',
          groupCells: true,
          draggable: true,
        }
      }
    },
  }
</script>

<style lang="scss">
  .flickity {
    &-viewport {
      padding-bottom: 3.4rem;
    }

    &-slider {
      .carousel-cell {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
      }
    
      &--category-card .carousel-cell {
        padding: 0 2rem;
      }
      
      &--combo-card .carousel-cell {
        padding: 0 1rem;
      }
    
      &--product-card .carousel-cell,
      &--promo-set .carousel-cell {
        padding: .5rem 1.5rem 0;
      }

      &--product-image {
        .carousel-cell {
          margin-right: 1.5rem;
        }

        .flickity {
          &-viewport {
            padding-bottom: 0;
          }

          &-page-dots {
            bottom: 1.6rem;
      
            .dot {
              border-color: $white;
        
              &.is-selected {
                background-color: $white;
              }
            }
          }
        }
      }
    }

    &-button {
      display: none;
      background-color: $green-light;
      border: 4px solid $beige-light;
      width: 4.6rem;
      height: 4.6rem;

      &:focus {
        outline: none;
        box-shadow: none;
      }

      &:hover,
      &:active {
        background-color: $green-light;
        opacity: 1;
      }

      &-icon {
        fill: $white;
      }

      &.previous {
        left: -.5rem;
      }

      &.next {
        right: -.5rem;
      }

      &:disabled {
        display: none;
      } 
    }
    
    &-page-dots {
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 0;
    
      .dot {
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 0.8rem;
        border: 3px solid $green-light;
        background-color: transparent;
        box-sizing: border-box;
        opacity: 1;
    
        &.is-selected {
          width: 1.8rem;
          height: 1.8rem;
          background-color: $green-light;
        }
      }
    }
  }

  @include breakpoint(mobile) {
    .flickity-slider {
      &--product-card .carousel-cell,
      &--promo-set .carousel-cell,
      &--combo-card .carousel-cell {
        width: 50%;
      }
    }
  }
    
  @include breakpoint(tablet) {
    .flickity {
      &-viewport {
        padding-bottom: 0;
      }

      &-slider {
        &--category-card .carousel-cell {
          width: 50%;
        }
    
        &--product-card .carousel-cell,
        &--combo-card .carousel-cell {
          width: 33%;
        }
      }

      &-page-dots {
        display: none;
      }
    
      &-button {
        display: block;
      }

      &-slider--product-image {
        .flickity {
          &-button {
            display: none;
          }

          &-page-dots {
            display: flex;
          }
        }
      }
    }
  }

  @include breakpoint(laptop) {
    .flickity-slider {
      &--category-card .carousel-cell {
        width: 33%;
      }

      &--product-card .carousel-cell,
      &--combo-card .carousel-cell {
        width: 25%;
      }
    }
  }

  @include breakpoint(desktop) {
    .flickity-slider {
      &--category-card .carousel-cell {
        width: 25%;
      }

      &--product-card .carousel-cell,
      &--combo-card .carousel-cell {
        width: 20%;
      }

      &--promo-set .carousel-cell {
        width: 33%;
      }
    }
  }
</style>
