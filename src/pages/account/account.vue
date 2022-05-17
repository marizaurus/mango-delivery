<template>
  <div class="account m-resp">
    <div class="container container-slim">
      <h1 class="account__title">{{ $t('account.title') }}</h1>
      <div class="tabs">
        <button class="btn btn-tab tab" :class="{ 'active': isActive('profile') }"
          @click="setActive('profile')">{{ $t('account.tabs.main') }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('addresses') }"
          @click="setActive('addresses')">{{ $t('account.tabs.addresses') }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('orders') }"
          @click="setActive('orders')">{{ $t('account.tabs.orders') }}</button>
        <button class="btn btn-tab tab" :class="{ 'active': isActive('favorites') }"
          @click="() => $router.push({ name: 'favorites' })">
          <span>{{ $t('account.tabs.favorites') }}</span>
          <font-awesome-icon icon="arrow-up-right-from-square"/>
        </button>
      </div>
    </div>
    <div class="account__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import pin from '../../assets/icons/location-pin.svg';
  import _get from 'lodash/get';
  import router from '../../router/router';
 
  export default {
    name: 'account',
    components: {
    },
    data() {
      return {
        // map
        mapSettings: {
          coords: [ 59.92694994, 30.33902649 ],
          zoom: 12,
          controls: ['geolocationControl', 'searchControl', 'zoomControl'],
        },
        pins: [],
      }
    },
    methods: {
      // form fields
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
      handleInput(e, data) {
        this.searchParams.orderSum.splice(data, 1, +e.target.value || 0);
        this.$refs.slider.setValue(this.searchParams.orderSum);
      },
      getBday() {
        let msec = Date.parse(this.account.main.birthday);
        return new Date(msec).toLocaleDateString('ru', { year: "numeric", month: "long", day: "numeric" });
      },
      saveMain() {
        this.account.main = Object.assign({}, this.accCopy.main);
        this.account.mailOptions = Object.assign({}, this.accCopy.mailOptions);
        this.editMode = false;
      },
      cancelMain() {
        this.accCopy.main = Object.assign({}, this.account.main);
        this.accCopy.mailOptions = Object.assign({}, this.account.mailOptions);
        this.editMode = false;
      },
      // tabs
      isActive(menuItem) {
        return this.$route.name == menuItem;
      },
      setActive(menuItem) {
        router.replace({ name: menuItem });
        this.editMode = false;
      },
      // map & addresses
      setPins() {
        this.account.addresses.forEach((el, i) => {
          this.pins.push({
            icon: {
              layout: 'default#imageWithContent',
              imageHref: pin,
              imageSize: [36, 36],
              imageOffset: [-18, -36],
              content: i + 1,
              contentOffset: [0, 4],
              contentLayout: '<span class="pin-label pin-label--map">$[properties.iconContent]</span>'
            },
            coords: el.coords,
          });
        });
      },
      // TODO: update labels on map pins
      // updatePins() {
      //   this.pins.forEach((pin, i) => pin.content = i + 1);
      // },
      removeAddress(i) {
        this.account.addresses.splice(i, 1);
        this.pins.splice(i, 1);
        // this.updatePins();
      },
      addAddress() {
        let id = +this.account.addresses.slice(-1)[0].id++;
        this.account.addresses.push({
          id: id,
          name: 'Новый адрес',
          fullAddress: '',
          apartment: '',
          intercom: '',
          entrance: '',
          floor: '',
          comment: '',
          main: false,
          coords: [ ]
        });
      },
    },
    mounted() {
      // if (process.env.NODE_ENV === 'production') {
      //   this.account = db.account;
      //   this.setPins();
      // } else {
      //   axios.get(process.env.VUE_APP_API_BASE + 'account')
      //     .then(response => {
      //       this.account = response.data;
      //       this.accCopy.main = Object.assign({}, this.account.main);
      //       this.accCopy.mailOptions = Object.assign({}, this.account.mailOptions);
      //       this.setPins();
      //       this.sexData.options = this.sexOptions.map(el => ({
      //         code: el,
      //         name: this.$t('account.sexOptions.' + el),
      //         isChecked: this.account.main.sex == el,
      //       }));
      //     });
      // }
    }
  }
</script>

<style lang="scss">
  .account {
    &__content .m-resp {
      margin-top: 2.4rem;
    }

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
