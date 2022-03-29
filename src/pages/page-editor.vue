<template>
  <div class="page-editor">
    <div class="container container-slim m-resp">
      <h1 class="page-editor__title">{{ $t('pageEditor.title') }}</h1>
      <div class="t-red t-medium" v-if="!isLaptop">{{ $t('pageEditor.mobileNotice') }}</div>
      <div class="grid grid-laptop g-7-3 gg-2" v-if="this.isLaptop">
        <div class="page-editor__content block-neat">
          <accordion class="block-editor" :initialVisible="true"
            :style="{ '--index': blocks.length + 1 }">
            <template #accordionTrigger>
              <div class="block-editor__header non-empty">
                <span class="block-editor__header-label">{{ $t('blockTypes.main.title') }}</span>
                <h3 class="block-editor__header-title m-none">{{ info.title }}</h3>
              </div>
            </template>
            <template #accordionContent>
              <div class="block-editor__content block-neat">
                <div class="custom-input">
                  <textarea rows="5"/>
                  <label class="custom-input-label">{{ $t('blockTypes.main.fields.description') }}</label>
                </div>
                <div class="row">
                  <div class="custom-input">
                    <input type="text">
                    <label class="custom-input-label">{{ $t('blockTypes.main.fields.orderMin') }}<span class="t-red">*</span></label>
                  </div>
                  <custom-select class="select-form" :selectData="getAlignData" :style="{ 'z-index': 3 }"/>
                </div>
                <div class="block-editor__content-title">{{ $t('blockTypes.main.fields.сategoriesTitle') }}</div>
                <div class="row">
                  <custom-select class="select-form" :selectData="categoriesData"/>
                  <custom-select class="select-form" :selectData="cuisinesData"/>
                  <custom-select class="select-form" :selectData="tagsData"/>
                </div>
              </div>
            </template>
          </accordion>
          <accordion class="block-editor" v-for="(block, i) in blocks" :key="block.id"
            :style="{ '--index': blocks.length - i }">
            <template #accordionTrigger>
              <div class="block-editor__header" :class="{ 'non-empty' :  block.title }">
                <span class="block-editor__header-label">{{ $t('blockTypes.' + block.type + '.title') }}</span>
                <h3 class="block-editor__header-title m-none" v-if="block.title">{{ block.title }}</h3>
              </div>
            </template>
            <template #accordionContent>
              <div class="block-editor__content block-neat">
                <template v-if="block.type == 'carousel'">
                <div class="grid grid-mobile g-2 gg-2">
                  <div>
                    <div class="custom-input">
                      <input type="text">
                      <label class="custom-input-label">{{ $t('blockTypes.carousel.fields.title') }}<span class="t-red">*</span></label>
                    </div>
                    <custom-select class="select-form" :selectData="getCardData"/>
                  </div>
                </div>
                </template>
                <template v-else-if="block.type == 'promo-set'">
                  <div class="grid grid-mobile g-2 gg-2">
                    <div>
                      <div class="custom-input">
                        <input type="text">
                        <label class="custom-input-label">{{ $t('blockTypes.carousel.fields.title') }}<span class="t-red">*</span></label>
                      </div>
                      <div class="custom-input">
                        <textarea rows="5"/>
                        <label class="custom-input-label">{{ $t('blockTypes["promo-set"].fields.description') }}<span class="t-red">*</span></label>
                      </div>
                      <custom-select class="select-form" :selectData="getCategoryData"/>
                    </div>
                  </div>
                </template>
                <template v-else>

                </template>
              </div>
            </template>
          </accordion>
        </div>
        <div class="page-editor__blocks block-neat">
          <h3 class="page-editor__blocks-title">{{ $t('pageEditor.availableBlocks') }}</h3>
          <div class="page-editor__blocks-info">{{ $t('pageEditor.availableBlocksInfo') }}</div>
          <div class="custom-checkbox">
            <label>
              <input type="checkbox" v-model="showBlockInfo">
              <span class="custom-checkbox-label">{{ $t('pageEditor.showBlockInfo') }}</span>
            </label>
          </div>
          <div class="block" v-for="(block, i) in blockTypes" :key="i">
            <div class="block-title">{{ $t('blockTypes.' + blockTypes[i] + '.title') }}</div>
            <div class="block-info">{{ $t('blockTypes.' + blockTypes[i] + '.info') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import accordion from '@/components/accordion';
  import customSelect from '@/forms/custom-select';
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: 'page-editor',
    components: {
      'custom-select': customSelect,
      accordion,
    },
    data() {
      const laptopQuery = window.matchMedia('(min-width: 1024px)');
      return {
        laptopViewQuery: laptopQuery,
        isLaptop: laptopQuery.matches,
        alignOptions: [
          'left',
          'right'
        ],
        blockTypes: [
          'carousel',
          'promo-set',
          'recipe',
        ],
        cardTypes: [
          'product-card',
          'category-card',
        ],
        categoryTypes: [
          'categories',
          'cuisines',
          'tags'
        ],
        showBlockInfo: true,
        categoriesData: {
          code: 'categoriesData',
          title: this.$t('blockTypes.main.fields.categories'),
          options: []
        },
        cuisinesData: {
          code: 'cuisinesData',
          title: this.$t('blockTypes.main.fields.cuisines'),
          options: []
        },
        tagsData: {
          code: 'tagsData',
          title: this.$t('blockTypes.main.fields.tags'),
          options: []
        },
      }
    },
    computed: {
      ...mapGetters({
        info: 'RESTAURANT_INFO',
        blocks: 'RESTAURANT_BLOCKS',
        tags: 'TAGS',
      }),
      getAlignData() {
        return {
          code: 'infoAlignment',
          title: this.$t('blockTypes.main.fields.infoAlignment'),
          optionType: 'radio',
          required: true,
          options: this.alignOptions.map((el) => ({ code: el, name: this.$t('alignOptions.' + el + '.title') }))
        }
      },
      getCardData() {
        return {
          code: 'cardData',
          title: this.$t('blockTypes.carousel.fields.cardType'),
          required: true,
          options: this.cardTypes.map((el) => ({ code: el, name: this.$t('cardTypes.' + el + '.title') }))
        }
      },
      getCategoryData() {
        return {
          code: 'categoryData',
          title: this.$t('blockTypes["promo-set"].fields.categoriesType'),
          required: true,
          options: this.categoryTypes.map((el) => ({ code: el, name: this.$t('categoryTypes.' + el + '.title') }))
        }
      }
    },
    methods: {
      ...mapActions([
        'GET_RESTAURANT_INFO_API',
        'GET_RESTAURANT_BLOCKS_API',
        'GET_TAGS_API',
      ]),
    },
    mounted() {
      this.GET_RESTAURANT_INFO_API().then(() => {
        this.categoriesData.options = this.info.db.categories.map((el, i) => ({ code: i, name: el }));
        this.cuisinesData.options = this.info.db.cuisines.map((el, i) => ({ code: i, name: el }));
      });
      this.GET_RESTAURANT_BLOCKS_API();
      this.GET_TAGS_API().then(() => {
        this.tagsData.options = this.tags.map(el => ({ code: el.id, name: el.title }));
      });

      Array.from(this.$el.querySelectorAll('.block')).forEach(el => {
        let info = el.querySelector('.block-info');
        el.addEventListener('mouseover', () => {
          if (!this.showBlockInfo)
            return;
          info.style.height = info.scrollHeight + "px";
        });

        el.addEventListener('mouseout', () => {
          info.style.height = 0;
        });
      });

      this.laptopViewQuery.addEventListener('change', () => {
        this.isLaptop = this.laptopViewQuery.matches;
      });
    },
  }
</script>

<style lang="scss">
  .page-editor {
    &__blocks {
      &-title {
        margin-bottom: .8rem;
      }

      &-info {
        font-size: 1.2rem;
        margin-bottom: 1.2rem;
      }

      .block {
        background-color: $beige;
        border-radius: $radius-medium;
        padding: 1.2rem 2rem;
        margin-top: 1rem;
        cursor: grab;
        user-select: none;

        &-title {
          font-weight: 500;
          font-size: 2rem;
        }

        &-info {
          font-size: 1.2rem;
          margin-top: .4rem;
          height: 0;
          overflow: hidden;
          transition: height .25s ease;
        }
      }
    }
  }

  .block-editor {
    margin-bottom: 1.6rem;

    &__header {
      background-color: $beige;
      border-radius: $radius-medium;
      padding: 1.6rem;
      box-sizing: border-box;
      position: relative;

      @include shadow-bottom($beige-dark);

      &-label {
        position: absolute;
        left: 1.6rem;
        top: 2.4rem;
        transition: all .2s ease;
      }

      &.non-empty {
        .block-editor__header-label {
          font-size: 1.2rem;
          top: .4rem;
          transform: none;
        }
      }
    }

    &__content {
      // if padding is set on acc_content, height:0 doesn't work
      padding: 1.6rem;

      .row > *:not(:last-child) {
        margin-right: 2rem;
      }

      &-title {
        font-size: 2rem;
        font-weight: 500;
        margin: .4rem 0 1.2rem;
      }
    }

    & > .accordion__content {
      border-radius: $radius-medium;
      background-color: $beige-medium;
      box-sizing: border-box;
      position: relative;
      z-index: var(--index);
    }

    .accordion__trigger--active .block-editor__header {
      top: -5px;
      box-shadow: 0 5px 0 $beige-dark;
    }
  }
</style>