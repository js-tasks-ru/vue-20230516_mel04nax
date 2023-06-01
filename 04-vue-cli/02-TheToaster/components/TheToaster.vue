<template>
  <div class="toasts">
    <UITost v-for="tost in toastsList" :isSucces="tost.isSucces">{{ tost.message }}</UITost>
  </div>
</template>

<script>
import UITost from './UITost.vue';

export default {
  name: 'TheToaster',

  components: {
    UITost,
  },

  data() {
    return {
      toastsList: [],
    };
  },

  methods: {
    error(message) {
      const errorTost = {
        message,
        isSucces: false,
      };
      this.toastsList.push(errorTost);
      this.removeTost(errorTost);
    },
    success(message) {
      const succesTost = {
        message,
        isSucces: true,
      };
      this.toastsList.push(succesTost);
      this.removeTost(succesTost);
    },
    removeTost(tost) {
      setTimeout(() => {
        this.toastsList = this.toastsList.filter((el) => !(el.message === tost.message));
      }, 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
