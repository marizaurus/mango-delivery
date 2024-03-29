<template>
  <div class="container container-slim" v-show="!editMode" v-if="profile">
    <div class="grid grid-tablet g-2 gg-2">
      <div>
        <div class="row">
          <h2>{{ profile.name }}</h2>
          <button class="btn btn-outline ml-auto" @click="editMode = true">{{ $t('buttons.edit') }}</button>
        </div>
        <div class="grid grid-mobile account__main-grid">
          <span class="t-medium">{{ $t('account.main.birthday') }}:</span><span>{{ getBday() }}</span>
          <span class="t-medium">{{ $t('account.main.sex') }}:</span><span>{{profile.sex ? $t('account.sexOptions.' + profile.sex) : ''}}</span>
          <span class="t-medium">{{ $t('account.main.phone') }}:</span><span>{{profile.phone}}</span>
          <span class="t-medium">{{ $t('account.main.email') }}:</span><span class="t-cut">{{profile.email}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="m-resp account__main-edit block-neat tab__content" v-show="editMode" v-if="profileCopy">
    <div class="container container-slim">
      <div class="grid gv-1">
        <div class="grid grid-tablet g-2 gg-2 gv-1">
          <div class="grid gv-1 grid-start">
            <div class="account__main-edit-grid grid grid-mobile--wide g-2 gg-1">
              <div class="custom-input">
                <input type="text" v-on="formEvents('profileCopy.name')" v-model="profileCopy.name">
                <label class="custom-input-label" :class="checkFocus('profileCopy.name')">{{ $t('account.main.name') }}<span class="t-red">*</span></label>
              </div>
            </div>
            <div class="account__main-edit-grid grid grid-mobile--wide g-2 gg-1">
              <datepicker v-model="profileCopy.birthday" :format-locale="language" textInput autoApply v-bind="datePickerOptions">
                <!-- eslint-disable-next-line vue/no-unused-vars -->
                <template #dp-input="{ value, onInput, onEnter, onTab, onClear }">
                  <div class="custom-input m-none">
                    <input type="text" :value="value">
                    <label class="custom-input-label" :class="{ 'non-empty': value }">{{ $t('account.main.birthday') }}</label>
                  </div>
                </template>
              </datepicker>
              <!-- watcher for options doesn’t trigger within v-if! -->
              <custom-select class="select-form wide" :style="{ 'z-index': 1 }" :selectData="sexData" v-if="sexData" @selectUpdated="profileCopy.sex = $event"/>
              <div class="custom-input">
                <input type="text" v-on="formEvents('profileCopy.phone')" v-model="profileCopy.phone">
                <label class="custom-input-label" :class="checkFocus('profileCopy.phone')">{{ $t('account.main.phone') }}<span class="t-red">*</span></label>
              </div>
              <div class="custom-input">
                <input type="text" v-on="formEvents('profileCopy.email')" v-model="profileCopy.email">
                <label class="custom-input-label" :class="checkFocus('profileCopy.email')">{{ $t('account.main.email') }}</label>
              </div>
            </div>
          </div>
          <div class="grid gv-1 block-neat">
            <div class="form-title">{{ $t('account.mailOptions.adsOptions') }}</div>
            <div class="form-card block-neat">
              <div class="custom-checkbox">
                <label>
                  <input type="checkbox" v-model="profileCopy.mailOptions.emailAds">
                  <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendEmail') }}</span>
                </label>
              </div>
              <div class="custom-checkbox">
                <label>
                  <input type="checkbox" v-model="profileCopy.mailOptions.smsAds">
                  <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendSms') }}</span>
                </label>
              </div>
            </div>
            <div class="form-title">{{ $t('account.mailOptions.billOptions') }}</div>
            <div class="form-card block-neat">
              <div class="custom-checkbox">
                <label>
                  <input type="checkbox" v-model="profileCopy.mailOptions.emailBills">
                  <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendEmail') }}</span>
                </label>
              </div>
              <div class="custom-checkbox">
                <label>
                  <input type="checkbox" v-model="profileCopy.mailOptions.smsBills">
                  <span class="custom-checkbox-label">{{ $t('account.mailOptions.sendSms') }}</span>
                </label>
              </div>
              <div class="custom-checkbox">
                <label>
                  <input type="checkbox" v-model="profileCopy.mailOptions.operatorCall">
                  <span class="custom-checkbox-label">{{ $t('account.mailOptions.operatorCall') }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-mobile g-2 gg-2">
          <button class="btn btn-outline ml-auto grid-center" @click="cancelMain">{{ $t('buttons.cancel') }}</button>
          <div>
            <button class="btn btn-primary btn-green-light m-none" @click="saveMain">{{ $t('buttons.save') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import customSelect from '@/forms/custom-select';
  import Datepicker from '@vuepic/vue-datepicker';
  import { ru } from 'date-fns/locale'

  import formHandler from '@/mixins/formHandler';

  export default {
    name: 'profile',
    components: {
      'custom-select': customSelect,
      Datepicker,
    },
    mixins: [ formHandler ],
    data() {
      return {
        activeField: null,
        editMode: false,
        language: ru,
        datePickerOptions: {
          format: 'dd MMMM yyyy',
          enableTimePicker: false,
          locale: 'ru',
          position: 'left',
        },
        sexData: null,
        sexOptions: [ 'm', 'f' ],
        profile: null,
        profileCopy: null,
      }
    },
    methods: {
      getSexData() {
        return {
          code: 'sexData',
          title: this.$t('account.main.sex'),
          optionType: 'radio',
          options: this.sexOptions.map(el => ({ code: el, name: this.$t('account.sexOptions.' + el), isChecked: this.profile.sex == el })),
        }
      },
      getBday() {
        let msec = Date.parse(this.profile.birthday);
        return new Date(msec).toLocaleDateString('ru', { year: "numeric", month: "long", day: "numeric" });
      },
      saveMain() {
        this.profile = Object.assign({}, this.profileCopy);
        this.editMode = false;
      },
      cancelMain() {
        this.profileCopy = Object.assign({}, this.profile);
        this.sexData = this.getSexData();
        this.editMode = false;
      },
    },
    mounted() {
      this.$load(async () => {
        let res = await this.$api.account.getProfile();
        this.profile = res.data || res;
        this.sexData = this.getSexData();
      }).then(() => this.profileCopy = Object.assign({}, this.profile));
    }
  }
</script>