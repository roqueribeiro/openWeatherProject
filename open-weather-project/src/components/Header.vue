<template>
  <header>
    <img alt="Logo" src="../assets/logo.svg">
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  margin: 0;
  width: 100%;
  line-height: 60px;
  background: #ffffff;
  box-shadow: 0 1px 2px $shadow;
  z-index: 100;
  img {
    position: relative;
    display: block;
    margin: 17px auto;
    height: 26px;
  }
}
</style>
