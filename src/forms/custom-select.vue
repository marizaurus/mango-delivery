<template>
  <div class="custom-select-wrapper" :class="[ (selectData.alignment ? 'content-' + selectData.alignment : '') ]">
    <accordion class="custom-select" :closeOnBlur="true" ref="accordion">
      <template #accordionTrigger>
        <div class="custom-select__initial" :class="{ 'non-empty' : items.length > 0, 'custom-select__initial--icon' : selectData.icon }">
          <font-awesome-icon :icon="[selectData.iconType, selectData.icon]" v-if="selectData.icon" class="custom-select__icon"/>
          <span class="custom-select__initial-label" v-if="!selectData.slim">
            {{ selectData.title }}<span class="t-red" v-if="selectData.required">*</span>
          </span>
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
        items: this.getItems(),
      }
    },
    props: {
      selectData: {
        code: String,
        title: String,
        optionType: String, // check/radio
        required: Boolean,  // editor
        alignment: String,  // catalog sort, footer
        slim: Boolean,      // recipe editor, remove label
        shortLabel: Boolean,// short ingredient unit
        icon: String,       // font awesome icon code
        iconType: String,   // font awesome icon type (fas/far)
        options: [
          {
            code: String,
            name: String,
            shortName: String,
            isChecked: Boolean,
          }
        ],
      },
    },
    computed: {
      selectText() {
        if (this.selectData.optionType == 'radio')
          return this.items.length > 0 ? this.selectData.options
            .find(i => i.code == this.items)[this.selectData.shortLabel ? 'shortName' : 'name'] : '';

        return this.items.length > 0 ? this.items.length == 1 ?
          this.$t('forms.singleSelected') : this.items.length + this.$t('forms.multSelected') : '';
      }
    },
    methods: {
      getItems() {
        let items = this.selectData.options.filter(el => el.isChecked).map(el => el.code);

        if (this.selectData.optionType == 'radio') {
          if (!items.length)
            items = this.selectData.options[0].code;
          else
            items = items[0]
        }
        
        return items;
      }
    },
    watch: {
      // 'selectData.options': function() {
      //   this.items = this.selectData.options.filter(el => el.isChecked).map(el => el.code);
      //   if (this.selectData.optionType == 'radio') {
      //     if (!this.items.length)
      //       this.items = this.selectData.options[0].code;
      //     else
      //       this.items = this.items[0]
      //   }
      // },
      'items': function() {
        this.$emit("selectUpdated", this.items);
        if (this.selectData.optionType == 'radio' && this.$refs.accordion.visible) {
          this.$refs.accordion.toggle();
        }
      },
    }
  }
</script>

<style lang="scss">
  .custom-select {
    position: absolute;
    user-select: none;

    &-wrapper {
      position: relative;
      height: 5rem;

      &.select-form .custom-select {
        &__initial {
          background-color: $white;
          @include shadow-bottom($beige);

          &-label {
            font-weight: 400;
          }

          &.non-empty .custom-select__initial-label {
            color: $grey-medium;
          }
        }

        .accordion__trigger--active .custom-select__initial {
          box-shadow: 0 5px 0 $beige;
        }
      }

      &.content {
        &-right {
          .accordion__content {
            right: 0;
            left: unset;
          }
        }

        &-top {
          .accordion__content {
            top: 0;
            transform: translateY(calc(-100% + 2px)) !important;
          }
        }
      }

      &.slim {
        height: 3.6rem;

        .custom-select__initial {
          padding: .8rem;
          height: 3.6rem;
        }
      }

      &.wide {
        .custom-select {
          width: 100%;
        }
      }

      &.block {
        min-width: 16rem;

        &:not(:last-child) {
          margin-right: 1.8rem;
        }

        .custom-select {
          min-width: 16rem;
          width: max-content;
        }
      }

      &:not(.custom-select--outline) {
        .custom-select__initial {
          @include shadow-bottom($beige-dark);
        }

        .accordion__trigger--active .custom-select__initial {
          top: -5px;
          box-shadow: 0 5px 0 $beige-dark;
        }
      }
    }

    &--outline.custom-select-wrapper {
      .custom-select__initial {
        background-color: $grey;
        border: 2px solid $white;
      }

      .accordion__content {
        background-color: $grey;
        border: 2px solid $white;
        transform: translateY(-2px);

        .custom-radio label input {
          background-color: $grey;
          border-color: $white;

          &::after {
            background: $grey;
          }

          &:checked {
            background-color: $white;
          }
        }
      }
    }

    &__initial {
      background-color: $beige;
      border-radius: $radius-small;
      padding: 1.6rem 1rem;
      box-sizing: border-box;
      width: 100%;
      height: 5rem;

      &-label {
        position: absolute;
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

      &-text {
        display: inline-block;
        width: 14rem;

        @extend .t-cut;
      }

      &--icon {
        .custom-select__initial {
          &-label {
            left: 3.8rem;
          }

          &-text {
            padding-left: 2.8rem;
          }
        }

        .custom-select__icon {
          position: absolute;
          width: 2.1rem;
          left: 1rem;
          font-size: 2.4rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    .accordion__content {
      border-radius: $radius-small;
      padding: 1rem;
      background-color: $white;
      box-sizing: border-box;
      position: absolute;
      min-width: 100%;
      width: max-content;

      @extend .block-neat;
    }
  }

  @include breakpoint(tablet) {
    .custom-select {
      &-wrapper {
        &.block {
          min-width: 20rem;

          &:not(:last-child) {
            margin-right: 2.4rem;
          }

          .custom-select {
            &__initial {
              min-width: 20rem;

              &-text {
                width: 18rem;
              }
            }
          }
        }

        &.content-top {
          .accordion__content {
            top: 100%;
            transform: translateY(-2px);
          }
        }
      }
    }
  }
</style>
