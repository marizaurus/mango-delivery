<template>
  <div class="restaurant-stripe grid grid-tablet gg-1 g-3">
    <div class="restaurant-stripe__info">
      <div class="restaurant-stripe__info-title-wrapper row">
        <h3 class="restaurant-stripe__info-title m-none">{{ itemData.title }}</h3>
        <h3 class="restaurant-stripe__info-rating m-none row">
          <font-awesome-icon icon="star"/>
          <span class="restaurant-stripe__info-rating-value">{{ itemData.rating }}</span>
          <font-awesome-icon :icon="isFavorite ? ['fas', 'heart'] : ['far', 'heart']"
            class="restaurant-stripe__favorite" @click="isFavorite = !isFavorite"/>
        </h3>
      </div>
      <div class="restaurant-stripe__info-order">
        {{ $t('blockTypes.main.fields.orderMin') }} <span class="restaurant-stripe__info-order-sum">{{ itemData.orderSum }} ₽</span>
      </div>
      <div class="restaurant-stripe__info-categories">{{ itemData.categories.join(' · ') }}</div>
      <div class="restaurant-stripe__info-cuisines">
        <span class="t-bold">{{ $t('blockTypes.main.fields.cuisines') }}: </span>
        <span>{{ itemData.cuisines.join(', ') }}</span>  
      </div>
      <div class="restaurant-stripe__info-tags row">
        <tag v-for="tag in itemData.tags" :key="tag.id"
          :tag-data="tag"/>
      </div>
    </div>
    <div class="restaurant-stripe__description">
      <div class="restaurant-stripe__description-text" v-html="itemData.description"/>
      <button class="btn btn-primary btn-orange-light m-auto m-none">
        <span>{{ $t('buttons.menu') }}</span>
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>
    <div class="restaurant-stripe__image-wrapper">
      <div class="restaurant-stripe__image" ref="image" :style="{ backgroundImage: `url(${ itemData.image })` }"/>
    </div>
  </div>
</template>

<script>
  import tag from '@/components/tag'
  
  export default {
    name: 'restaurant-stripe',
    components: {
      tag,
    },
    data() {
      return {
        isFavorite: this.itemData.isFavorite,
      }
    },
    props: {
      itemData: {
        title: String,
        rating: Number,
        orderSum: Number,
        categories: Array,
        cuisines: Array,
        tags: Array,
        description: String,
        image: String,
        isFavorite: Boolean,
      }
    },
    methods: {
      onLoad() {
        let img =  new Image();
        img.onload = () => this.$refs.image.classList.add('img-loaded');
        img.src = this.itemData.image;
      },
    },
    mounted() {
      this.onLoad();
    }
  }
</script>

<style lang="scss">
  .restaurant-stripe {
    background-color: $white;
    border-radius: $radius-medium;
    overflow: hidden;
    margin-bottom: 2.4rem;
    flex-basis: 100%;
    // @include shadow-bottom($beige);

    &__info {
      padding: 1.2rem 2rem;

      &-title-wrapper {
        margin-bottom: 1.2rem;
      }

      &-rating {
        align-self: flex-start;
        margin-left: 1.2rem;
        color: $yellow;

        &-value {
          margin-left: .4rem;
          font-weight: 700;
        }

        svg {
          font-size: 2rem;
        }

        .restaurant-stripe__favorite {
          margin-left: 1rem;
          font-size: 2rem;
          color: $red;
          cursor: pointer;
        }
      }

      &-order {
        margin-bottom: .4rem;

        &-sum {
          font-weight: 700;
        }
      }

      &-categories {
        margin-bottom: .4rem;
      }

      &-cuisines {
        margin-bottom: .8rem;
      }
    }

    &__description {
      display: none;
      flex-direction: column;
      justify-content: space-between;

      &-text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        margin-bottom: 1.2rem;
      }
    }

    &__image {
      &-wrapper {
        background-image: url('~@/assets/images/placeholder-small.png');
        background-size: cover;
        background-position: center;
        display: none;

        .restaurant-stripe__image {
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
    }
  }

  @include breakpoint(tablet) {
    .restaurant-stripe {
      &.grid.grid-tablet.g-3 {
        grid-template-columns: minmax(310px, 1fr) 1fr;
      }

      &__info {
        padding: 1.2rem 0 1.6rem 2rem;
      }

      &__description {
        padding: 1.6rem 2rem 1.6rem 0;
        display: flex;

        &-text {
          margin-bottom: 0;
        }
      }
    }
  }

  @include breakpoint(desktop) {
    .restaurant-stripe {
      &.grid.grid-tablet.g-3 {
        grid-template-columns: minmax(310px, 1fr) 1fr 1fr;
      }

      &__image-wrapper {
        display: block;
        height: unset;
      }
    }
  }
</style>