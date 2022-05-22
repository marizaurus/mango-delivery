export default {
  data() {
    return {
      activeTab: '',
    }
  },
  methods: {
    isActive(menuItem) {
      return this.activeTab === menuItem;
    },
    setActive(menuItem) {
      this.activeTab = menuItem;
    },
  }
}