<template>
  <div class="v-carousel m-resp">
    <h2 class="v-carousel__header">{{ $t('blocks.popularCategories') }}</h2>
    <div class="row">
      <v-category-card
        v-for="category in this.CATEGORIES"
        :key="category.id"
        :category-data="category"
      />
    </div>
  </div>
</template>

<script>
  import vCategoryCard from '@/components/v-category-card';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: "v-carousel",
    components: {
      'v-category-card': vCategoryCard,
    },
    computed: {
      ...mapGetters([
          'CATEGORIES',
      ]),
    },
    methods: {
      ...mapActions([
         'GET_CATEGORIES_API',
      ]),
    },
    mounted() {
      this.GET_CATEGORIES_API();
    }
  }
</script>

<style lang="scss">
</style>