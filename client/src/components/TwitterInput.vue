<template>
    <div class="input-container">
       
        <div v-if="value.trim().length > 0" class="tag">{{value}}</div>
        
    </div>
</template>

<script>
export default {
  props: ["placeholder", "value"],
  methods: {
    search() {
      this.$emit("input", this.$refs.input.value);
    },
    clear() {
      this.$emit("input", "");
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  position: relative;

  width: 310.49px;
  height: 68.39px;

  border: 2px solid #ffffff;
  box-sizing: border-box;

  padding: 24px 32px;
  border-radius: 34.1945px;
}

.input {
  width: 100%;
  color: white;
  text-transform: uppercase;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  padding-right: 32px;
}

.icon-container {
  position: absolute;
  right: 32px;
  cursor: pointer;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */

  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;

  color: rgba(255, 255, 255, 0.36);
}

svg {
  width: 20px;
}

.tag {
  background-color: white;
  border-radius: 20px;
  padding: 10px 8px;
  text-align: center;
  position: absolute;
  z-index: 999;
  left: 21px;
  text-transform: uppercase;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
}

.disabled {
  pointer-events: none;
}
</style>