import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      error: null,
    };
  },
  async mounted() {
    try {
      this.meetup = await fetchMeetupById(this.meetupId);
    } catch (error) {
      this.error = error;
    }
  },
  watch: {
    async meetupId(newValue) {
      this.meetup = null;
      this.error = null;
      try {
        this.meetup = await fetchMeetupById(newValue);
      } catch (error) {
        this.error = error;
      }
    },
  },
  computed: {
    alertText() {
      return this.error?.message || 'Загрузка...';
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />
      <UiContainer v-else>
        <UiAlert :text="alertText" />
      </UiContainer>
    </div>`,
});
