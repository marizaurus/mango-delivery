<template>
  <div class="modal-backdrop">
    <div class="modal">
      <button class="modal-close btn btn-round bg-white t-grey" @click="close">
        <font-awesome-icon icon="xmark"/>
      </button>
      <div class="grid gv-1">
        <div class="modal__header">
          <slot name="header"/>
        </div>

        <div class="modal__body">
          <slot name="body"/>
        </div>

        <div class="modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        document.querySelector('body').classList.remove('modal-open');
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss">
  .modal {
    background: $beige-medium;
    border-radius: $radius-medium;
    padding: 1.6rem 3.2rem;
    position: relative;
    box-sizing: border-box;

    &-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba($grey, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    &-close {
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(50%) translateY(-50%);
    }
  }
</style>