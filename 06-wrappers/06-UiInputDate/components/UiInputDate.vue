<template>
  <UiInput v-bind="$attrs" :modelValue="formattedValue" :type="type" @change="updateValue">
    <template v-if="$slots['left-icon']" #left-icon>
      <slot name="left-icon" />
    </template>
    <template v-if="$slots['right-icon']" #right-icon>
      <slot name="right-icon" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  inheritAttrs: false,

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
    step: {
      type: [String, null],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    formattedValue() {
      if (!this.modelValue) return undefined;
      const date = new Date(this.modelValue).toISOString();

      let result;

      if (this.type === 'date') {
        result = date.substring(0, 10);
      } else if (this.type === 'time') {
        this.step % 60 === 0 ? (result = date.substring(11, 16)) : (result = date.substring(11, 19));
      } else {
        result = date.substring(0, 16);
      }

      return result;
    },
  },

  methods: {
    updateValue($event) {
      const value = $event.target.value ? $event.target.valueAsNumber : undefined;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
