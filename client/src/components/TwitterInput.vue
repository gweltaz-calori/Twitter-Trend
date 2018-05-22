<template>
    <div class="input-container">
        <input 
            :class="{'disabled':value.trim().length > 0}"
            @keyup.enter="search"
            ref="input"
            v-bind:value="value" 
            :placeholder="placeholder" 
            class="input" 
            type="text">
        <div v-if="value.trim().length > 0" class="tag">{{value}}</div>
        <div  @click="clear" class="icon-container" v-if="value.trim().length > 0">
            <svg class="icon" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L12.8324 12.8324" transform="translate(1.52832 2.33789)" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M0 0L12.8324 12.8324" transform="translate(14.3608 2.33789) scale(-1 1)" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="icon-container" v-else @click="search">
            <svg viewBox="0 0 104 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M60.4385 65.6308C54.0571 70.8612 45.895 74 37 74C16.5654 74 0 57.4345 0 37C0 16.5655 16.5654 0 37 0C57.4346 0 74 16.5655 74 37C74 43.8328 72.1479 50.233 68.9185 55.7259L101.521 88.3293C103.865 90.6725 103.865 94.4714 101.521 96.8146L100.814 97.5217C98.4712 99.8648 94.6724 99.8648 92.3291 97.5217L60.4385 65.6308ZM65 37C65 52.464 52.4639 65 37 65C21.5361 65 9 52.464 9 37C9 21.536 21.5361 9 37 9C52.4639 9 65 21.536 65 37Z" fill="white"/>
            </svg>
        </div>
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