<template>
  <div class="emoji-picker">
    <div class="emoji-picker-input" :class="{ 'non-empty': nonEmpty }"
      tabindex="1" @focus="pickerVisible = true" @focusout="checkBlur">
      <label class="custom-input-label">{{ $t('blockTypes["promo-set"].fields.icon') }}</label>
      <div>{{ emojiOutput }}</div>
      <div class="emoji-picker-wrapper" v-show="pickerVisible">
        <Picker v-bind="options" @select="showEmoji"></Picker>
      </div>
    </div>
    <div class="emoji-picker-close icon-close" v-show="nonEmpty" @click="clearEmoji">
      <font-awesome-icon icon="xmark"/>
    </div>
  </div>
</template>

<script>
  import data from "emoji-mart-vue-fast/data/all.json";
  import "emoji-mart-vue-fast/css/emoji-mart.css";
  import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";

  let emojiIndex = new EmojiIndex(data);

  export default {
    name: 'emoji-picker',
    components: {
      Picker,
    },
    data() {
      return {
        emoji: null,
        emojiIndex: emojiIndex,
        emojiOutput: '',
        nonEmpty: false,
        pickerVisible: false,
        options: {
          native: true,
          data: emojiIndex,
          showPreview: false,
        },
      }
    },
    methods: {
      showEmoji(emoji) {
        this.emoji = emoji;
        this.emojiOutput = emoji.native;
        this.nonEmpty = true;
      },
      checkBlur(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          this.pickerVisible = false;
        }
      },
      clearEmoji() {
        this.emoji = null;
        this.emojiOutput = '';
        this.nonEmpty = false;
      }
    }
  }
</script>

<style lang="scss">
  .emoji-picker {
    margin-bottom: 1rem;
    cursor: pointer;
    position: relative;

    &-input {
      background-color: $white;
      border-radius: $radius-small;
      padding: 1.6rem 1rem .4rem;
      font-size: 2.4rem;
      text-align: center;
      box-sizing: border-box;
      width: 8.5rem;
      height: 5.1rem;
      position: relative;

      & > label {
        position: absolute;
        left: 1rem;
        top: 1.6rem;
        font-size: 1.6rem;
        transition: .2s ease;
        user-select: none;
        cursor: pointer;
      }    

      &.non-empty label {
        top: .4rem;
        color: $grey-medium;
        font-size: 1.2rem;
      }
    }

    &-wrapper {
      position: absolute;
      top: 100%;
      z-index: 1;
      left: 0;
    }

    &-close {
      right: 0;
      top: 50%;
      transform: translateX(2.4rem) translateY(-50%);
    }
  }
</style>