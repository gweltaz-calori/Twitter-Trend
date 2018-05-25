<template>
    <div id="app" >
        <twitter-countries-filters @langChanged="changeLang" ></twitter-countries-filters>
        <div v-if="trendWord" class="topbar">
            <twitter-input v-model="trendWord" placeholder="TREND"></twitter-input>
            <twitter-trends :trends="trends" @onSuggestionTrendClick="onSuggestionTrendClick"></twitter-trends>
        </div>
        <div class="stats">
            <twitter-stat-emoji ref="emoji" class="stat"></twitter-stat-emoji>
            <twitter-stat-word ref="word" class="stat"></twitter-stat-word>
            <twitter-stat-device ref="device" class="stat"></twitter-stat-device>
            <twitter-stat-tweet ref="tweet" class="stat"></twitter-stat-tweet>
        </div>
    </div>
</template>

<script>
import { getCurrentTrends, getActiveTrend } from "@/api";
import SocketManager from "@/js/SocketManager";

import TwitterCountriesFilters from "@/components/TwitterCountriesFilters.vue";
import TwitterInput from "@/components/TwitterInput.vue";
import TwitterStatDevice from "@/components/TwitterStatDevice.vue";
import TwitterStatEmoji from "@/components/TwitterStatEmoji.vue";
import TwitterStatWord from "@/components/TwitterStatWord.vue";
import TwitterStatTweet from "@/components/TwitterStatTweet.vue";
import TwitterTrends from "@/components/TwitterTrends.vue";
export default {
  components: {
    TwitterCountriesFilters,
    TwitterStatDevice,
    TwitterStatEmoji,
    TwitterStatWord,
    TwitterStatTweet,
    TwitterInput,
    TwitterTrends
  },
  watch: {
    trendWord() {
      SocketManager.changeTrend(this.trendWord);
    }
  },
  data() {
    return {
      trendWord: null,
      trends: []
    };
  },
  async beforeMount() {
    this.trends = await getCurrentTrends();
    this.trendWord = await getActiveTrend();
  },
  methods: {
    onSuggestionTrendClick(trend) {
      this.trendWord = trend.name;
    },
    changeLang(lang) {
      SocketManager.changeLang(lang);
      this.reset();
    },
    reset() {
      [
        this.$refs.emoji,
        this.$refs.device,
        this.$refs.tweet,
        this.$refs.word
      ].map(stat => {
        stat.resetStat();
      });
    }
  }
};
</script>

<style lang="scss">
@import "assets/css/main";

#app {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.stats {
  padding: 0 200px;
  height: 555px;
  display: inline-flex;
  flex-direction: row;
}

.topbar {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.stat {
  margin: 0 80px;
  height: 555px;
}
</style>
