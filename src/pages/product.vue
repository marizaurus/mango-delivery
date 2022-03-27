<template>
  <div class="product">
    <div class="container container-slim m-resp block-neat">
      <h2 class="product__ingredients-title">{{ $t('blocks.alterIngredients') }}</h2>
      <div class="product__ingredients row">
        <custom-select
          v-for="(option, i) in productInfo.ingredientOptions" :key="i"
          :selectData="option"/>
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
                  <input type="text" id="name" @focus="currentField = 'name'" @blur="clearFocus" v-model="form.name">
                  <!-- try to separate non-empty logic into watcher/computed/??? -->
                  <!-- upd: and focus/blur for extra points :3 -->
                  <!-- upd: separate as components??? -->
                  <label class="custom-input-label" :class="{ 'non-empty' :  currentField == 'name' || !!form.name }" for="name">{{ $t('forms.name') }}<span class="t-red">*</span></label>
                </div>
                <div class="custom-input comments__form-rating">
                  <star-rating v-bind="formOptions" v-model:rating="form.rating"/>
                  <label class="custom-input-label non-empty">{{ $t('forms.rating') }}<span class="t-red">*</span></label>
                </div>
              </div>
              <div class="custom-input comments__form-comment">
                <textarea id="text" class="comments__form-comment-field" rows="5" @focus="currentField = 'comment'" @blur="clearFocus" v-model="form.comment"/>
                <label class="custom-input-label" for="text" :class="{ 'non-empty' :  currentField == 'comment' || !!form.comment }">{{ $t('forms.comment') }}</label>
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
                <div class="custom-radio">
                  <label>
                    <input type="radio" name="serving">
                    <span class="custom-checkbox-label">{{ $t('forms.serving') }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary btn-orange-light m-auto" type="submit">{{ $t('buttons.submit') }}</button>
        </form>
      </div>
      <div class="container container-slim">
        <div class="comments__content grid grid-tablet g-7-3 gg-2">
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

          <div class="comments__promo block-neat"
            id="product-offer"
            v-if="showCard">
            <h3 class="comments__promo-title">{{ $t('blocks.tryPromo') }}</h3>
            <product-card
              :itemData="focusedItem"
              class="m-auto"/>
            <button class="comments__promo-btn btn btn-outline m-auto"
              v-if="showCard"
              @click="toggleCard">
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
  import customSelect from '@/forms/custom-select';

  export default {
    name: "product",
    components: {
      'star-rating': StarRating,
      'product-card': productCard,
      'carousel': carousel,
      'promo-set': promoSet,
      'custom-select': customSelect,
    },
    data() {
      return {
        options: {
          'read-only': true,
          'show-rating': false,
          'rounded-corners': true,
          'border-width': 3,
          'star-size': 16,
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
        currentField: '',
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
      })
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
      clearFocus() {
        this.currentField = '';
      }
    },
    mounted() {
      this.GET_PRODUCT_INFO_API();
      this.GET_COMMENTS_API();
      this.GET_CART_BLOCKS_API();
    },
    updated() {
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
    &__blocks {
      & > div:first-of-type {
        margin-top: 0;
      }
    }
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
        border-radius: $radius-medium;
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

    &__content {
      margin-top: 2.4rem;
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
