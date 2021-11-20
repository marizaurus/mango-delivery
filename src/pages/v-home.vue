<template>
  <div class="v-home">
    <div class="container">
      <v-carousel />
      <v-promo-collection
        v-for="promoCollection in this.PROMO_COLLECTIONS"
        :key="promoCollection.id"
        :promo-collection-data="promoCollection"
      />
    </div>
  </div>
</template>

<script>
import vCarousel from '@/components/v-carousel';
import vPromoCollection from '@/components/v-promo-collection'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-home",
  components: {
    'v-carousel': vCarousel,
    'v-promo-collection': vPromoCollection,
  },
  computed: {
    ...mapGetters([
      'PROMO_COLLECTIONS',
    ]),
  },
  methods: {
    ...mapActions([
      'GET_PROMO_COLLECTIONS_API',
    ]),
  },
  mounted() {
    this.GET_PROMO_COLLECTIONS_API();
  }
}
</script>

<style lang="scss">
  .v-home {
    // MOVE TO LAYOUT ONCE DEALT WITH HEADER
    //padding: 40px 0 80px;
  }
</style>