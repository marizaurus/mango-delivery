<template>
  <div id="layout">
    <v-header></v-header>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from '@/shared/v-header';
import VFooter from '@/shared/v-footer';

export default {
  name: "Layout",
  components: {
    'v-header': VHeader,
    'v-footer': VFooter,
  }
}
</script>

<style scoped>

</style>