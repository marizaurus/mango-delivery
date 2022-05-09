<template>
  <div class="tag-card row">
    <font-awesome-icon icon="grip-lines" class="handle"/>
    <div class="tag-card-grid grid grid-mobile g-2 gg-1">
      <div class="tag-card-title t-medium">{{ itemData.title }}</div>
      <div class="custom-input step-content slim">
        <input type="text" :placeholder="$t('blockTypes.carousel.fields.cardDescription')" v-model="stepData.description">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tag-card',
    data() {
      return {
        stepData: this.itemData,
      }
    },
    props: {
      itemData: {
        title: String,
        desccription: String
      },
    },
  }
</script>

<style lang="scss">
  .tag-card {
    padding: .8rem;
    background-color: $beige-medium;
    border-radius: $radius-small;
    flex-grow: 1;

    &.row > *:not(:last-child) {
      margin-right: .8rem;
    }

    &-grid.grid.grid-mobile.g-2 {
      align-items: baseline;
      flex-grow: 1;
      grid-template-columns: 90px auto;
    }

    &-title {
      @extend .t-cut;
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