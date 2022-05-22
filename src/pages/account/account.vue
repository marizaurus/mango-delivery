<template>
  <div class="account m-resp">
    <div class="container container-slim block-neat">
      <h1 class="account__title">{{ $t('account.title') }}</h1>
      <div class="tabs">
        <button class="btn btn-tab tab" :class="{ 'active': isActive(tab) }" @click="setActive(tab)" v-for="(tab, i) in tabs" :key="i" >{{ $t('account.tabs.' + tab) }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('favorites') }" @click="$router.push({ name: 'favorites' })">
          <span>{{ $t('account.tabs.favorites') }}</span>
          <font-awesome-icon icon="arrow-up-right-from-square"/>
        </button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import router from '../../router/router';
 
  export default {
    name: 'account',
    data() {
      return {
        tabs: [
          'profile',
          'addresses',
          'orders',
        ]
      }
    },
    methods: {
      // tabs
      isActive(menuItem) {
        return this.$route.name == menuItem;
      },
      setActive(menuItem) {
        router.replace({ name: menuItem });
        this.editMode = false;
      },
    }
  }
</script>

<style lang="scss">
  .account {
    &__main {
      &-grid {
        grid-template-columns: 17rem 16rem;
        grid-gap: .8rem 2rem;
      }

      &-edit {
        background-color: $beige-medium;
        padding: 2rem 0;

        &-grid.grid.grid-tablet.g-2.gg-2 {
          row-gap: 1rem;
          align-self: flex-start;
        }

        &-buttons {
          margin-top: 1.5rem;

          button:first-child {
            margin-right: 2.4rem;
          }
        }
      }
    }

    &__adresses-table {
      .table__row {
        &.grid.grid-mobile.g-3 {
          grid-template-columns: 3.5rem 12rem auto;
        }

        &.grid.grid-mobile.g-4 {
          grid-template-columns: 3.5rem 12rem auto 2rem;
        }
      }
    }

    &__address {
      background-color: $beige-medium;
      border-radius: $radius-small;
      padding: 1rem 1.2rem;
    }

    &__orders-table {
      .table__row {
        &:not(.table__header) > span {
          &:first-child {
            text-decoration: underline;
          }

          &:last-child {
            text-align: end;
            font-weight: 700;
          }
        }

        &.grid.grid-mobile.g-5 {
          grid-template-columns: minmax(70px, 1fr) minmax(90px, 1fr) minmax(120px, 1fr) minmax(130px, 1fr) minmax(70px, 1fr);
        }
      }
    }
  }

  @include breakpoint(mobile) {
    .account {
      &__adresses-table {
        .table__row {
          &.grid.grid-mobile.g-3 {
            grid-template-columns: 4rem 12rem auto;
          }

          &.grid.grid-mobile.g-4 {
            grid-template-columns: 4rem 12rem auto 11rem;
          }
        }
      }

      &__address-fields.grid.grid-mobile.g-2 {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
</style>
