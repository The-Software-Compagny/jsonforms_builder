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
      @update:model-value="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="control.id + '-input'"
      :model-value="formattedValue"
      :label="controlWrapper.label"
      clear-icon="mdi-close"
      :class="styles.control.input"
      :disable="!control.enabled"
      :placeholder="appliedOptions.placeholder"
      :autofocus="appliedOptions.focus"
      :required="control.required"
      :hint="control.description"
      :hide-hint="persistentHint()"
      :error="control.errors !== ''"
      :error-message="control.errors"
      :clearable="isClearable"
      :debounce="100"
      :step="step"
      type='number'
      outlined
      stack-label
      dense
    )
</template>

<script lang="ts">
import { ControlElement, JsonFormsRendererRegistryEntry, rankWith, isNumberControl } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl, RendererProps } from '@jsonforms/vue'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { determineClearValue, useQuasarControl } from '../utils'
import { QInput } from 'quasar'
import { isEmpty } from 'radash'

const controlRenderer = defineComponent({
  name: 'NumberControlRenderer',
  components: {
    ControlWrapper,
    QInput,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const clearValue = determineClearValue(undefined)
    const adaptTarget = (value: any) => (isEmpty(value) ? clearValue : Number(value))
    const input = useQuasarControl(useJsonFormsControl(props), adaptTarget)

    // Méthode personnalisée pour gérer la précision
    const customOnChange = (value: any) => {
      let processedValue = adaptTarget(value)

      // Si on a une valeur numérique et une précision définie
      if (processedValue !== clearValue && !isNaN(processedValue)) {
        const component = input as any
        const precision = component.precision?.value
        if (precision !== undefined) {
          processedValue = Number(processedValue.toFixed(precision))
        }
      }

      input.onChange(processedValue)
    }

    return {
      ...input,
      adaptTarget,
      onChange: customOnChange,
    }
  },
  computed: {
    step(): number {
      const options: any = this.appliedOptions

      return options.step ?? 0.1
    },
    precision(): number | undefined {
      if (!this.step || Number.isInteger(this.step)) return undefined

      const stepStr = this.step.toString()

      if (stepStr.indexOf('e-') > -1) {
        return parseInt(stepStr.split('e-')[1], 10)
      }

      const fraction = stepStr.split('.')[1]

      console.log('Fraction:', fraction)

      return fraction ? fraction.length : undefined
    },
    formattedValue(): string | number {
      if (this.control.data == null || this.control.data === '') {
        return this.control.data
      }

      const num = Number(this.control.data)
      if (isNaN(num)) {
        return this.control.data
      }

      // Si on a une précision définie, formater le nombre
      if (this.precision !== undefined) {
        return num.toFixed(this.precision)
      }

      return this.control.data
    },
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isNumberControl),
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
