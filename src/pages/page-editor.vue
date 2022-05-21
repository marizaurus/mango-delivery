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
              <div class="block-editor__content block-neat grid gv-1">
                <div class="custom-input">
                  <textarea rows="5" v-on="formEvents('editor.main.description')" v-model="editor.main.description"/>
                  <label class="custom-input-label" :class="checkFocus('editor.main.description')">{{ $t('blockTypes.main.fields.description') }}</label>
                </div>
                <div class="grid grid-mobile g-4 gg-1">
                  <div class="custom-input">
                    <input type="text" v-on="formEvents('editor.main.orderSum')" v-model="editor.main.orderSum">
                    <label class="custom-input-label" :class="checkFocus('editor.main.orderSum')">{{ $t('blockTypes.main.fields.orderMin') }}<span class="t-red">*</span></label>
                  </div>
                  <custom-select class="select-form wide" :selectData="editor.main.alignData" v-if="editor.main.alignData" :style="{ 'z-index': 3 }" @selectUpdated="editor.main.infoAlignment = $event"/>
                </div>
                <div class="block-editor__content-title">{{ $t('blockTypes.main.fields.сategoriesTitle') }}</div>
                <div class="grid grid-mobile g-4 gg-1">
                  <custom-select class="select-form wide" :selectData="editor.main.categoriesData" v-if="editor.main.categoriesData" @selectUpdated="editor.main.categories = $event"/>
                  <custom-select class="select-form wide" :selectData="editor.main.cuisinesData" v-if="editor.main.cuisinesData" @selectUpdated="editor.main.cuisines = $event"/>
                  <custom-select class="select-form wide" :selectData="editor.main.tagsData" v-if="editor.main.tagsData" @selectUpdated="editor.main.tags = $event"/>
                </div>
              </div>
            </template>
          </accordion>

          <accordion class="block-editor" v-for="(block, i) in editor.blocks" :key="block.id" :style="{ '--index': editor.blocks.length - i }">
            <template #accordionTrigger>
              <div class="block-editor__header non-empty">
                <span class="block-editor__header-label">{{ $t('blockTypes.' + block.type + '.title') }}</span>
                <h3 class="block-editor__header-title m-none">{{ block.title || $t('blockTypes.' + block.type + '.title') }}</h3>
              </div>
            </template>
            <template #accordionContent>
              <div class="block-editor__content block-neat">

                <!-- fuck this one -->
                <template v-if="block.type == 'carousel'">
                <div class="grid grid-mobile g-1-2 gg-2">
                  <div class="grid gv-1 grid-start">
                    <div class="custom-input wide">
                      <input type="text" class="t-cut" v-on="formEvents('editor.blocks[' + i + '].title')" v-model="block.title">
                      <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].title')">{{ $t('blockTypes.recipe.fields.title') }}<span class="t-red">*</span></label>
                    </div>
                    <custom-select class="select-form wide" :selectData="block.fullTagData" v-if="block.fullTagData" :style="{ 'z-index': 3 }" @selectUpdated="block.tagType = $event; block.items = []"/>
                    <custom-select class="select-form wide" :selectData="block.categoriesData" v-if="block.categoriesData" v-show="block.tagType == 'categories'" @selectUpdated="($event) => updateCategories($event, block.items)"/>
                    <custom-select class="select-form wide" :selectData="block.cuisinesData" v-if="block.cuisinesData" v-show="block.tagType == 'cuisines'" @selectUpdated="($event) => updateCuisines($event, block.items)"/>
                    <custom-select class="select-form wide" :selectData="block.tagsData" v-if="block.tagsData" v-show="block.tagType == 'tags'" @selectUpdated="($event) => updateTags($event, block.items)"/>
                  </div>
                  <div class="grid gv-1 grid-start">
                    <div class="block-editor__content-title">{{ $t('blockTypes.carousel.fields.cardsData') }}<span class="t-red">*</span></div>
                    <div class="block-editor__items-box grid-start row">
                      <div class="list-group-wrapper">
                        <draggable
                          class="list-group grid" tag="transition-group"
                          :list="block.items" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" :itemKey="(el) => el" handle=".handle"
                          :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                          <template #item="{ element, index }">
                            <div class="row list-group-item">
                              <tag-card v-if="block.tagType != 'products' && element" :itemData="element"/>
                              <product v-else-if="element" :itemData="element" :showHandle="true"/>
                              <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.items, index)"/>
                            </div>
                          </template>
                        </draggable>
                        <button class="btn bg-white block-editor__btn-add" :class="{ 'gap': block.items.length > 0 }" @click="() => openModal(block.items)" v-if="block.tagType == 'products'">
                          <font-awesome-icon icon="plus"/>
                          <span>{{ $t('buttons.pressToAddProduct') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </template>

                <template v-else-if="block.type == 'promo-set'">
                  <div class="grid grid-mobile g-2 gg-2">
                    <div class="grid gv-1 grid-start">
                      <div class="grid grid-mobile g-3-1 gg-1">
                        <div class="custom-input wide">
                          <input type="text" v-on="formEvents('editor.blocks[' + i + '].title')" v-model="block.title">
                          <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].title')">{{ $t('blockTypes.recipe.fields.title') }}<span class="t-red">*</span></label>
                        </div>
                        <emoji-picker/>
                      </div>
                      <div class="custom-input">
                        <textarea rows="5" v-on="formEvents('editor.blocks[' + i + '].description')" v-model="block.description"/>
                        <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].description')">{{ $t('blockTypes["promo-set"].fields.description') }}<span class="t-red">*</span></label>
                      </div>
                      <div class="grid grid-mobile g-2 gg-1">
                        <custom-select class="select-form wide" :selectData="block.tagData" v-if="block.tagData" :style="{ 'z-index': 3 }" @selectUpdated="block.tagType = $event; block.tags = []"/>
                        <custom-select class="select-form wide" :selectData="block.categoriesData" v-if="block.categoriesData" v-show="block.tagType == 'categories'" @selectUpdated="block.tags = $event"/>
                        <custom-select class="select-form wide" :selectData="block.cuisinesData" v-if="block.cuisinesData" v-show="block.tagType == 'cuisines'" @selectUpdated="block.tags = $event"/>
                        <custom-select class="select-form wide" :selectData="block.tagsData" v-if="block.tagsData" v-show="block.tagType == 'tags'" @selectUpdated="block.tags = $event"/>
                        <custom-select class="select-form wide" :selectData="block.alignData" v-if="block.alignData" @selectUpdated="block.infoAlignment = $event"/>
                         <!-- && block.tagsData.options.length -->
                      </div>
                    </div>
                    <div class="grid gv-1 grid-start">
                      <div class="block-editor__content-title">{{ $t('blockTypes["promo-set"].fields.setItems') }}<span class="t-red">*</span></div>
                      <div class="block-editor__items-box grid-start row">
                        <div class="list-group-wrapper">
                          <div class="custom-checkbox">
                            <label>
                              <input type="checkbox" v-model="block.showAllBtn">
                              <span class="custom-checkbox-label">{{ $t('blockTypes["promo-set"].fields.showAllBtn') }}</span>
                            </label>
                          </div>
                          <draggable
                            class="list-group grid" tag="transition-group"
                            :list="block.items" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" :itemKey="(el) => el" handle=".handle"
                            :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                            <template #item="{ element, index }">
                              <div class="row list-group-item">
                                <product :itemData="element" :showHandle="true" v-if="element"/>
                                <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.items, index)"/>
                              </div>
                            </template>
                          </draggable>
                          <button class="btn bg-white block-editor__btn-add" :class="{ 'gap': block.items.length > 0 }" @click="() => openModal(block.items)">
                            <font-awesome-icon icon="plus"/>
                            <span>{{ $t('buttons.pressToAddProduct') }}</span>
                          </button>
                        </div>
                      </div>
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
                    <div class="block-editor__items-box grid-start row">
                      <div class="grid">
                        <div class="list-group-item-number" v-for="(item, i) in block.steps" :key="i">{{ zeroPad(i + 1, 2) }}</div>
                      </div>
                      <div class="list-group-wrapper">
                        <draggable
                          class="list-group grid" tag="transition-group"
                          :list="block.steps" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" :itemKey="(el) => el" handle=".handle"
                          :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                          <template #item="{ element, index }">
                            <div class="row list-group-item">
                              <step :itemData="element" :stepType="'recipe'" v-if="element"/>
                              <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.steps, index)"/>
                            </div>
                          </template>
                        </draggable>
                        <button class="btn bg-white block-editor__btn-add" :class="{ 'gap': block.steps.length > 0 }" @click="() => addDraggable(block.steps)">
                          <font-awesome-icon icon="plus"/>
                          <span>{{ $t('buttons.pressToAddElement') }}</span>
                        </button>
                      </div>
                    </div>
                    <div class="block-editor__items-box grid-start">
                      <draggable
                        class="list-group grid" tag="transition-group"
                        :list="block.ingredients" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" :itemKey="(el) => el" handle=".handle"
                        :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                        <template #item="{ element, index }">
                        <div class="row list-group-item">
                          <ingredient :itemData="element" :indexes="[i, index]" :style="{ '--ingr-index': block.ingredients.length - index }" v-if="element"/>
                          <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.ingredients, index)"/>
                        </div>
                        </template>
                      </draggable>
                      <button class="btn bg-white block-editor__btn-add" :class="{ 'gap': block.ingredients.length > 0 }" @click="() => addDraggable(block.ingredients)">
                        <font-awesome-icon icon="plus"/>
                        <span>{{ $t('buttons.pressToAddElement') }}</span>
                      </button>
                    </div>
                    <div class="custom-input wide">
                      <input type="text" v-on="formEvents('editor.blocks[' + i + '].productTitle')" v-model="block.productTitle">
                      <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].productTitle')">{{ $t('blockTypes.recipe.fields.productTitle') }}</label>
                    </div>
                    <div class="custom-input wide">
                      <input type="text" v-on="formEvents('editor.blocks[' + i + ']..item.title')" v-model="block.item.title">
                      <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].item.title')">{{ $t('blockTypes.recipe.fields.product') }}<span class="t-red">*</span></label>
                    </div>
                  </div>
                </template>

                <template v-else-if="block.type == 'numbered-list'">
                  <div class="grid gv-1">
                    <div class="grid grid-mobile g-2 gg-2">
                      <div class="custom-input wide">
                        <input type="text" v-on="formEvents('editor.blocks[' + i + '].title')" v-model="block.title">
                        <label class="custom-input-label" :class="checkFocus('editor.blocks[' + i + '].title')">{{ $t('blockTypes["numbered-list"].fields.title') }}<span class="t-red">*</span></label>
                      </div>
                    </div>
                    <div class="block-editor__content-title">{{ $t('blockTypes["numbered-list"].fields.listItems') }}<span class="t-red">*</span></div>
                    <div class="block-editor__items-box grid-start row">
                      <div class="grid">
                        <div class="list-group-item-number" v-for="(item, i) in block.items" :key="i">{{ zeroPad(i + 1, 2) }}</div>
                      </div>
                      <div class="list-group-wrapper">
                        <draggable
                          class="list-group grid" tag="transition-group"
                          :list="block.items" v-bind="dragOptions" @start="block.drag = true" @end="block.drag = false" :itemKey="(el) => el" handle=".handle"
                          :component-data="{ tag: 'div', type: 'transition-group', name: !block.drag ? 'flip-list' : null }">
                          <template #item="{ element, index }">
                            <div class="row list-group-item">
                              <step :itemData="element" v-if="element"/>
                              <font-awesome-icon icon="xmark" class="icon-close" @click="removeDraggableAt(block.items, index)"/>
                            </div>
                          </template>
                        </draggable>
                        <button class="btn bg-white block-editor__btn-add" :class="{ 'gap': block.items.length > 0 }" @click="() => addDraggable(block.items)">
                          <font-awesome-icon icon="plus"/>
                          <span>{{ $t('buttons.pressToAddElement') }}</span>
                        </button>
                      </div>
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
    <modal v-show="modalActive" @close="closeModal">
      <template #header>
        <h2 class="m-none">{{ $t('modal.productChoice') }}</h2>
      </template>
    
      <template #body>
        <div class="block-editor__product-modal grid grid-mobile g-2 gg-2 gv-1">
          <div class="grid gv-1 grid-start">
            <div class="block-editor__content-title">{{ $t('modal.availableProducts') }}</div>
            <div class="custom-input">
              <input type="text" v-on="formEvents('searchParams.query')" v-model="searchParams.query">
              <label class="custom-input-label" :class="checkFocus('searchParams.query')">{{ $t('forms.search') }}</label>
            </div>
            <div class="block-editor__items-box block-editor__items-box--short grid-start">
              <div class="grid">
                <product v-for="product in products" :itemData="product" :active="checkActive(product)" :invalid="checkInvalid(product)" class="c-pointer" :key="product.id" @click="() => setActiveProduct(product)"/>
              </div>
            </div>
          </div>
          <div class="grid gv-1 grid-start">
            <div class="block-editor__content-title">{{ $t('modal.chosenProduct') }}</div>
            <product-card :itemData="activeProduct" :hideFavorite="true" v-if="activeProduct"/>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="grid grid-mobile g-2 gg-2">
          <button class="btn btn-outline ml-auto grid-center" @click="closeModal">{{ $t('buttons.cancel') }}</button>
          <div>
            <button class="btn btn-primary btn-green-light m-none" @click="() => addDraggable(activeList, activeProduct)">{{ $t('buttons.choose') }}</button>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import accordion from '@/components/accordion';
  import customSelect from '@/forms/custom-select';
  import emojiPicker from '@/forms/emoji-picker';
  import productCard from '@/components/product-card';
  import ingredient from '@/forms/ingredient';
  import modal from '@/forms/modal';
  import step from '@/forms/step';
  import tagCard from '@/forms/tag-card';
  import product from '@/forms/product';
  import _get from 'lodash/get';
  import draggable from 'vuedraggable'
  import { mapGetters } from 'vuex';

  export default {
    name: 'page-editor',
    components: {
      'custom-select': customSelect,
      'emoji-picker': emojiPicker,
      'product-card': productCard,
      'tag-card': tagCard,
      ingredient,
      step,
      product,
      modal,
      accordion,
      draggable,
    },
    data() {
      const laptopQuery = window.matchMedia('(min-width: 1024px)');
      return {
        laptopViewQuery: laptopQuery,
        isLaptop: laptopQuery.matches,
        modalActive: false,
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
          'products',
          // 'combo-cards',
        ],
        tagTypes: [
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
        editor: {
          activeField: '',
          main: {},
          blocks: [],
        },
        searchParams: {
          query: '',
        },
        products: [],
        activeProduct: null,  // new chosen product
        activeList: null,     // list to add a new product to
      }
    },
    computed: {
      ...mapGetters({
        categories: 'getCategories',
        cuisines: 'getCuisines',
        tags: 'getTags',
      }),
      dragOptions() {
        return {
          animation: 200,
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
      // modal
      openModal(list) {
        this.modalActive = true;
        document.querySelector('body').classList.add('modal-open');

        this.activeList = list;
        this.activeProduct = this.products.find((el) => !this.activeList.some((item) => el.id == item.id));
      },
      closeModal() {
        this.modalActive = false;
        document.querySelector('body').classList.remove('modal-open');
      },
      setActiveProduct(product) {
        this.activeProduct = product;
      },
      checkActive(product) {
        if (this.activeProduct)
          return this.activeProduct.id == product.id;
      },
      checkInvalid(product) {
        if (this.activeList)
          return this.activeList.some((el) => el.id == product.id);
      },
      // draggable
      removeDraggableAt(list, i) {
        list.splice(i, 1);
      },
      addDraggable(list, product) {
        if (product) {
          list.push(product);
          this.closeModal();
        }
        else list.push({});
      },
      updateCategories(items, list) {
        // let extraCodes = items.filter((el) => !list.some((i) => i.code == el));
        // let extraItems = list.filter((el) => !items.includes(el.code));
        items.forEach((item) => {
          if (!list.some((el) => el.code == item)) {
            list.push({ type: 'category-card', code: item, title: this.categories[item] });
          }
        })
      },
      updateCuisines(items, list) {
        items.forEach((item) => {
          if (!list.some((el) => el.code == item)) {
            list.push({ type: 'cuisine-card', code: item, title: this.cuisines[item] });
          }
        })
      },
      updateTags(items, list) {
        items.forEach((item) => {
          if (!list.some((el) => el.code == item)) {
            list.push({ type: 'tag', code: item, title: this.tags.find((el) => el.code == item).name });
          }
        })
      },
      // add fancy zeros
      zeroPad(num, places) {
        return String(num).padStart(places, '0');
      },
      // select data generators
      getAlignData(i, isChecked) {
        return {
          code: 'alignData-' + i,
          title: this.$t('blockTypes.main.fields.infoAlignment'),
          optionType: 'radio',
          options: JSON.parse(JSON.stringify(this.alignOptions)).map(el => ({ code: el, name: this.$t('alignOptions.' + el), isChecked: isChecked(el) })),
        }
      },
      getCategoriesData(i, isChecked) {
        return {
          code: 'categoriesData-' + i,
          title: this.$t('blockTypes.main.fields.categories'),
          options: Object.entries(Object.assign({}, this.categories)).map(([key, value]) => ({ code: key, name: value, isChecked: isChecked(key) }))
        }
      },
      getCuisinesData(i, isChecked) {
        return {
          code: 'cuisinesData-' + i,
          title: this.$t('blockTypes.main.fields.cuisines'),
          options: Object.entries(Object.assign({}, this.cuisines)).map(([key, value]) => ({ code: key, name: value, isChecked: isChecked(key) })) 
        }
      },
      getTagsData(i, isChecked) {
        return {
          code: 'tagsData-' + i,
          title: this.$t('blockTypes.main.fields.tags'),
          options: JSON.parse(JSON.stringify(this.tags)).map((el) => ({ code: el.code, name: el.name, isChecked: isChecked(el.code) }))
        }
      },
      getTagData(i, isChecked) {
        return {
          code: 'tagData-' + i,
          title: this.$t('tagTypes.tagType'),
          optionType: 'radio',
          options: JSON.parse(JSON.stringify(this.tagTypes)).map(el => ({ code: el, name: this.$t('tagTypes.' + el), isChecked: isChecked(el) })),
        }
      },
      getFullTagData(i, isChecked) {
        return {
          code: 'fullTagData-' + i,
          title: this.$t('tagTypes.tagType'),
          optionType: 'radio',
          options: [].concat(JSON.parse(JSON.stringify(this.tagTypes)), JSON.parse(JSON.stringify(this.cardTypes))).map(el => ({ code: el, name: this.$t('tagTypes.' + el), isChecked: isChecked(el) })),
        }
      },
    },
    async created() {
      this.$load(async () => {
        let res = await this.$api.editor.getRestaurant();
        this.editor = res.data || res;
      }).then(() => {
        this.editor.main.alignData = this.getAlignData(0, (el) => this.editor.main.infoAlignment == el);
        this.editor.main.categoriesData = this.getCategoriesData(0, (el) => this.editor.main.categories.includes(el));
        this.editor.main.cuisinesData = this.getCuisinesData(0, (el) => this.editor.main.cuisines.includes(el));
        this.editor.main.tagsData = this.getTagsData(0, (el) => this.editor.main.tags.includes(el));

        this.editor.blocks.forEach((block, i) => {
          switch(block.type) {
            case 'promo-set':
              block.tagData = this.getTagData(i + 1, (el) => block.tagType == el);
              block.categoriesData = this.getCategoriesData(i + 1, (el) => block.tags.includes(el));
              block.cuisinesData = this.getCuisinesData(i + 1, (el) => block.tags.includes(el));
              block.tagsData = this.getTagsData(i + 1, (el) => block.tags.includes(el));
              block.alignData = this.getAlignData(i + 1, (el) => block.infoAlignment == el);
              break;
            case 'carousel':
              block.fullTagData = this.getFullTagData(i + 1, (el) => block.tagType == el);
              block.categoriesData = this.getCategoriesData(i + 1, (el) => block.items.some((item) => item.code == el));
              block.cuisinesData = this.getCuisinesData(i + 1, (el) => block.items.some((item) => item.code == el));
              block.tagsData = this.getTagsData(i + 1, (el) => block.items.some((item) => item.code == el));
              break;
            case 'recipe':
              // block.steps.forEach((el, i) => el.order = i + 1);
              // block.ingredients.forEach((el, i) => el.order = i + 1);
              break;
            case 'numbered-list':
              // block.items.forEach((el, i) => el.order = i + 1);
              break;
          }
        });
      });

      this.$load(async () => {
        let res = await this.$api.products.getProducts();
        this.products = res.data || res;
      })
    },
    mounted() {
      Array.from(this.$el.querySelectorAll('.block')).forEach(el => {
        let info = el.querySelector('.block-info');
        // TODO: move to methods
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
    }
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
      border: 1.2rem solid $white;
      background-color: $white;
      border-radius: $radius-small;

      &--short {
        max-height: 25rem;
        overflow-y: scroll;
      }

      & .grid {
        row-gap: .8rem;
      }
    }

    &__btn-add {
      padding: .8rem 0;
      color: $grey-medium;
      font-size: 1.2rem;
      align-items: center;
      display: flex;

      svg {
        font-size: 2.4rem;
        margin-right: 1.2rem;
      }

      &.gap {
        margin-top: .8rem;
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
    &__product-modal.grid.grid-mobile.g-2 {
      grid-template-columns: auto 250px;
    }
  }
</style>