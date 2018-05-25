<template>
    <div class="stat">
        <twitter-title>most used words</twitter-title>
        <transition-group name="flip-list" tag="div" class="words">
            <twitter-word :key="value" v-for="(value,key) in filteredWords">{{value}}</twitter-word>
        </transition-group>
    </div>
</template>
<script>
import SocketManager from "@/js/SocketManager";

import TwitterTitle from "@/components/TwitterTitle.vue";
import TwitterWord from "@/components/TwitterWord.vue";
export default {
  components: {
    TwitterTitle,
    TwitterWord
  },
  data() {
    return {
      words: {}
    };
  },
  computed: {
    filteredWords() {
      return Object.keys(this.words)
        .sort((a, b) => this.words[b] - this.words[a])
        .slice(0, 6);
    }
  },
  methods: {
    resetStat() {
      this.words = {};
    },
    onWord(word) {
      for (let wordName in word) {
        if (!this.words[wordName]) {
          this.$set(this.words, wordName, word[wordName]);
        }

        this.words[wordName]++;
      }
    }
  },
  mounted() {
    SocketManager.onWord(this.onWord);
  }
};
</script>
<style scoped>
.stat {
  width: 75px;
}
.words {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
