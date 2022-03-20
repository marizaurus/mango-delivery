<template>
  <div class="v-home">
    <div class="container">
      <component
        v-for="block in this.BLOCKS"
        :key="block.id"
        :is="block.type"
        :blockData="block" />
    </div>
  </div>
</template>

<script>
import vCarousel from '@/components/v-carousel';
import vPromoSet from '@/components/v-promo-set'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-home",
  components: {
    'carousel': vCarousel,
    'promo-set': vPromoSet,
  },
  computed: {
    ...mapGetters([
      'BLOCKS',
    ]),
  },
  methods: {
    ...mapActions([
      'GET_BLOCKS_API',
    ]),
  },
  mounted() {
    this.GET_BLOCKS_API();
  }
}
</script>

<style lang="scss">
  .v-home {
    // MOVE TO LAYOUT ONCE DEALT WITH HEADER
    //padding: 40px 0 80px;
  }
</style>