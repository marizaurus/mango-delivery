<template>
  <div class="ingredient row">
    <font-awesome-icon icon="grip-lines" class="handle"/>
    <div class="custom-input ingredient-name slim">
      <input type="text" :placeholder="$t('blockTypes.recipe.fields.ingredient')" v-model="ingredientData.name">
    </div>
    <div class="custom-input ingredient-number slim">
      <input type="text" :placeholder="$t('blockTypes.recipe.fields.number')" v-model="ingredientData.number">
    </div>
    <custom-select class="select-form slim ingredient-units" :style="{ 'z-index': 'var(--ingr-index)' }"
      :selectData="ingredientUnitsData" @selectUpdated="ingredientData.unit = $event"/>
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
          shortLabel: true,
        },
        ingredientData: this.itemData,
      }
    },
    props: {
      itemData: {
        order: Number,
        name: String,
        number: Number,
        unit: String
      },
    },
    mounted() {
      this.ingredientUnitsData.options = this.ingredientUnits.map((el) => ({
        code: el,
        name: this.$t('blockTypes.recipe.ingredientUnits.' + el),
        shortName: this.$t('blockTypes.recipe.ingredientUnitsShort.' + el),
        isChecked: el == this.itemData.unit
      }));
    }
  }
</script>

<style lang="scss">
  .ingredient {
    padding: .8rem;
    background-color: $beige-medium;
    border-radius: $radius-small;
    flex: 1;

    &.row > *:not(:last-child) {
      margin-right: .8rem;
    }

    .custom-input,
    .custom-select-wrapper {
      margin: 0;
    }

    &-name {
      display: flex;
      flex: 1;

      input {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &-units.custom-select-wrapper.select-form {
      min-width: 4.5rem;

      .custom-select,
      .custom-select__initial {
        width: 4.5rem;
        min-width: unset;

        &-text {
          width: 100%;
        }
      }
    }
    
    &-number.custom-input > input {
      width: 7.5rem;
    }
  }
</style>
