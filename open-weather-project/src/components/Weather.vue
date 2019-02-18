<template>
  <article @click="getDataFromApi(cityName)">
    <transition name="fade">
      <div v-show="isLoading" class="preloader">
        <img alt="Loading..." src="../assets/loader.svg">
      </div>
    </transition>
    <header>
      <p v-text="cityName"></p>
    </header>
    <main>
      <p :class="`text-${tempClass}`" v-html="`${cityTemp}&deg;`"></p>
    </main>
    <footer>
      <ul v-show="highlighted">
        <li>
          <h1>HUMIDITY</h1>
          <p>
            <b v-html="cityHumidity"></b>
            <small>%</small>
          </p>
        </li>
        <li>
          <h1>PRESSURE</h1>
          <p>
            <b v-html="cityPressure"></b>
            <small>hPa</small>
          </p>
        </li>
      </ul>
      <p v-text="`Updated at ${formatDateToAmPm(lastUpdated)}`"></p>
    </footer>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import moment from "moment";

@Component
export default class Weather extends Vue {
  @Prop() private cityName!: string;
  @Prop({ default: false }) private highlighted?: boolean;

  updateInterval = 600000;
  isLoading = false;
  cityTemp = 0;
  cityHumidity = 0;
  cityPressure = 0;
  tempClass = "";
  lastUpdated = new Date();

  mounted() {
    var cityNameSplit = this.cityName.split(",");
    var cityNameFormated = `${cityNameSplit[0].toLowerCase()}_${cityNameSplit[1].toLowerCase()}`;
    if (localStorage.getItem(cityNameFormated)) {
      try {
        var dataObject = JSON.parse(
          localStorage.getItem(cityNameFormated) || "{}"
        );
        var currentMilliseconds = moment().diff(
          moment(dataObject.lastUpdated),
          "milliseconds"
        );
        if (currentMilliseconds >= this.updateInterval) {
          localStorage.removeItem(cityNameFormated);
          return this.getDataFromApi(cityNameFormated);
        }
        this.cityTemp = dataObject.cityTemp;
        this.cityHumidity = dataObject.cityHumidity;
        this.cityPressure = dataObject.cityPressure;
        this.lastUpdated = dataObject.lastUpdated;
        setInterval(() => {
          return this.getDataFromApi(cityNameFormated);
        }, this.updateInterval - currentMilliseconds);
      } catch (error) {
        localStorage.removeItem(cityNameFormated);
      }
    } else {
      this.getDataFromApi(cityNameFormated);
    }
  }

  @Watch("cityTemp")
  onTempChange(newVal: number, oldVal: number) {
    let tempClass = "";
    if (!newVal) return tempClass;
    switch (true) {
      case newVal <= 5:
        tempClass = "primary";
        break;
      case newVal > 5 && newVal <= 25:
        tempClass = "warning";
        break;
      case newVal > 25:
        tempClass = "danger";
        break;
    }
    this.tempClass = tempClass;
  }

  async getDataFromApi(cityNameFormated: string) {
    this.isLoading = true;
    return await this.$axios
      .get("/weather", {
        responseType: "json",
        params: {
          q: this.cityName,
          APPID: "3309ed17936f0117bec46bc9499438f3",
          units: "metric"
        }
      })
      .then(response => {
        this.cityTemp = response.data.main.temp.toFixed(0);
        this.cityHumidity = response.data.main.humidity.toFixed(0);
        this.cityPressure = response.data.main.pressure.toFixed(0);
        this.lastUpdated = moment().toDate();
        var dataObject: any = {};
        dataObject["cityTemp"] = this.cityTemp;
        dataObject["cityHumidity"] = this.cityHumidity;
        dataObject["cityPressure"] = this.cityPressure;
        dataObject["lastUpdated"] = this.lastUpdated;
        localStorage.setItem(cityNameFormated, JSON.stringify(dataObject));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  formatDateToAmPm(dateTimeFromApi: Date) {
    return moment(dateTimeFromApi).format("LTS");
  }
}
</script>

<style scoped lang="scss">
article {
  position: relative;
  flex: auto;
  flex-basis: 100%;
  max-width: 250px;
  margin: 25px;
  background: $bg-card;
  box-shadow: 0 2px 4px $shadow;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  .preloader {
    position: absolute;
    background: $bg-card;
    width: 100%;
    height: 100%;
    left: 0;
    border-radius: 5px;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      margin: -40px 0 0 -40px;
    }
  }
  header {
    padding: 15px;
    border-bottom: 1px $divider solid;
  }
  main {
    padding: 15px 0;
    min-height: 100px;
    font-size: 5em;
  }
  footer {
    padding: 15px;
    background: $bg-card-footer;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      list-style: none;
      padding: 10px 0;
      li {
        flex: auto;
        h1 {
          font-size: 11px;
          color: $font-secondary;
        }
        p {
          small {
            font-size: 11px !important;
          }
        }
      }
    }
    > p {
      font-size: 11px;
      color: $font-secondary;
    }
  }
}
</style>
