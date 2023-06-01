<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="setPrevioisMonth"
        ></button>
        <div class="calendar-view__date">{{ currentDateText }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="setNextMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="(day, index) in monthDays" :key="index" :class="day.class" tabindex="0">
        <div class="calendar-view__cell-day">{{ day.day }}</div>
        <div class="calendar-view__cell-content">
          <a
            v-show="day?.meetups"
            v-for="meetup in day?.meetups"
            :key="meetup.id"
            href="/meetups/1"
            class="calendar-event"
          >
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      date: new Date(),
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    currentDateText() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    monthDays() {
      const currentMonth = this.date.getMonth();
      const currentYear = this.date.getFullYear();
      const isFirstMonth = currentMonth === 0;
      const isLastMonth = currentMonth === 11;
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const previousMonth = isFirstMonth ? 11 : currentMonth - 1;
      const previousMonthYear = isFirstMonth ? currentYear - 1 : currentYear;
      const lastDayOfPreviousMonth = new Date(previousMonthYear, previousMonth + 1, 0).getDate();
      const monthDays = [];

      const addPreviousMonthsDays = () => {
        let startValue = firstDayOfMonth - 2;
        if (firstDayOfMonth === 0) {
          startValue = 5;
        }
        for (let i = startValue; i >= 0; i--) {
          const date = new Date(previousMonthYear, previousMonth, lastDayOfPreviousMonth - i);
          monthDays.push({
            day: lastDayOfPreviousMonth - i,
            date,
            class: 'calendar-view__cell calendar-view__cell_inactive',
          });
        }
      };
      const addCurrentMonthDays = () => {
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(currentYear, currentMonth, i);
          const meetups = this.meetupsOnCurrentMonth.filter((el) => new Date(el.date).getDate() === date.getDate());
          monthDays.push({
            day: i,
            date,
            class: 'calendar-view__cell',
            meetups,
          });
        }
      };
      const addNextMonthDays = () => {
        const nextMonth = isLastMonth ? 0 : currentMonth + 1;
        const nextMonthYear = isLastMonth ? currentYear + 1 : currentYear;
        for (let i = 1; monthDays.length % 7 !== 0; i++) {
          const date = new Date(nextMonthYear, nextMonth, i);
          monthDays.push({
            day: i,
            date,
            class: 'calendar-view__cell calendar-view__cell_inactive',
          });
        }
      };

      if (firstDayOfMonth !== 1) {
        addPreviousMonthsDays();
      }

      addCurrentMonthDays();
      if (monthDays.length % 7 !== 0) {
        addNextMonthDays();
      }

      return monthDays;
    },
    meetupsOnCurrentMonth() {
      return this.meetups.filter((el) => {
        return (
          new Date(el.date).getMonth() === this.date.getMonth() &&
          new Date(el.date).getFullYear() === this.date.getFullYear()
        );
      });
    },
  },
  methods: {
    setPrevioisMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    },
    setNextMonth() {
      const currentMonth = this.date.getMonth();
      this.date = new Date(this.date.setMonth(currentMonth + 1, 1));
    },
    checkMeetup(cellDate) {
      const toLocale = (date) => {
        return new Date(date).toLocaleDateString(navigator.language, {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });
      };

      const suitableMeetups = this.meetups.filter((el) => toLocale(el.date) === toLocale(cellDate));
      return suitableMeetups;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
