<template lang="pug">
  control-wrapper(
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
    v-model:is-hovered="isHovered"
  )
    q-input(
      v-bind="quasarProps('q-input')"
      @update:model-value="onChangeDate"
      @focus="isFocused = true"
      @blur="onBlur"
      :id="control.id + '-input'"
      :model-value="control.data"
      :label="controlWrapper.label"
      :class="styles.control.input"
      clear-icon="mdi-close"
      :disable="!control.enabled"
      :placeholder="appliedOptions.placeholder"
      :autofocus="appliedOptions.focus"
      :required="control.required"
      :hint="control.description"
      :hide-hint="persistentHint()"
      :error="control.errors !== ''"
      :error-message="control.errors"
      :maxlength="appliedOptions.restrict ? control.schema.maxLength : undefined"
      :clearable="isClearable"
      :debounce="100"
      type="date"
      fill-mask
      outlined
      dense
    )
      template(#prepend)
        q-icon.cursor-pointer(name="mdi-calendar")
          q-popup-proxy(transition-show="scale" transition-hide="scale")
            q-date(
              v-bind="quasarProps('q-date')"
              @update:model-value="onChangeDate"
              :model-value="controlData"
              first-day-of-week="1"
              mask="YYYY-MM-DD"
            )
</template>

<script lang="ts">
import { ControlElement, JsonFormsRendererRegistryEntry, rankWith, isDateControl } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl, RendererProps } from '@jsonforms/vue'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { determineClearValue, useQuasarControl } from '../utils'
import { QInput } from 'quasar'
import { isEmpty } from 'radash'

const controlRenderer = defineComponent({
  name: 'DateControlRenderer',
  components: {
    ControlWrapper,
    QInput,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const clearValue = determineClearValue(undefined)
    const adaptTarget = (value) => (isEmpty(value) ? clearValue : value)
    const input = useQuasarControl(useJsonFormsControl(props), adaptTarget, 100)

    return {
      ...input,
      adaptTarget,
    }
  },
  computed: {
    controlData() {
      return this.control.data
      // const date = dayjs(this.control.data)
      // if (!this.control.data || !date.isValid()) {
      //   return undefined
      // }
      // console.log('controlData', this.control.data, '->', date.format('YYYY-MM-DD'))
      // return date.format('YYYY-MM-DD')
    },
  },
  methods: {
    onChangeDate(value: string) {
      this.onChange(value)
    },
    onBlur() {
      this.isFocused = false
      // this.onChangeDate(this.controlData)
    },
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isDateControl),
}
</script>

<style>
input[type='date']::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}

input[type='date'] {
  -moz-appearance: textfield;
}
</style>
