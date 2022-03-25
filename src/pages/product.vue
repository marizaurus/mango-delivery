<template>
  <div class="product">
    <div class="m-resp comments container container-slim">
      <h1 class="comments__title">{{ $t('blocks.ratingComments') }}</h1>
      <div class="grid grid-tablet g-7-3 gg-2">
        <div class="comments__content">
          <div class="comment"
            v-for="comment in comments"
            :key="comment.id">
            <div class="row">
              <div class="comment-name">{{ comment.name }}</div>
              <star-rating :rating="comment.rating" v-bind="options"/>
            </div>
            <div class="comment-text">{{ comment.text }}</div>
            <div class="comment-reply"
              v-for="reply in comment.replies"
              :key="reply.id">
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
    <div class="container product__blocks">
      <h1>{{ $t('blocks.productOffers') }}</h1>
      <component
        v-for="block in blocks"
        :key="block.id"
        :is="block.type"
        :blockData="block" />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import StarRating from 'vue-star-rating'
  import productCard from '@/components/product-card';
  import carousel from '@/components/carousel';
  import promoSet from '@/components/promo-set'

  export default {
    name: "product",
    components: {
      'star-rating': StarRating,
      'product-card': productCard,
      'carousel': carousel,
      'promo-set': promoSet,
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
        showCard: false,
        focusedItem: null,
      }
    },
    computed: {
      ...mapGetters({
        comments: 'COMMENTS',
        blocks: 'CART_BLOCKS',
      }),
    },
    methods: {
      ...mapActions([
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
    },
    mounted() {
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
    &__promo {
      &-btn {
        margin-top: 1.6rem;
      }
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
