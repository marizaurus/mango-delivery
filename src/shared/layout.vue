<template>
  <div class="layout">
    <v-header @openRegister="openModal"/>
    <router-view class="layout__body"/>
    <v-footer/>

    <modal v-show="modalActive" @close="closeModal" class="modal--registration">
      <template #header>
        <h2 class="m-none">{{ $t('modal.registration') }}</h2>
      </template>
    
      <template #body>
        <div class="block-editor__product-modal grid gv-1">
          <div class="grid grid-tablet g-2 gg-2">
            <div class="custom-input">
              <input type="text" v-on="formEvents('registerForm.name')" v-model="registerForm.name">
              <label class="custom-input-label" :class="checkFocus('registerForm.name')">{{ $t('account.main.name') }}<span class="t-red">*</span></label>
            </div>
          </div>
          <div class="grid grid-tablet g-2 gg-2 gv-1">
            <div class="custom-input">
              <input type="text" v-on="formEvents('registerForm.phone')" v-model="registerForm.phone">
              <label class="custom-input-label" :class="checkFocus('registerForm.phone')">{{ $t('account.main.phone') }}<span class="t-red">*</span></label>
            </div>
            <div class="custom-input">
              <input type="text" v-on="formEvents('registerForm.email')" v-model="registerForm.email">
              <label class="custom-input-label" :class="checkFocus('registerForm.email')">{{ $t('account.main.email') }}</label>
            </div>
          </div>
          <div class="form-title">{{ $t('modal.howToSendConfirm') }}</div>
          <div class="grid grid-tablet g-2 gg-2 gv-1">
            <div class="custom-input">
              <input type="text" v-on="formEvents('registerForm.confirmOption')" v-model="registerForm.confirmOption">
              <label class="custom-input-label" :class="checkFocus('registerForm.confirmOption')">{{ $t('forms.confirmOption') }}<span class="t-red">*</span></label>
            </div>
            <div class="custom-input">
              <input type="text" v-on="formEvents('registerForm.codeReceived')" v-model="registerForm.codeReceived">
              <label class="custom-input-label" :class="checkFocus('registerForm.codeReceived')">{{ $t('forms.codeReceived') }}<span class="t-red">*</span></label>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <button class="btn btn-primary btn-orange-light m-none m-auto" @click="closeModal">{{ $t('buttons.register') }}</button>
      </template>
    </modal>
  </div>
</template>

<script>
  import vHeader from '@/shared/header';
  import vFooter from '@/shared/footer';
  import modal from '@/forms/modal';
  import { mapActions } from 'vuex';

  import formHandler from '../mixins/formHandler';

  export default {
    name: "Layout",
    components: {
      'v-header': vHeader,
      'v-footer': vFooter,
      modal,
    },
    mixins: [ formHandler ],
    data() {
      return {
        activeField: '',
        modalActive: false,
        registerForm: {
          name: '',
          phone: '',
          email: '',
          confirmOption: '',
          codeReceived: '',
        }
      }
    },
    methods: {
      ...mapActions(['loadCategories', 'loadCuisines', 'loadTags', 'loadStatuses']),
      // modal
      openModal() {
        this.modalActive = true;
        document.querySelector('body').classList.add('modal-open');
      },
      closeModal() {
        this.modalActive = false;
        document.querySelector('body').classList.remove('modal-open');
      },
    },
    mounted() {
      this.loadCategories();
      this.loadCuisines();
      this.loadTags();
      this.loadStatuses();
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap');

  .modal {
    &--registration .modal {
      max-width: 600px;
      width: 90%;
    }
  }

  .layout {
    min-height: calc(100vh - 6rem);
    margin-top: 6rem !important;
    display: flex;
    flex-direction: column;

    &__body {
      flex-grow: 1;
    }
  }

  @include breakpoint(mobile) {
    .layout {
      min-height: calc(100vh - 8rem);
      margin-top: 8rem !important;
    }
  }
</style>