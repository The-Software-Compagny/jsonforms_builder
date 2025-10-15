<template lang="pug">
  q-toolbar.q-px-none.q-custom-toolbar-label(
    v-bind="quasarProps('q-toolbar')"

    v-if="label.visible"

    :title="label.text"
    :style="labelStyle"
    :class="styles.label.root"
    :id="label.id"
  )
    q-toolbar-title(v-text="label.text")
</template>

<script lang="ts">
import { JsonFormsRendererRegistryEntry, LabelElement, rankWith, uiTypeIs } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { rendererProps, RendererProps, useJsonFormsLabel } from '@jsonforms/vue'
import { useQuasarLabel } from '../utils'

/**
 * LabelRenderer Component
 *
 * A Vue 3 component that renders JSONForms Label elements using Quasar's q-toolbar component.
 * This renderer displays static text labels within forms, providing visual structure and
 * organization to form layouts.
 *
 * Features:
 *  - Renders labels as Quasar toolbar titles
 *  - Supports visibility control via JSONForms schema
 *  - Applies custom styling through the styles system
 *  - Integrates with Quasar's theming and design system
 *
 * Usage:
 *  This component is automatically selected by JSONForms when encountering a Label UI element.
 *  It should not be used directly but rather through the JSONForms rendering system.
 *
 * Example UI Schema:
 *  {
 *    type: "Label",
 *    text: "Personal Information"
 *  }
 */
const labelRenderer = defineComponent({
  name: 'LabelAdditionalRenderer',
  props: {
    ...rendererProps<LabelElement>(),
  },

  /**
   * Setup function that initializes the label renderer with JSONForms integration
   * @param props - Renderer properties containing label element configuration
   * @returns Combined functionality from useQuasarLabel and useJsonFormsLabel hooks
   */
  setup(props: RendererProps<LabelElement>) {
    return useQuasarLabel(useJsonFormsLabel(props))
  },

  computed: {
    /**
     * Computed style for the label component
     *
     * @returns CSS properties object with minimum height styling
     */
    labelStyle(): Record<string, string> {
      return {
        minHeight: '32px',
      }
    },
  },
})

export default labelRenderer

/**
 * JSONForms Renderer Registry Entry
 *
 * Registers the LabelRenderer component with JSONForms rendering system.
 * The tester function determines when this renderer should be used based on UI schema type.
 */
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: labelRenderer,
  tester: rankWith(1, uiTypeIs('Label')), // Matches UI elements with type "Label"
}
</script>
