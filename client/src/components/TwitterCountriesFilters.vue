<template>
    <div class="countries">
        <div class="country-list">
            <div @click="changeLang(country)" :key="country.locale" v-for="country in countries" class="country-item" :class="{'country-active':selectedCountry == country.locale}">
                <div class="indicator"></div>
                <div class="country-text">
                    {{country.name}}
                </div>
            </div>
        </div>
        <svg class="background" width="282" height="491" viewBox="0 0 282 491" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="243.543" cy="243.543" r="243.543" transform="translate(-206.878 1.84517)" stroke="white" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="25 25"/>
        </svg>
    </div>
</template>
<script>
export default {
  data() {
    return {
      countries: [
        {
          name: "World",
          locale: "world"
        },
        {
          name: "France",
          locale: "fr"
        },
        {
          name: "Italy",
          locale: "it"
        },
        {
          name: "America",
          locale: "en"
        }
      ],
      selectedCountry: "world"
    };
  },
  methods: {
    changeLang(country) {
      this.selectedCountry = country.locale;
      this.$emit("langChanged", this.selectedCountry);
    }
  }
};
</script>
<style scoped>
.countries {
  position: relative;
  display: flex;
  align-items: center;
  margin: auto 0;
  width: 282px;
  height: 491px;
}

.country-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 7.5px 0;
}

.country-active .indicator {
  transform: translateX(0px);
  opacity: 1;
}

.country-active .country-text {
  transform: translateX(23px);
  color: rgba(255, 255, 255, 1);
}

.country-list {
  margin: auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-left: 44px;
  justify-content: center;
}

.country-text {
  transition: transform 0.4s, opacity 0.4s;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 29px;

  color: rgba(255, 255, 255, 0.63);
}

.indicator {
  transition: transform 0.4s, opacity 0.4s;
  opacity: 0;
  transform: translateX(-9.55px);
  width: 9.55px;
  height: 5px;
  position: absolute;

  background: #ffffff;
  border-radius: 3px;
}

.background {
  pointer-events: none;
  position: absolute;
}
</style>
