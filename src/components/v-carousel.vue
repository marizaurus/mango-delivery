<template>
  <div class="v-carousel m-resp">
    <h2 class="v-carousel__header">{{ blockData.title }}</h2>
    <div class="row">
      <component
        v-for="item in blockData.items"
        :key="item.id"
        :itemData="item"
        :is="item.type" />
    </div>
  </div>
</template>

<script>
  import vCategoryCard from '@/components/v-category-card';

  export default {
    name: 'v-carousel',
    components: {
      'category-card': vCategoryCard,
    },
    props: {
      blockData: {
        type: Object,
        default() {
          return {
            items: []
          }
        }
      }
    }
  }
</script>

<style lang="scss">
</style>