<template>
  <div class="step row">
    <font-awesome-icon icon="grip-lines" class="handle"/>
    <div class="custom-input step-content slim" v-if="stepType != 'recipe'">
      <input type="text" :placeholder="$t('blockTypes.recipe.fields.itemTitle')" v-model="stepData.title">
    </div>
    <div class="custom-input step-content slim">
      <input type="text" :placeholder="$t('blockTypes.recipe.fields.itemDescription')" v-model="stepData.content">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'step',
    data() {
      return {
        stepData: this.itemData,
      }
    },
    props: {
      stepType: String,
      itemData: {
        title: String,
        content: String
      },
    },
  }
</script>

<style lang="scss">
  .step {
    padding: .8rem;
    background-color: $beige-medium;
    border-radius: $radius-small;
    flex-grow: 1;

    &.row > *:not(:last-child) {
      margin-right: .8rem;
    }

    .custom-input {
      margin: 0;
      display: flex;
      flex: 1;

      input {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>