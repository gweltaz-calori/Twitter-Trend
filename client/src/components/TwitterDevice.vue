<template>
    <div class="device">
        <svg width="133" height="134" viewBox="0 0 133 134" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle :stroke-dashoffset="dashOffset" ref="fill" cx="64.505" cy="64.505" r="64.505" transform="translate(2 2)" stroke="white" stroke-width="3"/>
            <circle stroke-opacity="0.07" cx="64.505" cy="64.505" r="64.505" transform="translate(2 2)" stroke="white" stroke-width="3"/>
        </svg>

        <div class="content">
            <span class="value">{{formatedPercentage}}</span>
            <img :src="icon" alt="">
        </div>
    </div>
</template>

<script>
import { TweenLite } from "gsap";
export default {
  props: ["percentage", "icon"],
  data() {
    return {
      fillLength: 0,
      percentageValue: 0,
      dashOffset: 0
    };
  },
  computed: {
    formatedPercentage() {
      return (this.percentageValue * 100).toFixed(0);
    }
  },
  methods: {
    setStroke() {
      TweenLite.to(this.$data, 0.4, {
        dashOffset: (1 - this.percentage) * this.fillLength
      });
    }
  },
  watch: {
    percentage(newValue) {
      TweenLite.to(this.$data, 0.4, { percentageValue: newValue });
      this.setStroke();
    }
  },
  mounted() {
    this.fillLength = this.$refs.fill.getTotalLength();
    this.$refs.fill.style.strokeDasharray = this.fillLength;
    this.dashOffset = this.fillLength;

    this.setStroke();
  }
};
</script> 

<style scoped>
.device {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  position: absolute;
}

.value {
  font-family: Open Sans;
  font-style: italic;
  font-weight: 600;
  line-height: normal;
  font-size: 36.0018px;
  text-align: center;
  margin-right: 10px;

  color: #ffffff;
}
</style>
