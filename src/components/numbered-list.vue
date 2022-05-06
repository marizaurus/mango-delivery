<template>
  <div class="numbered-list block-neat" :class="{ 'm-resp block-slim': blockData.type == 'numbered-list' }">
    <h2 class="numbered-list__title" v-if="isLaptop || blockData.type == 'numbered-list'">{{ blockData.title }}</h2>
    <div class="numbered-list__item row"
      v-for="(item, i) in visibleItems" :key="i">
      <div class="numbered-list__item-number">{{ zeroPad(i + 1, 2) }}</div>
      <div class="block-neat">
        <h3 class="numbered-list__item-title" v-if="item.title">{{ item.title }}</h3>
        <div class="numbered-list__item-content">{{ item.content }}</div>
      </div>
    </div>
    <accordion
      v-if="blockData.items.length > limit">
      <template #accordionContent>
        <div class="numbered-list__item row"
          v-for="(item, i) in hiddenItems" :key="i">
          <div class="numbered-list__item-number">{{ zeroPad(i + limit + 1, 2) }}</div>
          <div class="block-neat">
            <h3 class="numbered-list__item-title" v-if="item.title">{{ item.title }}</h3>
            <div class="numbered-list__item-content">{{ item.content }}</div>
          </div>
        </div>
      </template>
      <template #accordionTrigger="accProps" ref="trigger">
        <button ref="collapseBtn" class="numbered-list__btn btn btn-outline">{{ btnValue(accProps.visible) }}</button>
      </template>
    </accordion>
  </div>
</template>

<script>
  import accordion from '@/components/accordion';

  export default {
    name: 'numbered-list',
    components: {
      accordion
    },
    data() {
      const laptopQuery = window.matchMedia('(min-width: 1024px)');
      return {
        limit: laptopQuery.matches ? 5 : 3,
        actualVisible: null,
        assetsHeight: null,
        laptopViewQuery: laptopQuery,
        isLaptop: laptopQuery.matches,
      }
    },
    props: {
      blockData: {
        title: String,
        blockType: String,
        items: [
          {
            title: String,
            content: String,
          }
        ],
      }
    },
    methods: {
      // add fancy zeros
      zeroPad(num, places) {
        return String(num).padStart(places, '0');
      },
      btnValue(visible) {
        this.actualVisible = visible;
        return visible ? this.$t('buttons.readLess') : this.$t('buttons.readMore');
      },
    },
    computed: {
      itemsLimit() {
        return this.isLaptop ? 5 : 3;
      },
      visibleItems() {
        return this.blockData.items.slice(0, Math.min(this.limit, this.blockData.items.length));
      },
      hiddenItems() {
        return this.blockData.items.slice(this.limit);
      }
    },
    mounted() {
      this.laptopViewQuery.addEventListener('change', () => {
        this.isLaptop = this.laptopViewQuery.matches;
        this.limit = this.itemsLimit;
        this.$nextTick(() => {
          if (this.actualVisible) {
            this.$refs.collapseBtn.click();
          }
        });
      });
    },
  }
</script>

<style lang="scss">
  .numbered-list {
    .accordion {
      display: flex;
      flex-direction: column;
      align-items: center;

      .accordion__trigger {
        order: 1;
        margin-top: 1rem;
      }
    }

    &__item {
      &.row {
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      &-number {
        font-size: 3.4rem;
        line-height: 1;
        font-weight: 800;
        color: $beige;
        margin-right: 1.2rem;
        user-select: none;
        flex-shrink: 0;
        width: 4.5rem;
      }

      &-title {
        margin-bottom: .5rem;
        color: $grey;
      }
    }
  }

  @include breakpoint(tablet) {
    .numbered-list__item-number {
      font-size: 6.4rem;
      margin-right: 1.6rem;
      width: 9rem;
    }
  }
</style>