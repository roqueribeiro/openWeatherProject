<template>
  <div class="home">
    <section>
      <Weather cityName="Nuuk,GL"/>
      <Weather cityName="Urubici,BR" highlighted="true"/>
      <Weather cityName="Nairobi,KE"/>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Weather from "@/components/Weather.vue";

@Component({
  components: {
    Weather
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  overflow-x: hidden;
  overflow-y: scroll;
  section {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    section :nth-child(1) {
      order: 2;
    }
    section :nth-child(2) {
      order: 1;
    }
    section :nth-child(3) {
      order: 3;
    }
  }
}
</style>