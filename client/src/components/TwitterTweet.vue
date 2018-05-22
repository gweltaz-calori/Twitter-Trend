<template>
    <div class="tweet">
        <img class="tweet-profile" :src="tweet.image" alt="">
        <p class="tweet-text">
            {{tweet.text}}
        </p>
        <span class="tweet-author">{{tweet.author}}</span>
    </div>
</template>
<script>
export default {
  props: ["tweet"]
};
</script>
<style scoped>
.tweet {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 379px;
  height: 157px;

  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03);
  border-radius: 13px;
}

.tweet-profile {
  width: 64px;
  height: 64px;
  background-color: #eeeeee;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  left: -32px;
}

.tweet-text {
  width: 280px;
  height: 77px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 14px;

  color: #000000;
}

.tweet-author {
  margin-top: 3px;
}
</style>
