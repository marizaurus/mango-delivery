import _get from 'lodash/get';

export default {
  data() {
    return {
      activeField: '',
      searchParams: {
        orderSum: []
      }
    }
  },
  methods: {
    formEvents(target) {
      return {
        focus: () => this.setField(target),
        blur: this.clearFocus,
      }
    },
    setField(target) {
      this.activeField = target; 
    },
    clearFocus() {
      this.activeField = '';
    },
    checkFocus(target) {
      return { 'non-empty': this.activeField == target || !!_get(this.$data, target) };
    },
    handleInput(e, data) {
      this.searchParams.orderSum.splice(data, 1, +e.target.value || 0);
      this.$refs.slider.setValue(this.searchParams.orderSum);
    },
  },
}