<template>
  <div class="accordion" tabindex="1" @focusout="checkBlur">
    <div class="accordion__trigger"
      :class="{'accordion__trigger--active': visible}"
      @click="toggle">
      <slot name="accordionTrigger" :visible="visible"/>
    </div>

    <transition 
      name="accordion"
      @before-enter="end"
      @enter="start"
      @after-enter="reset"
      @before-leave="start"
      @leave="end">
      <div class="accordion__content" v-show="visible">
        <slot name="accordionContent"/>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'accordion',
    data() {
      return {
        visible: this.initialVisible,
      };
    },
    props: {
      initialVisible: Boolean,
      closeOnBlur: Boolean,
    },
    methods: {
      toggle() {
        this.visible = !this.visible;
      },
      start(el) {
        el.style.height = el.scrollHeight + "px";
      },
      end(el) {
        el.style.height = "0";
      },
      reset(el) {
        el.style.height = "auto";
      },
      checkBlur(e) {
        // prevent blur when a child is focused
        if (this.closeOnBlur && !e.currentTarget.contains(e.relatedTarget)) {
          this.visible = false;
        }
      }
    },
  };
</script>

<style lang="scss">
  .accordion {
    &__trigger {
      cursor: pointer;
    }

    &__content {
      overflow: hidden;

      ul {
        padding: 0;
      }
    }

    &-enter-active,
    &-leave-active {
      transition: height .2s ease, opacity .2s ease;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
