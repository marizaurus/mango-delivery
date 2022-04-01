<template>
  <div class="custom-select-wrapper">
    <accordion class="custom-select" :closeOnBlur="true">
      <template #accordionTrigger>
        <div class="custom-select__initial" :class="{ 'non-empty' :  items.length > 0 }">
          <span class="custom-select__initial-label">{{ selectData.title }}<span class="t-red" v-if="selectData.required">*</span></span>
          <span class="custom-select__initial-text">{{ selectText }}</span>
        </div>
      </template>
      <template #accordionContent>
        <template v-if="selectData.optionType == 'radio'">
          <div class="custom-radio" v-for="(option, i) in selectData.options" :key="i">
            <label>
              <input type="radio" :name="selectData.code" :value="option.code" v-model="items">
              <span class="custom-checkbox-label">{{ option.name }}</span>
            </label>
          </div>
        </template>
        <template v-else>
          <button class="btn btn-outline custom-select__btn m-auto"
            @click="clearSelect" v-show="items.length !== 0">{{ $t('forms.clearSelect') }}</button>
          <div class="custom-checkbox" v-for="(option, i) in selectData.options" :key="i">
            <label>
              <input type="checkbox" :name="selectData.code" :value="option.code" v-model="items">
              <span class="custom-checkbox-label">{{ option.name }}</span>
            </label>
          </div>
        </template>
      </template>
    </accordion>
  </div>
</template>

<script>
  import accordion from '../components/accordion.vue';

  export default {
    name: 'custom-select',
    components: {
      accordion,
    },
    data() {
      return {
        items: [],
      }
    },
    props: {
      selectData: {
        code: String,
        title: String,
        optionType: String,
        required: Boolean,
        initial: Array,
        options: [
          {
            code: String,
            name: String,
          }
        ],
      },
    },
    computed: {
      selectText() {
        if (this.selectData.optionType == 'radio')
          return this.items.length > 0 ? this.selectData.options.find((i) => i.code == this.items[0]).name : '';

        return this.items.length > 0 ? this.items.length == 1 ?
          this.$t('forms.singleSelected') : this.items.length + this.$t('forms.multSelected') : '';
      }
    },
    methods: {
      clearSelect() {
        this.items = [];
      }
    },
    watch: {
      'selectData.initial': function() {
        this.items = this.selectData.initial;
      },
      'items': function() {
        this.$emit("selectUpdated", this.items);
      },
    }
  }
</script>

<style lang="scss">
  .custom-select {
    position: absolute;
    user-select: none;
    min-width: 16rem;
    width: max-content;

    &-wrapper {
      position: relative;
      min-width: 16rem;
      height: 5.1rem;
      margin-bottom: 0.8rem;

      &:not(:last-child) {
        margin-right: 1.8rem;
      }

      &.select-form .custom-select {
        min-width: 20rem;

        &__initial {
          background-color: $white;
          @include shadow-bottom($beige);

          &-label {
            font-weight: 400;
          }
        }

        .accordion__trigger--active .custom-select__initial {
          box-shadow: 0 5px 0 $beige;
        }
      }
    }

    &__initial {
      background-color: $beige;
      border-radius: $radius-small;
      padding: 1.6rem 1rem;
      box-sizing: border-box;
      min-width: 16rem;
      height: 5.1rem;
      @include shadow-bottom($beige-dark);

      &-label {
        position: absolute;
        font-weight: 500;
        left: 1rem;
        top: 1.6rem;
        transition: .2s ease;
      }

      &.non-empty {
        .custom-select__initial-label {
          font-size: 1.2rem;
          top: .4rem;
        }
      }
    }

    &__btn.btn-outline {
      font-size: 1.6rem;
      margin-bottom: .8rem;

      &:hover {
        color: $beige-dark;
      }
    }

    .accordion__trigger {
      width: 20px;
    }

    .accordion__content {
      border-radius: $radius-small;
      padding: 1rem;
      background-color: $white;
      box-sizing: border-box;

      @extend .block-neat;
    }

    .accordion__trigger--active .custom-select__initial {
      top: -5px;
      box-shadow: 0 5px 0 $beige-dark;
    }
  }

  @include breakpoint(tablet) {
    .custom-select {
      min-width: 20rem;

      &-wrapper {
        min-width: 20rem;
        height: 5.1rem;

        &:not(:last-child) {
          margin-right: 2.4rem;
        }
      }

      &__initial {
        min-width: 20rem;
      }
    }
  }
</style>
