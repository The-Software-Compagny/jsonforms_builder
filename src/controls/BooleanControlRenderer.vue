<template lang="pug">
  control-wrapper(
    v-bind="controlWrapper"
    :styles="styles"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  )
    .q-field__inner.relative-position.col.self-stretch
      .q-field.row.no-wrap.items-start.q-field--dark.q-field--error.q-field--densed
        //- pre(v-text="JSON.stringify(control.data, null, 2)")
        q-checkbox.q-field__control(
          @update:model-value="onChange"
          @focus="handleFocus"
          @blur="handleBlur"
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
        )
        .q-field__bottom.row.items-start.q-field__bottom--animated
          .q-field__messages.col
            div(v-if="control.errors !== ''" role='alert' v-text='control.errors')
</template>

<script lang="ts">
import { ControlElement, JsonFormsRendererRegistryEntry, rankWith, isBooleanControl } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, useJsonFormsControl, RendererProps } from '@jsonforms/vue'
import { default as ControlWrapper } from './ControlWrapper.vue'
import { useVanillaControl } from '../utils'

const controlRenderer = defineComponent({
  name: 'BooleanControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsControl(props))
  },
})

export default controlRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isBooleanControl),
}
</script>
