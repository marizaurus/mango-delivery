<template>
  <li class="accordion__item">
    <div 
      class="accordion__trigger"
      :class="{'accordion__trigger--active': visible}"
      @click="toggle">
      <slot name="accordionTrigger"></slot>
    </div>

    <transition 
      name="accordion"
      @before-enter="end"
      @enter="start"
      @before-leave="start"
      @leave="end">
      <div class="accordion__content" v-show="visible">
        <ul>
          <slot name="accordionContent"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>


<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      toggle() {
        this.visible = !this.visible
      },
      start(el) {
        el.style.height = el.scrollHeight + "px";
      },
      end(el) {
        el.style.height = "0";
      }
    },
  };
</script>

<style lang="scss">
  .accordion {
    &__item {
      position: relative;
    }

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
