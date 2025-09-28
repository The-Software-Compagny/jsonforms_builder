<template lang="pug">
  control-wrapper(
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  )
    //- pre(v-text="JSON.stringify(control.data, null, 2)")
    q-input(
      @update:model-value="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :id="control.id + '-input'"
      :model-value="control.data"
      :label="controlWrapper.label"
      :class="styles.control.input"
      :disable="!control.enabled"
      :placeholder="appliedOptions.placeholder"
      :hint="control.description"
      :error="control.errors !== ''"
      :error-message="control.errors"
      :clearable="control.enabled"
      :precision="precision"
      :rules="[ val => val <= 60 || 'Please set value to maximum 60' ]"
      :step="step"
      type='number'
      filled
    )
</template>

<script lang="ts">
import { ControlElement, JsonFormsRendererRegistryEntry, rankWith, isNumberControl } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl, RendererProps } from '@jsonforms/vue'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { determineClearValue, useVanillaControl } from '../utils'
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
    const input = useVanillaControl(useJsonFormsControl(props), adaptTarget)

    return {
      ...input,
      adaptTarget,
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

      return fraction ? fraction.length : undefined
    },
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isNumberControl),
}
</script>
