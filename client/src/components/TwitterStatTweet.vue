<template>
    <div class="stat">
        <twitter-title>TWEETS WITH THE MORE FOLLOWERS</twitter-title>
        <div class="tweets">
            <twitter-tweet :tweet="tweet" :key="tweet.id" v-for="tweet in sortedTweets" class="tweet"></twitter-tweet>
        </div>
    </div>
</template>
<script>
import SocketManager from "@/js/SocketManager";

import TwitterTitle from "@/components/TwitterTitle.vue";
import TwitterTweet from "@/components/TwitterTweet.vue";
export default {
  components: {
    TwitterTitle,
    TwitterTweet
  },
  data() {
    return {
      tweets: [],
      animating: false
    };
  },
  computed: {
    sortedTweets() {
      return this.tweets.sort((a, b) => b.followersCount - a.followersCount);
    }
  },
  methods: {
    resetStat() {
      this.tweets = [];
    },
    enter() {
      this.animating = true;
      setTimeout(() => {
        this.animating = false;
      }, 600);
    },
    afterEnter() {},
    onTweet(tweet) {
      if (this.animating) return;

      for (let i = 0; i < 3; i++) {
        let arrTweet = this.tweets[i];

        if (!arrTweet || arrTweet.followersCount < tweet.followersCount) {
          this.$set(this.tweets, i, tweet);
          break;
        }
      }
    }
  },
  mounted() {
    SocketManager.onTweet(this.onTweet);
  }
};
</script>
<style scoped>
.stat {
  width: 379px;
}
.tweets {
  margin-top: 21px;
  height: 392px;
}

.tweet {
  margin-bottom: 39px;
}
</style>
