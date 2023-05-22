import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',

  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      result: 0,
      selectedOperator: '',
    };
  },
  computed: {
    calculatedValue() {
      let result = 0;
      switch (this.selectedOperator) {
        case 'sum':
          result = this.firstNumber + this.secondNumber;
          break;
        case 'subtract':
          result = this.firstNumber - this.secondNumber;
          break;
        case 'multiply':
          result = this.firstNumber * this.secondNumber;
          break;
        case 'divide':
          result = this.firstNumber / this.secondNumber;
          break;
      }
      return result;
    },
  },
});

const app = createApp(App);
app.mount('#app');
