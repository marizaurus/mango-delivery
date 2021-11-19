<template>
  <div class="v-home">
    <div class="container">
      <v-carousel></v-carousel>
    </div>
  </div>
</template>

<script>
import vCarousel from '@/components/v-carousel';

export default {
  name: "v-home",
  components: {
    'v-carousel': vCarousel,
  }
}
</script>

<style lang="scss">
  .v-home {
    // MOVE TO LAYOUT ONCE DEALT WITH HEADER
    //padding: 40px 0 80px;
  }
</style>