<template>
  <div class="custom-select-wrapper">
    <accordion class="custom-select">
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
  .custom-select__initial {
    @include shadow-bottom($beige-dark);
  }

  .accordion__trigger--active .custom-select__initial {
    top: -5px;
    box-shadow: 0 5px 0 $beige-dark;
  }
</style>
