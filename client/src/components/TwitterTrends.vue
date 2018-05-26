<template>
    <div class="trends">
        <div :class="{'active':activeTrend == trend}" @click="onTrendClick(trend)" class="trend" v-for="trend in trends" :key="trend">{{trend}}</div>
    </div>
</template>

<script>
export default {
  props: ["trends"],
  data() {
    //todo fetch from server
    return {
      activeTrend: null
    };
  },
  methods: {
    onTrendClick(trend) {
      this.$emit("onSuggestionTrendClick", trend);
      this.activeTrend = trend;
    }
  },
  mounted() {
    this.onTrendClick(this.trends[0]);
  }
};
</script>

<style scoped>
.trends {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.trend {
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 12px;
  margin: 0 3px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.66);
}

.active {
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
}
</style>
