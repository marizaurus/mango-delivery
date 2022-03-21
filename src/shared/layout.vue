<template>
  <div id="layout">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '@/shared/header.vue';
import footer from '@/shared/footer.vue';

export default {
  name: "Layout",
  components: {
    'v-header': header,
    'v-footer': footer,
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap');
</style>