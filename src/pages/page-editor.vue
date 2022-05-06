<template>
  <div class="page-editor">
    <div class="container container-slim m-resp">
      <h1 class="page-editor__title">{{ $t('pageEditor.title') }}</h1>
      <div class="t-red t-medium" v-if="!isLaptop">{{ $t('pageEditor.mobileNotice') }}</div>
      <div class="grid grid-laptop g-7-3 gg-2" v-if="this.isLaptop">
        <div class="page-editor__content block-neat">
          <accordion class="block-editor" :initialVisible="true"
            :style="{ '--index': editor.blocks.length + 1 }">
            <template #accordionTrigger>
              <div class="block-editor__header non-empty">
                <span class="block-editor__header-label">{{ $t('blockTypes.main.title') }}</span>
                <h3 class="block-editor__header-title m-none">{{ editor.main.title }}</h3>
              </div>
            </template>
            <template #accordionContent>
              <div class="block-editor__content block-neat">
                <div class="custom-input">
                  <textarea rows="5" v-on="formEvents('editor.info.description')" v-model="editor.main.description"/>
                  <label class="custom-input-label" :class="checkFocus('editor.info.description')">{{ $t('blockTypes.main.fields.description') }}</label>
                </div>
                <div class="row">
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('editor.info.orderSum')" v-model="editor.main.orderSum">
                    <label class="custom-input-label" :class="checkFocus('editor.info.orderSum')">{{ $t('blockTypes.main.fields.orderMin') }}<span class="t-red">*</span></label>
                  </div>
                  <custom-select class="select-form" :selectData="alignData" :style="{ 'z-index': 3 }"/>
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
          <accordion class="block-editor" v-for="(block, i) in editor.blocks" :key="block.id" :style="{ '--index': editor.blocks.length - i }">
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
                      <div class="row">
                        <div class="custom-input">
                          <input type="text">
                          <label class="custom-input-label">{{ $t('blockTypes["promo-set"].fields.title') }}<span class="t-red">*</span></label>
                        </div>
                        <emoji-picker/>
                      </div>
                      <div class="custom-input">
                        <textarea rows="5"/>
                        <label class="custom-input-label">{{ $t('blockTypes["promo-set"].fields.description') }}<span class="t-red">*</span></label>
                      </div>
                      <custom-select class="select-form" :selectData="getCategoryData"/>
                    </div>
                  </div>
                </template>

                <template v-else-if="block.type == 'recipe'">
                  <div class="grid grid-mobile g-2 gg-2 gv-1">
                    <div class="grid grid-mobile g-3-1 gg-1">
                      <div class="custom-input wide">
                        <input type="text" v-on="formEvents('editor.blocks[' + i + '].title')" v-model="block.title">
                        <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].title')">{{ $t('blockTypes.recipe.fields.title') }}<span class="t-red">*</span></label>
                      </div>
                      <emoji-picker/>
                    </div>
                    <div></div>
                    <div class="block-editor__content-title">{{ $t('blockTypes.recipe.fields.recipeSteps') }}<span class="t-red">*</span></div>
                    <div class="block-editor__content-title">{{ $t('blockTypes.recipe.fields.ingredients') }}<span class="t-red">*</span></div>
                    <!-- V-IF DELAYS RENDER TILL DATA IS RECEIVED #2 (also element, not item) -->
                    <!-- also this comment breaks shit when placed inside draggable. do not comment, kids -->
                    <div class="block-editor__items-box grid-start">
                      <draggable
                        class="list-group grid" tag="transition-group"
                        :list="block.steps" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" item-key="order" handle=".handle"
                        :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                        <template #item="{ element, index }">
                          <div class="row list-group-item">
                            <step :itemData="element" v-if="element"/>
                            <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.steps, index)"/>
                          </div>
                        </template>
                      </draggable>
                      <button class="btn bg-white block-editor__btn-add" @click="() => addDraggable(block.steps)">
                        <font-awesome-icon icon="plus"/>
                        <span>{{ $t('buttons.pressToAddElement') }}</span>
                      </button>
                    </div>
                    <div class="block-editor__items-box grid-start">
                      <draggable
                        class="list-group grid" tag="transition-group"
                        :list="block.ingredients" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" item-key="order" handle=".handle"
                        :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                        <template #item="{ element, index }">
                        <div class="row list-group-item">
                          <ingredient :itemData="element" :style="{ '--ingr-index': block.ingredients.length - index }" v-if="element"/>
                          <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.ingredients, index)"/>
                        </div>
                        </template>
                      </draggable>
                      <button class="btn bg-white block-editor__btn-add" @click="() => addDraggable(block.ingredients)">
                        <font-awesome-icon icon="plus"/>
                        <span>{{ $t('buttons.pressToAddElement') }}</span>
                      </button>
                    </div>
                    <div class="custom-input wide">
                      <input type="text" v-on="formEvents('editor.blocks[' + i + '].productTitle')" v-model="block.productTitle">
                      <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].productTitle')">{{ $t('blockTypes.recipe.fields.productTitle') }}</label>
                    </div>
                    <div class="custom-input wide">
                      <input type="text" v-on="formEvents('editor.blocks[' + i + '].product')" v-model="block.product">
                      <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].product')">{{ $t('blockTypes.recipe.fields.product') }}<span class="t-red">*</span></label>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </accordion>
        </div>

        <div class="page-editor__blocks">
          <div class="block-sticky--laptop block-neat">
            <h3 class="page-editor__blocks-title">{{ $t('pageEditor.availableBlocks') }}</h3>
            <div class="page-editor__blocks-info">{{ $t('pageEditor.availableBlocksInfo') }}</div>
            <div class="custom-checkbox">
              <label>
                <input type="checkbox" v-model="showBlockInfo">
                <span class="custom-checkbox-label">{{ $t('pageEditor.showBlockInfo') }}</span>
              </label>
            </div>
            <div class="block" v-for="(block, i) in blockTypes" :key="i">
              <div class="block-title">{{ $t('blockTypes.' + block + '.title') }}</div>
              <div class="block-info">{{ $t('blockTypes.' + block + '.info') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import accordion from '@/components/accordion';
  import customSelect from '@/forms/custom-select';
  import emojiPicker from '@/forms/emoji-picker';
  import ingredient from '@/forms/ingredient';
  import step from '@/forms/step';
  import _get from 'lodash/get';
  import draggable from 'vuedraggable'

  export default {
    name: 'page-editor',
    components: {
      'custom-select': customSelect,
      'emoji-picker': emojiPicker,
      ingredient,
      step,
      accordion,
      draggable,
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
          'combo',
          'numbered-list'
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
        showBlockInfo: false,
        alignData: {
          code: 'infoAlignment',
          title: this.$t('blockTypes.main.fields.infoAlignment'),
          optionType: 'radio',
          options: [],
        },
        categoriesData: {
          code: 'categoriesData',
          title: this.$t('blockTypes.main.fields.categories'),
          options: [],
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
        // the doom is upon us
        editor: {
          activeField: '',
          main: {
            infoAlignment: '',
            image: '',
            title: '',
            description: '',
            orderSum: 0,
            categories: [],
            cuisines: [],
            tags: []
          },
          blocks: [
            // {
            //   id: 0,
            //   type: '',
            //   title: '',
            //   description: '',
            //   infoAlignment: '',
            //   tagType: '',
            //   categories: [],
            //   cuisines: [],
            //   tags: [],
            //   items: [],
            //   steps: [],
            //   ingredients: [],
            //   productTitle: '',
            //   product: '',              // TODO: convert to object once product picker is done
            //   drag: false,
            // }
          ],
        },
      }
    },
    computed: {
      getCardData() {
        return {
          code: 'cardData',
          title: this.$t('blockTypes.carousel.fields.cardType'),
          required: true,
          options: this.cardTypes.map((el) => ({ code: el, name: this.$t('cardTypes.' + el + '.title') })),
        }
      },
      getCategoryData() {
        return {
          code: 'categoryData',
          title: this.$t('blockTypes["promo-set"].fields.categoriesType'),
          required: true,
          options: this.categoryTypes.map((el) => ({ code: el, name: this.$t('categoryTypes.' + el + '.title') })),
        }
      },
      dragOptions() {
        return {
          animation: 200,
          group: "items",
          disabled: false,
          ghostClass: "ghost"
        };
      },
    },
    methods: {
      // forms
      formEvents(target) {
        return {
          focus: () => this.setField(target),
          blur: this.clearFocus,
        }
      },
      setField(target) {
        this.editor.activeField = target; 
      },
      clearFocus() {
        this.editor.activeField = '';
      },
      checkFocus(target) {
        return { 'non-empty': this.editor.activeField == target || !!_get(this.$data, target) };
      },
      removeDraggableAt(list, i) {
        list.splice(i, 1);
      },
      addDraggable(list) {
        list.push({ order: list.length + 2 });
      }
    },
    mounted() {
      this.$load(async () => {
        this.editor = (await this.$api.editor.getRestaurant()).data;
        this.editor.blocks.forEach((block) => {
          if (block.type != 'recipe') return;

          block.steps.forEach((el, i) => el.order = i + 1);
          block.ingredients.forEach((el, i) => el.order = i + 1);
        })
      })

      // this.categoriesData.options = this.info.db.categories.map((el, i) => ({ code: i, name: el }));
      // this.cuisinesData.options = this.info.db.cuisines.map((el, i) => ({ code: i, name: el }));

      // this.GET_TAGS_API().then(() => {
      //   this.tagsData.options = this.tags.map(el => ({ code: el.id, name: el.title }));
      // });

      Array.from(this.$el.querySelectorAll('.block')).forEach(el => {
        let info = el.querySelector('.block-info');
        // move to methods
        el.addEventListener('mouseover', () => {
          if (!this.showBlockInfo) return;
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

      // .row > *:not(:last-child) {
      //   margin-right: 2rem;
      // }

      &-title {
        font-size: 2rem;
        font-weight: 500;
      }
    }

    &__items-box {
      padding: 1.2rem;
      background-color: $white;
      border-radius: $radius-small;

      & > .grid {
        row-gap: .8rem;
      }
    }

    &__btn-add {
      padding: .8rem 0;
      color: $grey-medium;
      font-size: 1.2rem;
      width: 100%;
      align-items: center;
      display: flex;
      margin-top: .8rem;

      svg {
        font-size: 2.4rem;
        margin-right: 1.2rem;
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