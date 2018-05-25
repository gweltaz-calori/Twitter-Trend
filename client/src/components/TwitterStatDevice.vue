<template>
    <div class="stat">
        <twitter-title>user devices</twitter-title>
        <div class="devices">
            <twitter-device class="twitter-device" v-for="(device,key) in devices" :key="key" :percentage="(device.value / population) || 0" :icon="device.image"></twitter-device>
        </div>
    </div>
</template>
<script>
import SocketManager from "@/js/SocketManager";

import AndroidIcon from "@/assets/icons/android.svg";
import WebIcon from "@/assets/icons/web.svg";
import IphoneIcon from "@/assets/icons/iphone.svg";

import TwitterTitle from "@/components/TwitterTitle.vue";
import TwitterDevice from "@/components/TwitterDevice.vue";
export default {
  components: {
    TwitterTitle,
    TwitterDevice
  },
  data() {
    return {
      devices: {
        Web: {
          value: 0,
          image: WebIcon
        },
        Android: {
          value: 0,
          image: AndroidIcon
        },
        iPhone: {
          value: 0,
          image: IphoneIcon
        }
      },
      population: 0
    };
  },
  methods: {
    resetStat() {
      this.population = 0;
      for (let device in this.devices) {
        this.devices[device].value = 0;
      }
    },
    onDevice(device) {
      this.devices[device.name].value++;
      this.population++;
    }
  },
  mounted() {
    SocketManager.onDevice(this.onDevice);
  }
};
</script>
<style scoped>
.stat {
  width: 133px;
}
.devices {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.twitter-device {
  margin: 18px 0;
}
</style>
