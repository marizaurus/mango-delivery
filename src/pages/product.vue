<template>
  <div class="product">
    <div class="container container-slim m-resp block-neat">
      <div class="grid grid-tablet g-2 gg-2">
        <div>
          <!-- v-if delays render until slides are available -->
          <flickity class="flickity-slider--product-image"
            ref="flickity" :options="flickityOptions"
            v-if="productInfo.images.length > 0">
            <div class="carousel-cell"
              v-for="(image, i) in productInfo.images" :key="i">
              <div class="product__image-wrapper">
                <img class="product__image"
                  :data-flickity-lazyload-src="image"
                  alt="product image">
              </div>
            </div>
          </flickity>
        </div>

        <div class="product__info">
          <div class="row">
            <h1 class="product__info-title m-none">{{ productInfo.title }}</h1>
            <h1 class="product__info-rating m-none row">
              <font-awesome-icon icon="star"/>
              <span class="product__info-rating-value">{{ productInfo.rating }}</span>
            </h1>
          </div>
          <div class="product__info-tags">{{ productInfo.tags.join(' · ') }}</div>
          <div class="product__info-controls row">
            <h2 class="product__info-price m-none" v-if="productInfo.newPrice">{{ productInfo.newPrice }} ₽</h2>
            <h2 class="product__info-price m-none" :class="{ 'product__info-price-old': productInfo.newPrice }">{{ productInfo.price }} ₽</h2>
            <button class="product__info-btn btn btn-primary btn-orange-light m-none">
              <span>{{ $t('buttons.toCart') }}</span>
              <font-awesome-icon icon="basket-shopping"/>
            </button>
          </div>
          <div class="product__info-ingredients">
            <accordion :initialVisible="true">
              <template #accordionTrigger>
                <div class="ingredients__header row">{{ $t('blocks.productIngredients') }}</div>
              </template>
              <template #accordionContent>
                <div class="ingredients__body">
                  <div class="ingredients__body-main">
                    <span class="ingredients__item-category">{{ $t('ingredientCategories.main') }}: </span>
                    <span>{{ productInfo.ingredients[0].value }}</span>
                  </div>
                  <div class="grid grid-mobile ingredients__body-grid">
                    <template v-for="(ingredient, i) in productInfo.ingredients.slice(1)" :key="i">
                      <span class="ingredients__item-category">{{ $t('ingredientCategories.' + ingredient.code) }}:</span>
                      <span>{{ingredient.value}}{{ $t('units.' + ingredient.unit) }}</span>
                    </template>
                  </div>
                </div>
              </template>
            </accordion>
          </div>
        </div>
      </div>
      <h2 class="product__ingredients-title">{{ $t('blocks.alterIngredients') }}</h2>
      <div class="product__ingredients row">
        <!-- this z-index is scary, but works -->
        <custom-select class="product__ingredients-option" :style="{ 'z-index': productInfo.alterOptions.length - i }"
          v-for="(option, i) in productInfo.alterOptions" :key="i" :selectData="getAlterOption(option)"/>
      </div>
    </div>
    <div class="m-resp comments">
      <div class="container container-slim">
        <h1 class="comments__title">{{ $t('blocks.ratingComments') }}</h1>
      </div>
      <div class="comments__feedback">
        <form class="container container-slim block-neat">
          <div class="grid grid-tablet g-2 gg-2">
            <div class="comments__form block-neat">
              <div class="row">
                <div class="custom-input">
                  <input type="text" v-on="formEvents('form.name')" v-model="form.name">
                  <label class="custom-input-label" :class="checkFocus('form.name')">{{ $t('forms.name') }}<span class="t-red">*</span></label>
                </div>
                <div class="custom-input comments__form-rating">
                  <star-rating v-bind="formOptions" v-model:rating="form.rating"/>
                  <label class="custom-input-label non-empty">{{ $t('forms.rating') }}<span class="t-red">*</span></label>
                </div>
              </div>
              <div class="custom-input comments__form-comment">
                <textarea class="comments__form-comment-field" rows="5" v-on="formEvents('form.comment')" v-model="form.comment"/>
                <label class="custom-input-label" :class="checkFocus('form.comment')">{{ $t('forms.comment') }}</label>
                <div class="comments__form-comment-check">
                  <div class="custom-checkbox">
                    <label>
                      <input type="checkbox" name="hideComment" v-model="form.hideComment">
                      <span class="custom-checkbox-label">{{ $t('forms.hideComment') }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="comments__features block-neat">
              <div class="comments__features-title">{{ $t('forms.features') }}</div>
              <div class="comments__features-card block-neat">
                <div class="custom-checkbox">
                  <label>
                    <input type="checkbox" name="features">
                    <span class="custom-checkbox-label">{{ $t('forms.speed') }}</span>
                  </label>
                </div>
                <div class="custom-checkbox">
                  <label>
                    <input type="checkbox" name="features">
                    <span class="custom-checkbox-label">{{ $t('forms.ingredients') }}</span>
                  </label>
                </div>
                <div class="custom-checkbox">
                  <label>
                    <input type="checkbox" name="features">
                    <span class="custom-checkbox-label">{{ $t('forms.serving') }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-orange-light m-auto" type="submit">{{ $t('buttons.submit') }}</button>
        </form>
      </div>
      <div class="comments__content container container-slim">
        <div class="grid grid-tablet g-7-3 gg-2">
          <div>
            <div class="comment"
              v-for="comment in comments" :key="comment.id">
              <div class="row">
                <div class="comment-name">{{ comment.name }}</div>
                <star-rating :rating="comment.rating" v-bind="options"/>
              </div>
              <div class="comment-text">{{ comment.text }}</div>
              <div class="comment-reply"
                v-for="reply in comment.replies" :key="reply.id">
                <div class="comment-name">{{ reply.name }}</div>
                <div class="comment-text" v-html="reply.text"/>
              </div>
            </div>
          </div>

          <div class="comments__promo block-neat" id="product-offer" v-if="showCard">
            <h3 class="comments__promo-title">{{ $t('blocks.tryPromo') }}</h3>
            <product-card :itemData="focusedItem" class="m-auto"/>
            <button class="comments__promo-btn btn btn-outline m-auto"
              v-if="showCard" @click="toggleCard">
              {{ $t('buttons.hidePromo') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container product__blocks">
      <h1>{{ $t('blocks.productOffers') }}</h1>
      <component
        v-for="block in blocks" :key="block.id"
        :is="block.type" :blockData="block"/>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import StarRating from 'vue-star-rating'
  import productCard from '@/components/product-card';
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'
  import comboBlock from '@/components/combo-block';
  import customSelect from '@/forms/custom-select';
  import Flickity from 'vue-flickity';
  import accordion from '../components/accordion.vue';
  import _get from 'lodash/get';

  export default {
    name: "product",
    components: {
      'star-rating': StarRating,
      'product-card': productCard,
      'carousel': carousel,
      'promo-set': promoSet,
      'custom-select': customSelect,
      'combo-block': comboBlock,
      Flickity,
      accordion,
    },
    data() {
      return {
        flickityOptions: {
          wrapAround: true,
          accessibility: false,
          cellAlign: 'left',
          groupCells: true,
          lazyLoad: true,
        },
        options: {
          'read-only': true,
          'show-rating': false,
          'rounded-corners': true,
          'border-width': 3,
          'star-size': 17,
          'inactive-color': '#ffffff',
          'active-color': '#ffc93c',
          'border-color': '#ffc93c',
        },
        formOptions: {
          'show-rating': false,
          'rounded-corners': true,
          'border-width': 3,
          'star-size': 17,
          'inactive-color': '#ffffff',
          'active-color': '#ffc93c',
          'border-color': '#ffffff',
          'active-border-color': '#ffc93c',
        },
        showCard: false,
        focusedItem: null,
        activeField: '',
        selectItems: [],
        form: {
          name: '',
          rating: 0,
          comment: '',
          hideComment: false,
        },
      }
    },
    computed: {
      ...mapGetters({
        productInfo: 'PRODUCT_INFO',
        comments: 'COMMENTS',
        blocks: 'CART_BLOCKS',
      }),
    },
    methods: {
      ...mapActions([
        'GET_PRODUCT_INFO_API',
        'GET_COMMENTS_API',
        'GET_CART_BLOCKS_API',
      ]),
      toggleCard() {
        this.focusedItem = null;
        this.showCard = false;
      },
      isMobile() { 
        return window.screen.width < 769;
      },
      formEvents(target) {
        return {
          focus: () => this.setField(target),
          blur: this.clearFocus,
        }
      },
      setField(target) {
        this.activeField = target; 
      },
      clearFocus() {
        this.activeField = '';
      },
      checkFocus(target) {
        return { 'non-empty': this.activeField == target || !!_get(this.$data, target) };
      },
      getAlterOption(option) {
        return {
          code: option.code,
          title: option.title,
          options: option.options,
        }
      }
    },
    mounted() {
      this.GET_PRODUCT_INFO_API();
      this.GET_COMMENTS_API();
      this.GET_CART_BLOCKS_API();
    },
    updated() {
      // until better times ¯\_(ツ)_/¯
      // this.mainIngredients = this.productInfo.ingredients[0].items.map(el => this.$t('ingredients.' + el)).join(', ');

      Array.from(this.$el.querySelectorAll('.product-link')).forEach((el) => {
        el.setAttribute('href', '#product-offer');
        let comment = this.comments.find((item) => item.id == el.dataset.comment);
        let reply = comment.replies.find((item) => item.id == el.dataset.reply);

        // don't scroll the page to featured product on desktop
        el.addEventListener('click', (e) => {
          if (!this.isMobile()) e.preventDefault();
        });

        el.addEventListener('focus', () => {
          this.focusedItem = reply.items.find((item) => item.id == el.dataset.id);
          this.showCard = true;
        });
      });
    }
  }
</script>

<style lang="scss">
  .product {
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity .2s linear;

      &-wrapper {
        max-width: 55rem;
        width: 100%;
        height: 20rem;
        border-radius: $radius-big;
        background-image: url('~@/assets/images/placeholder-big.png');
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      &.flickity-lazyloaded,
      &.flickity-lazyerror {
        opacity: 1;
      }
    }

    &__info {
      &-rating {
        align-self: flex-start;
        margin-left: 1.6rem;
        color: $yellow;

        &-value {
          margin-left: .4rem;
          font-weight: 700;
        }

        svg {
          font-size: 2.6rem;
        }
      }

      &-tags {
        margin: .8rem 0 .4rem;
        color: $grey;
        font-size: 1.4rem;
      }

      &-controls.row {
        align-items: flex-end;
      }

      &-price {
        color: $orange-light;

        &-old {
          text-decoration: line-through;
          color: $grey-medium;
          margin-left: 1.6rem;
          @extend h3;
        }
      }

      &-btn.btn {
        margin-left: auto;
      }

      &-ingredients {
        margin-top: 1.6rem;

        .accordion__trigger {
          position: relative;
          z-index: 2;
        }

        .accordion__content {
          padding: 2.2rem 1.6rem 1.2rem;
          border-radius: $radius-medium;
          box-sizing: border-box;
          position: relative;
          top: -1rem;
          background-color: $white;
          z-index: 1;
        }
      }
    }

    &__ingredients {
      margin-top: -1rem;
      flex-wrap: wrap;

      &-option {
        margin-top: 1rem;
      }
    }

    &__blocks {
      & > div:first-of-type {
        margin-top: 0;
      }
    }
  }

  .ingredients {
    &__header {
      background-color: $beige;
      border-radius: $radius-medium;
      padding: 1.6rem 1rem;
      box-sizing: border-box;
      @include shadow-bottom($beige-dark);
      font-weight: 500;
    }

    &__body {
      &-main {
        margin-bottom: .6rem;
      }

      &-grid {
        grid-template-columns: 15rem auto;
        grid-gap: .6rem;
      }
    }

    &__item {
      &-category {
        font-weight: 500;
      }
    }
  }

  .accordion__trigger--active .ingredients__header {
    top: -5px;
    box-shadow: 0 5px 0 $beige-dark;
  }

  .comments {
    &__feedback {
      background-color: $beige-medium;
      padding: 2rem 0;
      min-width: 390px;
    }

    &__form {
      & > .row {
        align-items: stretch;
      }

      &-rating.custom-input {
        margin-left: 1.2rem;

        label.non-empty {
          color: $grey-dark;
        }
      }

      .vue-star-rating-star {
        height: 20px;
      }

      &-comment {
        textarea.comments__form-comment-field {
          border-top: 1.6rem solid;
          border-bottom: 3.5rem solid;
          border-color: $white;
          padding: 0 1rem;
        }

        &-check {
          position: absolute;
          bottom: .5rem;
          left: 1rem;
        }
      }
    }

    &__features {
      &-title {
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: .8rem;
      }

      &-card {
        background-color: $white;
        border-radius: $radius-small;
        padding: 1.2rem 1.6rem;
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        box-sizing: border-box;
        // temp margin
        margin-bottom: .8rem;
      }
    }

    &__promo {
      &-btn {
        margin-top: 1.6rem;
      }
    }

    &__content.container {
      margin-top: 2.4rem;
      padding: 0;
    }
  }

  .comment {
    padding: 1.2rem 1.6rem;
    border-radius: $radius-medium;

    &:first-child {
      padding-top: 0;
    }

    &:last-child:nth-child(odd) {
      padding-bottom: 0;
    }

    &:nth-child(even) {
      background-color: $white;
    }

    &-name {
      font-size: 1.8rem;
      font-weight: 700;
      margin-right: 1rem;
    }

    &-text {
      margin-top: .8rem;
      font-size: 1.4rem;
    }

    .vue-star-rating-star {
      height: 19px;
    }

    &-reply {
      margin-top: 1.2rem;
      margin-left: 2.4rem;
    }

    .product-link {
      font-weight: 400;
    }
  }

  @include breakpoint(tablet) {
    .product {
      &__image-wrapper {
        height: 37rem;
      }

      &__info {
        &-rating {
          margin-left: 2.4rem;

          &-value {
            margin-left: .8rem;
          }

          svg {
            font-size: 3.2rem;
          }
        }

        &-tags {
          font-size: 1.6rem;
        }
      }
    }

    .comments__content.container {
      padding: 0 1.6rem;
    }

    .comment {
      &-text {
        font-size: 1.6rem;
      }

      &-reply {
        margin-left: 4.4rem;
      }
    }
  }
</style>
