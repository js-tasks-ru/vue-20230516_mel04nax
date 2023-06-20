<template>
  <label class="checkbox">
    <input v-model="modelValueProxy" v-bind="$attrs" type="checkbox" class="checkbox__input" />
    <span class="checkbox__box"></span>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'UiCheckbox',

  props: {
    modelValue: [Boolean, Array, Set],
  },

  inheritAttrs: false,

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        if (typeof this.modelValue === 'boolean') {
          return this.modelValue;
        } else if (Array.isArray(this.modelValue)) {
          return this.modelValue.includes(this.$attrs?.value);
        } else {
          return this.modelValue.has(this.$attrs?.value);
        }
      },
      set(value) {
        const currentValue = this.$attrs?.value;
        if (typeof this.modelValue === 'boolean') {
          this.$emit('update:modelValue', value);
        } else if (Array.isArray(this.modelValue)) {
          let newArray;
          if (this.modelValue.includes(currentValue)) {
            newArray = this.modelValue.filter((el) => el !== currentValue);
          } else {
            newArray = [...this.modelValue, currentValue];
          }
          this.$emit('update:modelValue', newArray);
        } else {
          const newSet = new Set();
          for (const item of this.modelValue) {
            newSet.add(item);
          }
          newSet.has(currentValue) ? newSet.delete(currentValue) : newSet.add(currentValue);
          this.$emit('update:modelValue', newSet);
        }
      },
    },
  },
};
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-property: background-color, border-color;
}

.checkbox > input.checkbox__input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > .checkbox__box {
  border: 2px solid var(--blue-light);
}

.checkbox > .checkbox__box {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input.checkbox__input:checked ~ .checkbox__box:after {
  display: block;
}

.checkbox > .checkbox__box:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('@/assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
