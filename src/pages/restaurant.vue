<template>
  <div class="restaurant">
    <div class="container container-slim">
      <div class="restaurant-card m-resp row">
        <div class="restaurant-card__info block-neat">
          <h1 class="restaurant-card__info-title">{{ this.RESTAURANT_INFO.title }}</h1>
          <div class="restaurant-card__info-description" v-html="this.RESTAURANT_INFO.description"/>
          <div class="restaurant-card__info-order">Заказ от <span class="restaurant-card__info-order-sum">{{ this.RESTAURANT_INFO.orderSum }} ₽</span></div>
          <!-- <div class="restaurant-card__info-delivery">Бесплатная доставка от <span class="restaurant-card__info-delivery-sum">1000 ₽</span></div> -->
          <div class="restaurant-card__info-categories">{{ this.RESTAURANT_INFO.categories.join(' · ') }}</div>
          <div class="restaurant-card__info-cuisines"><span class="t-bold">Кухни:</span> {{ this.RESTAURANT_INFO.cuisines.join(', ') }}</div>
          <div class="restaurant-card__info-tags row">
            <tag
              v-for="tag in this.RESTAURANT_INFO.tags"
              :key="tag.id"
              :tag-data="tag"/>
          </div>
          <button class="btn btn-primary btn-orange-light restaurant-btn m-auto">
            <span>{{ $t('buttons.browseAll') }}</span>
            <font-awesome-icon icon="angle-right"/>
          </button>
        </div>
        <div class="restaurant-card__image"
          :style="{ backgroundImage: `url(${ this.RESTAURANT_INFO.image })` }"/>
      </div>
      <button class="btn btn-primary btn-orange-light restaurant-btn m-auto">
        <span>{{ $t('buttons.browseAll') }}</span>
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>
    <div class="container">
      <component
        v-for="block in this.RESTAURANT_BLOCKS"
        :key="block.id"
        :is="block.type"
        :blockData="block" />
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'
  import recipe from '@/components/recipe'
  import tag from '@/components/tag'
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "restaurant",
    components: {
      'promo-set': promoSet,
      carousel,
      recipe,
      tag,
    },
    computed: {
    ...mapGetters([
      'RESTAURANT_INFO',
      'RESTAURANT_BLOCKS',
    ]),
      // TODO: alias example, not working great with 'join'
      // ...mapGetters({
      //   blocks: 'RESTAURANT_BLOCKS' 
      // })
    },
    methods: {
      ...mapActions([
        'GET_RESTAURANT_INFO_API',
        'GET_RESTAURANT_BLOCKS_API',
      ]),
    },
    mounted() {
      this.GET_RESTAURANT_INFO_API();
      this.GET_RESTAURANT_BLOCKS_API();
    }
  }
</script>

<style lang="scss">
  .restaurant {
    &-card {
      background-color: $white;
      border-radius: $radius-big;
      overflow: hidden;
      align-items: stretch !important;
      margin-bottom: 3.2rem !important;
      flex-wrap: wrap;

      &__info {
        order: 1;
        flex-basis: 100%;
        padding: 1.2rem 1.6rem 1.6rem;
        box-sizing: border-box;

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

      &__image {
        flex-basis: 100%;
        background-size: cover;
        background-position: center;
        height: 20rem;
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
          flex-basis: 50%;
          order: 0;
          padding: 3.2rem 4.2rem;
        }

        &__image {
          flex-basis: 50%;
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