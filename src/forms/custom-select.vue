<template>
  <div class="custom-select-wrapper">
    <accordion class="custom-select" :closeOnBlur="true">
      <template #accordionTrigger>
        <div class="custom-select__initial" :class="{ 'non-empty' :  items.length > 0 }">
          <span class="custom-select__initial-label">{{ selectData.title }}</span>
          <span class="custom-select__initial-text">{{ selectText }}</span>
        </div>
      </template>
      <template #accordionContent>
        <div class="custom-checkbox" v-for="(option, i) in selectData.options" :key="i">
          <label>
            <input type="checkbox" :name="selectData.code" :value="option.code" v-model="items">
            <span class="custom-checkbox-label">{{ option.name }}</span>
          </label>
        </div>
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
        options: [
          {
            code: String,
            name: String,
          }
        ],
      }
    },
    computed: {
      selectText() {
        return this.items.length > 0 ? 
          this.items.length == 1 ? this.$t('forms.singleSelected') : this.items.length + this.$t('forms.multSelected') : '';
      }
    }
  }
</script>

<style lang="scss">
  .custom-select {
    position: absolute;
    user-select: none;

    &-wrapper {
      position: relative;
      min-width: 16rem;
      height: 5.1rem;

      &:not(:last-child) {
        margin-right: 1.8rem;
      }
    }

    &__initial {
      background-color: $beige;
      border-radius: $radius-medium;
      padding: 1.6rem 1rem;
      box-sizing: border-box;
      min-width: 16rem;
      height: 5.1rem;
      @include shadow-bottom($beige-dark);

      &-label {
        position: absolute;
        font-weight: 500;
        left: 1rem;
        top: 2.4rem;
        transform: translateY(-50%);
        transition: all .2s ease;
      }

      &.non-empty {
        .custom-select__initial-label {
          font-size: 1.2rem;
          top: .4rem;
          transform: none;
        }
      }
    }

    .accordion__trigger {
      position: relative;
      z-index: 2;
    }

    .accordion__content {
      border-radius: $radius-medium;
      padding: 2rem 1rem 1rem;
      top: -1rem;
      background-color: $white;
      box-sizing: border-box;
      position: relative;
      z-index: 1;

      @extend .block-neat;
    }
  }

  .accordion__trigger--active .custom-select__initial {
    top: -5px;
    box-shadow: 0 5px 0 $beige-dark;
  }

  @include breakpoint(tablet) {
    .custom-select {
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
