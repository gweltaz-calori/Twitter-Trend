<template>
    <div class="stat">
        <twitter-title>TWEETS WITH THE MORE FOLLOWERS</twitter-title>
        <transition-group tag="div" name="flip-list" class="tweets">
            <twitter-tweet :tweet="tweet" :key="tweet.id" v-for="tweet in sortedTweets" class="tweet"></twitter-tweet>
        </transition-group>
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
      tweets: []
    };
  },
  computed: {
    sortedTweets() {
      return this.tweets
        .sort((a, b) => b.followersCount - a.followersCount)
        .slice(0, 2);
    }
  },
  methods: {
    resetStat() {
      this.tweets = [];
    },
    onTweet(tweet) {
      this.tweets.push(tweet);
    }
  },
  mounted() {
    SocketManager.onTweet(this.onTweet);
  }
};
</script>
<style scoped>
.tweets {
  display: flex;
  flex-direction: column;
  margin-top: 21px;
}

.tweet {
  margin-bottom: 39px;
}

.flip-list-move {
  transition: transform 0.3s;
}
</style>
