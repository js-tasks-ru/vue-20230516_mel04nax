import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      selectedId: null,
      meetupTitle: null,
    };
  },
  methods: {},
  watch: {
    async selectedId(newValue) {
      const fetchMeetupById = async (meetupId) => {
        return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((error) => {
              throw error;
            });
          }
        });
      };
      const response = await fetchMeetupById(newValue);
      this.meetupTitle = response.title;
    },
  },
});

const app = createApp(App);
app.mount('#app');
