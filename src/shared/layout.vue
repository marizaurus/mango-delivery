<template>
  <div id="layout">
    <v-header/>
    <router-view/>
    <v-footer/>
  </div>
</template>

<script>
  import vHeader from '@/shared/header.vue';
  import vFooter from '@/shared/footer.vue';

  import { mapActions } from 'vuex';

  export default {
    name: "Layout",
    components: {
      'v-header': vHeader,
      'v-footer': vFooter,
    },
    methods: {
      ...mapActions(['loadCategories', 'loadCuisines', 'loadTags']),
    },
    mounted() {
      this.loadCategories();
      this.loadCuisines();
      this.loadTags();
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap');
</style>