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
      @blur="isFocused = false"
      :id="control.id + '-input'"
      :model-value="controlData"
      :label="controlWrapper.label"
      :class="styles.control.input"
      clear-icon="mdi-close"
      :disable="!control.enabled"
      :placeholder="appliedOptions.placeholder"
      :autofocus="appliedOptions.focus"
      :required="control.required"
      :hide-bottom-space="!!control.description"
      :hint="control.description"
      :hide-hint="persistentHint()"
      :error="control.errors !== ''"
      :error-message="control.errors"
      :maxlength="appliedOptions.restrict ? control.schema.maxLength : undefined"
      :clearable="isClearable"
      :debounce="100"
      :type="dateFormat"
      step="1"
      outlined
      stack-label
      dense
    )
      template(#prepend)
        q-icon.cursor-pointer(v-if="dateFormat === 'datetime-local' || dateFormat === 'date'" name="mdi-calendar")
          q-popup-proxy(ref="popupProxy")
            q-date(
              v-bind="quasarProps('q-date')"
              @update:model-value="onChangeDate"
              :model-value="controlData"
              first-day-of-week="1"
              mask="YYYY-MM-DD"
            )
        q-icon.cursor-pointer(v-if="dateFormat === 'datetime-local' || dateFormat === 'time'" name="mdi-clock")
          q-popup-proxy(ref="popupProxy")
            q-time(
              v-bind="quasarProps('q-time')"
              @update:model-value="onChangeDate"
              :model-value="controlData"
              format24h
            )
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isDateControl,
  or,
  isDateTimeControl,
  isTimeControl,
} from '@jsonforms/core'
import { defineComponent, ref } from 'vue'
import { rendererProps, useJsonFormsControl, RendererProps } from '@jsonforms/vue'
import { ControlWrapper } from '../common'
import { determineClearValue, useQuasarControl } from '../utils'
import { QInput, QPopupProxy } from 'quasar'
import { isEmpty } from 'radash'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'

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
    const popupProxy = ref<QPopupProxy>(null)
    const clearValue = determineClearValue(undefined)
    const adaptTarget = (value) => (isEmpty(value) ? clearValue : value)
    const input = useQuasarControl(useJsonFormsControl(props), adaptTarget, 100)

    return {
      ...input,
      adaptTarget,
      popupProxy,
    }
  },
  computed: {
    appliedOptionsFormat(): string {
      return this.appliedOptions.format || DEFAULT_DATE_FORMAT
    },
    controlData() {
      const date = dayjs(this.control.data, this.appliedOptionsFormat, true)

      return date.format(DEFAULT_DATE_FORMAT)
    },
    dateFormat() {
      const format = this.control.schema.format || this.control.uischema?.options?.format || 'date'

      if (format === 'date-time') return 'datetime-local'
      if (format === 'time') return 'time'
      return 'date'
    },
  },
  methods: {
    onChangeDate(value: string) {
      const date = dayjs(value, DEFAULT_DATE_FORMAT, true)

      this.onChange(date.format(this.appliedOptionsFormat))
      this.popupProxy?.hide()
    },
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, or(isDateControl, isDateTimeControl, isTimeControl)),
}
</script>

<style>
input[type='date']::-webkit-calendar-picker-indicator,
input[type='time']::-webkit-calendar-picker-indicator,
input[type='datetime-local']::-webkit-calendar-picker-indicator {
  display: none;
  appearance: none;
  -webkit-appearance: none;
}

input[type='time']::-webkit-inner-spin-button,
input[type='datetime-local']::-webkit-inner-spin-button {
  display: none;
}

input[type='date'],
input[type='time'],
input[type='datetime-local'] {
  appearance: none;
  -moz-appearance: textfield;
}
</style>
