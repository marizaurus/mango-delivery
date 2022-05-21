<template>
  <div class="footer">
    <div class="footer__wrapper">
      <div class="container container-slim">
        <div class="mobile">
          <div>
            <accordion class="footer-links--mobile">
              <template #accordionTrigger>
                <span class="t-bold">{{ $t('menu.clientLinks') }}</span>
              </template>
              <template #accordionContent>
                <router-link :to="{ name: 'catalog' }">{{ $t('menu.catalog') }}</router-link>
                <router-link :to="{ name: 'account' }">{{ $t('menu.account') }}</router-link>
                <router-link :to="{ name: 'favorites' }">{{ $t('menu.favorites') }}</router-link>
                <router-link :to="{ name: 'home' }">{{ $t('menu.aboutFAQ') }}</router-link>
              </template>
            </accordion>
            <accordion class="footer-links--mobile">
              <template #accordionTrigger>
                <span class="t-bold">{{ $t('menu.restaurantLinks') }}</span>
              </template>
              <template #accordionContent>
                <router-link :to="{ name: 'home' }">{{ $t('menu.register') }}</router-link>
                <router-link :to="{ name: 'home' }">{{ $t('menu.serviceOpportunities') }}</router-link>
                <router-link :to="{ name: 'home' }">{{ $t('menu.employeeManuals') }}</router-link>
              </template>
            </accordion>
            <accordion class="footer-links--mobile">
              <template #accordionTrigger>
                <span class="t-bold">{{ $t('menu.contacts') }}</span>
              </template>
              <template #accordionContent>
                <router-link :to="{ name: 'home' }">{{ $t('menu.supportChat') }}</router-link>
                <router-link :to="{ name: 'home' }">{{ $t('menu.vkLink') }}</router-link>
                <router-link :to="{ name: 'home' }">{{ $t('menu.ytLink') }}</router-link>
              </template>
            </accordion>
          </div>
          <div class="grid grid-mobile gg-1 g-2 footer-selects">
            <custom-select class="custom-select--outline wide" :selectData="getModeData(true)"/>
            <custom-select class="custom-select--outline wide" :selectData="getLanguageData(true)"/>
          </div>
        </div>
        <div class="tablet laptop">
          <div class="grid grid-tablet g-5 gg-2">
            <div class="footer-links">
              <span class="t-bold">{{ $t('menu.clientLinks') }}</span>
              <router-link :to="{ name: 'catalog' }">{{ $t('menu.catalog') }}</router-link>
              <router-link :to="{ name: 'account' }">{{ $t('menu.account') }}</router-link>
              <router-link :to="{ name: 'favorites' }">{{ $t('menu.favorites') }}</router-link>
              <router-link :to="{ name: 'home' }">{{ $t('menu.aboutFAQ') }}</router-link>
            </div>
            <div class="footer-links">
              <span class="t-bold">{{ $t('menu.restaurantLinks') }}</span>
              <router-link :to="{ name: 'home' }">{{ $t('menu.register') }}</router-link>
              <router-link :to="{ name: 'home' }">{{ $t('menu.serviceOpportunities') }}</router-link>
              <router-link :to="{ name: 'home' }">{{ $t('menu.employeeManuals') }}</router-link>
            </div>
            <div class="footer-links">
              <span class="t-bold">{{ $t('menu.contacts') }}</span>
              <router-link :to="{ name: 'home' }">{{ $t('menu.supportChat') }}</router-link>
              <router-link :to="{ name: 'home' }">{{ $t('menu.vkLink') }}</router-link>
              <router-link :to="{ name: 'home' }">{{ $t('menu.ytLink') }}</router-link>
            </div>
            <custom-select class="custom-select--outline wide" :selectData="getModeData()"/>
            <custom-select class="custom-select--outline wide" :selectData="getLanguageData()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import customSelect from '@/forms/custom-select';
  import accordion from '@/components/accordion';

  export default {
    name: "vFooter",
    components: {
      'custom-select': customSelect,
      accordion,
    },
    data() {
      return {
        modeData: null,
        modeOptions: [
          "light",
          "dark"
        ],
        languageData: null,
        languageOptions: [
          "russian",
          "english"
        ],
      }
    },
    methods: {
      getModeData(setAlignment) {
        return {
          code: 'modeData',
          title: this.$t('menu.siteMode'),
          optionType: 'radio',
          alignment: setAlignment ? 'top' : null,
          icon: 'lightbulb',
          iconType: 'fas',
          options: this.modeOptions.map(el => ({ code: el, name: this.$t('modeOptions.' + el) })),
        }
      },
      getLanguageData(setAlignment) {
        return {
          code: 'languageData',
          title: this.$t('menu.siteLanguage'),
          optionType: 'radio',
          alignment: setAlignment ? 'top' : null,
          icon: 'globe',
          iconType: 'fas',
          options: this.languageOptions.map(el => ({ code: el, name: this.$t('languageOptions.' + el) })),
        }
      },
    },
    mounted() {
      this.modeData = this.getModeData();
      this.languageData = this.getLanguageData();
    }
  }
</script>

<style lang="scss">
  .footer {
    color: $white;

    &__wrapper {
      background-color: $grey;
      padding: 1.6rem 0;
      min-width: 390px;
    }

    &-links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &--mobile {
        border-bottom: 1px solid $white;

        .accordion__trigger {
          padding: 1rem 0;
        }

        .accordion__content {
          @extend .footer-links;

          a:first-child {
            margin-top: 0;
          }

          a:last-child {
            margin-bottom: 1rem;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }

      a {
        margin-top: .8rem;
        color: $white;
        font-weight: 400;
        text-decoration: none;
      }
    }

    &-selects {
      margin-top: 1rem;
    }
  }

  @include breakpoint(tablet) {
    .footer {
      &__wrapper {
        padding: 2.4rem 0;
      }
    }
  }
</style>