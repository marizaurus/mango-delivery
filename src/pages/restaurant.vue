<template>
  <div class="restaurant">
    <div class="container container-slim" v-if="restaurant.main">
      <div class="restaurant-card m-resp grid grid-tablet g-2">
        <div class="restaurant-card__info block-neat"
          :class="[ ('restaurant-card__info--' + restaurant.main.infoAlignment) ]">
          <h1 class="restaurant-card__info-title">{{ restaurant.main.title }}</h1>
          <div class="restaurant-card__info-description" v-html="restaurant.main.description"/>
          <div class="restaurant-card__info-order">{{ $t('blockTypes.main.fields.orderMin') }} <span class="restaurant-card__info-order-sum">{{ restaurant.main.orderSum }} ₽</span></div>
          <div class="restaurant-card__info-categories">{{ restaurant.main.categories.join(' · ') }}</div>
          <div class="restaurant-card__info-cuisines">
            <span class="t-bold">{{ $t('blockTypes.main.fields.cuisines') }}: </span>
            <span>{{ restaurant.main.cuisines.join(', ') }}</span>  
          </div>
          <div class="restaurant-card__info-tags row">
            <tag v-for="tag in restaurant.main.tags" :key="tag.id"
              :tag-data="tag"/>
          </div>
          <button class="btn btn-primary btn-orange-light restaurant-btn m-auto">
            <span>{{ $t('buttons.browseAll') }}</span>
            <font-awesome-icon icon="angle-right"/>
          </button>
        </div>
        <div class="restaurant-card__image-wrapper">
          <div class="restaurant-card__image" ref="image" :style="{ backgroundImage: `url(${ restaurant.main.image })` }"/>
        </div>
      </div>
      <button class="btn btn-primary btn-orange-light restaurant-btn m-auto">
        <span>{{ $t('buttons.browseAll') }}</span>
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>

    <div class="container">
      <component
        v-for="block in restaurant.blocks" :key="block.id"
        :is="block.type" :blockData="block"/>
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'
  import recipe from '@/components/recipe'
  import tag from '@/components/tag'

  export default {
    name: "restaurant",
    components: {
      'promo-set': promoSet,
      carousel,
      recipe,
      tag,
    },
    data() {
      return {
        restaurant: {
          main: {
            categories: [],
            cuisines: [],
          },
          blocks: [],
        },
      }
    },
    methods: {
      onLoad() {
        let img =  new Image();
        img.onload = () => this.$refs.image.classList.add('img-loaded');
        img.src = this.restaurant.main.image;
      },
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.restaurants.getRestaurant();
        this.restaurant = res.data || res;
      }).then(() => this.onLoad());
    }
  }
</script>

<style lang="scss">
  .restaurant {
    &-card {
      background-color: $white;
      border-radius: $radius-big;
      overflow: hidden;
      margin-bottom: 3.2rem !important;

      &__info {
        padding: 1.2rem 1.6rem 1.6rem;

        &-title,
        &-description,
        &-order {
          margin-bottom: 1.6rem;
        }

        &-order-sum {
          font-size: 2rem;
          font-weight: 700;
        }

        &-categories {
          margin-bottom: .4rem;
        }

        &-cuisines {
          margin-bottom: .8rem;
        }
      }

      &__image-wrapper {
        background-image: url('~@/assets/images/placeholder-big.png');
        background-size: cover;
        background-position: center;
        height: 20rem;
        grid-row: 1;

        .restaurant-card__image {
          opacity: 0;
          background-size: cover;
          background-position: center;
          height: 100%;
          width: 100%;
          transition: opacity .2s linear;

          &.img-loaded {
            opacity: 1;
          }
        }
      }

      .restaurant-btn.btn {
        margin-top: 1.6rem !important;
        display: flex;
      }
    }

    &-btn.btn {
      display: none;
    }
  }

  @include breakpoint(tablet) {
    .restaurant {
      &-card {
        &__info {
          padding: 3.2rem 4.2rem;

          &--left {
            grid-column: 1;
            grid-row: 1;
          }
        }

        &__image-wrapper {
          height: unset;
        }

        .restaurant-btn.btn {
          display: none;
        }
      }

      &-btn.btn {
        display: flex;
      }
    }
  }
</style>