<template>
  <div class="v-promo-collection m-resp">
    <div class="row">
      <div
          class="v-promo-collection__info block-neat"
          :class="[ ('align-' + promoCollectionData['info-alignment']) ]"
      >
        <h2 class="v-promo-collection__info-title">{{ promoCollectionData.name }}</h2>
        <div class="v-promo-collection__info-tags row">
          <div
              class="v-promo-collection__info-cuisine"
              v-if="promoCollectionData['tag-type'] === 'cuisine'"
          >{{ promoCollectionData.tags[0] }}</div>
          <v-tag
              v-else
              v-for="tag in promoCollectionData.tags"
              :key="tag.id"
              :tag-data="tag"
          />
        </div>
        <div class="v-promo-collection__info-desc">{{ promoCollectionData.description }}</div>
        <button class="btn btn-primary btn-green-light v-promo-collection__info-button">
          <span>{{ $t('buttons.browseAll') }}</span>
          <font-awesome-icon icon="angle-right"/>
        </button>
      </div>
      <div class="v-promo-collection__cards row">
        <v-product-card
          v-for="card in promoCollectionData.cards"
          :key="card.id"
          :card-data="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import vProductCard from '@/components/v-product-card';
  import vTag from '@/components/v-tag';

  export default {
    name: "v-promo-collection",
    components: {
      'v-product-card': vProductCard,
      'v-tag': vTag,
    },
    props: {
      promoCollectionData: {
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
  .v-promo-collection {
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