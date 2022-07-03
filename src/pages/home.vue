<template>
  <div class="home">
    <div class="container">
      <component
        v-for="block in blocks" :key="block.id"
        :is="block.type" :blockData="block"/>
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'
  import comboBlock from '@/components/combo-block';
  import numberedList from '@/components/numbered-list';

  export default {
    name: "home",
    components: {
      'carousel': carousel,
      'promo-set': promoSet,
      'combo-block': comboBlock,
      'numbered-list': numberedList,
    },
    data() {
      return {
        blocks: [],
      }
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.home.getBlocks();
        this.blocks = res.data || res;
      });
    }
  }
</script>
