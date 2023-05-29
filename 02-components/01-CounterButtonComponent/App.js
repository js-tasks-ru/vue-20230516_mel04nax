import { defineComponent } from './vendor/vue.esm-browser.js';
import CounterButton from './CounterButton.js';

export default defineComponent({
  name: 'App',

  components: {
    CounterButton,
  },

  data() {
    return {
      count: 0,
    };
  },

  template: `
    <div class="sample container">
      <p>count = {{ count }}</p>
      <p v-for="item in 3">
        <CounterButton v-model:count="count" />
      </p>
    </div>
  `,
});
