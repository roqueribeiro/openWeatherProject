<template>
  <div id="app">
    <Header/>
    <router-view class="view"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  .view {
    margin-top: 60px;
  }
}
</style>