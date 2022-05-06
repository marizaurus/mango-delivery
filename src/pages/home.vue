<template>
  <div class="home">
    <div class="container">
      <component
        v-for="block in HOME_BLOCKS" :key="block.id"
        :is="block.type" :blockData="block"/>
    </div>
  </div>
</template>

<script>
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'
  import comboBlock from '@/components/combo-block';
  import numberedList from '@/components/numbered-list';
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "home",
    components: {
      'carousel': carousel,
      'promo-set': promoSet,
      'combo-block': comboBlock,
      'numbered-list': numberedList,
    },
    computed: {
      ...mapGetters([
        'HOME_BLOCKS',
      ]),
    },
    methods: {
      ...mapActions([
        'GET_HOME_BLOCKS_API',
      ]),
    },
    mounted() {
      this.GET_HOME_BLOCKS_API();
    }
  }
</script>
