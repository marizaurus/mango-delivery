<template>
  <div class="ingredient row">
    <font-awesome-icon icon="grip-lines"/>
    <div class="custom-input">
      <input type="text" :placeholder="$t('blockTypes.recipe.fields.ingredient')">
    </div>
    <div class="custom-input">
      <input type="text" :placeholder="$t('blockTypes.recipe.fields.number')">
    </div>
    <custom-select class="select-form select-slim" :selectData="ingredientUnitsData"/>
  </div>
</template>

<script>
  import customSelect from '@/forms/custom-select';

  export default {
    name: 'ingredient',
    components: {
      'custom-select': customSelect,
    },
    data() {
      return {
        ingredientUnits: [
          'teaSpoon',
          'tableSpoon',
          'units',
          'g',
          'kg',
          'ml',
          'l',
          'glass'
        ],
        ingredientUnitsData: {
          code: 'unitsData',
          title: this.$t('blockTypes.recipe.fields.units'),
          optionType: 'radio',
          slim: true,
          options: [],
        }
      }
    },
    mounted() {
      this.ingredientUnitsData.options = this.ingredientUnits.map((el) => ({ code: el, name: this.$t('blockTypes.recipe.ingredientUnits.' + el) }));
      this.ingredientUnitsData.options[0].isChecked = true;
    }
  }
</script>