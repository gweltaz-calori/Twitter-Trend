<template>
    <div class="stat">
        <twitter-title>TOP EMOJIS</twitter-title>
        <transition-group appear name="flip-list" tag="div" class="emojis">
            <twitter-emoji class="emoji" :key="emoji.code" v-for="emoji in fitleredEmojis" :src="emoji.imageUrl"></twitter-emoji>
        </transition-group>
    </div>
</template>
<script>
import SocketManager from "@/js/SocketManager";

import TwitterTitle from "@/components/TwitterTitle.vue";
import TwitterEmoji from "@/components/TwitterEmoji.vue";
export default {
  components: {
    TwitterTitle,
    TwitterEmoji
  },
  data() {
    return {
      emojis: []
    };
  },
  computed: {
    fitleredEmojis() {
      return this.emojis.sort((a, b) => b.count - a.count).slice(0, 3);
    }
  },
  methods: {
    resetStat() {
      this.emojis = [];
    },
    onEmoji(emoji) {
      let existingEmoji = this.emojis.find(
        emojiItem => emoji.code == emojiItem.code
      );
      if (!existingEmoji) {
        existingEmoji = {
          code: emoji.code,
          imageUrl: emoji.imageUrl,
          count: 0
        };

        if (this.emojis.length <= 15) {
          this.emojis.push(existingEmoji);
        }
      }
      existingEmoji.count++;
    }
  },
  mounted() {
    SocketManager.onEmoji(this.onEmoji);
  }
};
</script>
<style scoped>
.stat {
  width: 72px;
}
.emojis {
  display: flex;
  flex-direction: column;
  height: 312px;
  overflow: hidden;
}

.emoji {
  margin: 16px 0;
}
</style>
