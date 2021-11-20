<template>
  <div id="layout">
    <v-header></v-header>
    <v-home></v-home>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from '@/shared/v-header';
import vFooter from '@/shared/v-footer';
import vHome from '@/pages/v-home';

export default {
  name: "Layout",
  components: {
    'v-header': vHeader,
    'v-footer': vFooter,
    'v-home': vHome,
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap');
</style>