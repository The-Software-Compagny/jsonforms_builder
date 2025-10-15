<template lang="pug">
  control-wrapper(
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
    v-model:is-hovered="isHovered"
  )
    q-select(
      v-bind="quasarProps('q-select')"
      @update:model-value="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="control.id + '-input'"
      :model-value="control.data"
      :label="computedLabel"
      :class="styles.control.input"
      clear-icon="mdi-close"
      :disable="!control.enabled && !isReadonly"
      :readonly="isReadonly"
      :required="control.required"
      :placeholder="appliedOptions.placeholder"
      :options="control.options || suggestions"
      option-value="value"
      option-label="label"
      :hint="control.description"
      :hide-hint="persistentHint()"
      :error="control.errors !== ''"
      :error-message="control.errors"
      :clearable="isClearable"
      :debounce="100"
      emit-value
      outlined
      dense
    )
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isStringControl,
  and,
  hasOption,
  or,
  isEnumControl,
} from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, RendererProps, useJsonFormsEnumControl } from '@jsonforms/vue'
import { ControlWrapper } from '../common'
import { determineClearValue, useQuasarControl } from '../utils'
import { QInput } from 'quasar'
import { isArray, isEmpty, isString } from 'radash'

const controlRenderer = defineComponent({
  name: 'SuggestionControlRenderer',
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
    const input = useQuasarControl(useJsonFormsEnumControl(props), adaptTarget, 100)

    return {
      ...input,
      adaptTarget,
    }
  },
  computed: {
    suggestions(): string[] | undefined {
      const suggestions = this.control.uischema.options?.suggestion

      if (!suggestions) {
        return undefined
      }

      if (!isArray(suggestions)) {
        console.warn('Suggestions must be an array')
        return undefined
      }

      const validSuggestions = suggestions
        .filter((suggestion) => {
          if (isString(suggestion)) {
            return true
          }
          if (suggestion != null && typeof suggestion.toString === 'function') {
            return true
          }
          console.warn('Invalid suggestion item:', suggestion)
          return false
        })
        .map((suggestion) => (isString(suggestion) ? suggestion : suggestion.toString()))

      return !isEmpty(validSuggestions) ? validSuggestions : undefined
    },
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, and(isStringControl, or(hasOption('suggestion'), isEnumControl))),
}
</script>
