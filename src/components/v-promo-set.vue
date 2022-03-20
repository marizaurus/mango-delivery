<template>
  <div class="v-promo-set m-resp">
    <div class="row">
      <div
          class="v-promo-set__info block-neat"
          :class="[ ('align-' + blockData['info-alignment']) ]"
      >
        <h2 class="v-promo-set__info-title">{{ blockData.title }}</h2>
        <div class="v-promo-set__info-tags row">
          <div
              class="v-promo-set__info-cuisine"
              v-if="blockData['tag-type'] === 'cuisine'"
          >{{ blockData.tags[0] }}</div>
          <v-tag
              v-else
              v-for="tag in blockData.tags"
              :key="tag.id"
              :tag-data="tag"
          />
        </div>
        <div class="v-promo-set__info-desc">{{ blockData.description }}</div>
        <button class="btn btn-primary btn-green-light v-promo-set__info-button">
          <span>{{ $t('buttons.browseAll') }}</span>
          <font-awesome-icon icon="angle-right"/>
        </button>
      </div>
      <div class="v-promo-set__cards row">
        <v-product-card
          v-for="item in blockData.items"
          :key="item.id"
          :cardData="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import vProductCard from '@/components/v-product-card';
  import vTag from '@/components/v-tag';

  export default {
    name: "v-promo-set",
    components: {
      'v-product-card': vProductCard,
      'v-tag': vTag,
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
    }
  }
</script>

<style lang="scss">
  .v-promo-set {
    &__info {
      flex-basis: 33%;
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
      flex-basis: 66%;
      justify-content: center;
      align-items: flex-start !important;
    }
  }
</style>