<template>
  <div class="container container-slim m-resp tab__content">
    <div class="grid grid-tablet g-2 gg-2">
      <div class="account__adresses-table table--slim">
        <div class="grid grid-mobile g-4 table__header table__row">
          <span></span>
          <span>{{ $t('account.addresses.name') }}</span>
          <span>{{ $t('account.addresses.fullAddress') }}</span>
          <button class="btn btn-outline-icon small" @click="addAddress">
            <font-awesome-icon icon="plus"/>
            <span class="t-medium">{{ $t('buttons.add') }}</span>
          </button>
        </div>
        <accordion class="table__row-wrapper" :closeOnBlur="true"
          v-for="(address, i) in addresses" :key="address.id">
          <template #accordionTrigger>
            <div class="grid grid-mobile g-3 table__row">
              <div class="pin-wrapper">
                <div class="pin">
                  <font-awesome-icon icon="location-pin"/>
                  <span class="pin-label pin-label--list">{{ i + 1 }}</span>
                </div>
              </div>
              <span>{{ address.name }}</span>
              <span class="t-cut">{{ address.fullAddress }}</span>
            </div>
          </template>
          <template #accordionContent>
            <div class="account__address grid gv-1">
              <div class="grid grid-mobile g-2 gg-1">
                <div class="custom-input">
                  <input type="text" v-on="formEvents('addresses[' + i + '].name')" v-model="address.name">
                  <label class="custom-input-label" :class="checkFocus('addresses[' + i + '].name')">{{ $t('account.addresses.name') }}<span class="t-red">*</span></label>
                </div>
                <div>
                  <div class="custom-checkbox">
                    <label>
                      <input type="checkbox" v-model="address.main">
                      <span class="custom-checkbox-label">{{ $t('account.addresses.markMain') }}</span>
                    </label>
                  </div>
                  <button class="btn btn-outline-icon" @click="() => removeAddress(i)">
                    <font-awesome-icon :icon="['far', 'trash-can']"/>
                    <span>{{ $t('buttons.delete') }}</span>
                  </button>
                </div>
              </div>
              <div class="account__address-full">{{ address.fullAddress }}</div>
              <div class="grid grid-mobile g-2 gg-1 account__address-fields">
                <div class="custom-input">
                  <input type="text" v-on="formEvents('addresses[' + i + '].apartment')" v-model="address.apartment">
                  <label class="custom-input-label" :class="checkFocus('addresses[' + i + '].apartment')">{{ $t('account.addresses.apartment') }}<span class="t-red">*</span></label>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('addresses[' + i + '].intercom')" v-model="address.intercom">
                  <label class="custom-input-label" :class="checkFocus('addresses[' + i + '].intercom')">{{ $t('account.addresses.intercom') }}</label>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('addresses[' + i + '].entrance')" v-model="address.entrance">
                  <label class="custom-input-label" :class="checkFocus('addresses[' + i + '].entrance')">{{ $t('account.addresses.entrance') }}</label>
                </div>
                <div class="custom-input">
                  <input type="text" v-on="formEvents('addresses[' + i + '].floor')" v-model="address.floor">
                  <label class="custom-input-label" :class="checkFocus('addresses[' + i + '].floor')">{{ $t('account.addresses.floor') }}</label>
                </div>
              </div>
              <div class="custom-input">
                <input type="text" v-on="formEvents('addresses[' + i + '].comment')" v-model="address.comment">
                <label class="custom-input-label" :class="checkFocus('addresses[' + i + '].comment')">{{ $t('account.addresses.courierComment') }}</label>
              </div>
            </div>
          </template>
        </accordion>
      </div>
      <div class="map">
        <div class="block-sticky--tablet">
          <yandex-map v-bind="mapSettings" ymap-class="map-content">
            <ymap-marker v-for="(pin, i) in pins" :key="i" v-bind="pin" :marker-id="i" @click="mapSettings.coords = pin.coords"/>
          </yandex-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pin from '../../assets/icons/location-pin.svg';
  import accordion from '../../components/accordion';
  
  import formHandler from '../../mixins/formHandler';

  export default {
    name: 'addresses',
    components: {
      accordion,
    },
    mixins: [ formHandler ],
    data() {
      return {
        activeField: null,
        // map
        addresses: null,
        mapSettings: {
          coords: [ 59.92694994, 30.33902649 ],
          zoom: 12,
          controls: ['geolocationControl', 'searchControl', 'zoomControl'],
        },
        pins: [],
      }
    },
    methods: {
      // map & addresses
      setPins() {
        this.addresses.forEach((el, i) => {
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
        this.addresses.splice(i, 1);
        this.pins.splice(i, 1);
        // this.updatePins();
      },
      addAddress() {
        let id = +this.addresses.slice(-1)[0].id++;
        this.addresses.push({
          id: id,
          name: 'Новый адрес',
          fullAddress: '',
          apartment: '',
          intercom: '',
          entrance: '',
          floor: '',
          comment: '',
          main: false,
          coords: []
        });
      },
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.account.getAddresses();
        this.addresses = res.data || res;
      }).then(() => this.setPins());
    }
  }
</script>