<template lang="pug">
  div(
    v-if="visible"
    :id="id"
    :class="styles.control.root"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  )
    .q-field__inner.relative-position.col.self-stretch
      slot(name="default")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Styles } from '../styles'
import { Options } from '../utils'

/**
 * ControlWrapper Component
 *
 * A Vue 3 wrapper component that provides common functionality and styling for JSONForms
 * control elements. This component serves as a foundation for all form controls, handling
 * visibility, hover states, focus management, and consistent styling.
 *
 * Features:
 *  - Visibility control based on JSONForms schema
 *  - Mouse hover state management with debounced leave events
 *  - Focus state tracking for enhanced UX
 *  - Consistent styling application across all controls
 *  - Slot-based content projection for flexible control rendering
 *  - Quasar field styling integration
 *
 * Usage:
 *  This component is used internally by other control renderers to wrap their content.
 *  It should not be used directly in templates but rather as a building block for
 *  form control components.
 *
 * Example:
 *  <control-wrapper v-bind="controlWrapper" :styles="styles">
 *    <q-input v-model="value" />
 *  </control-wrapper>
 */
export default defineComponent({
  name: 'ControlWrapperCommonComponent',
  props: {
    /** Unique identifier for the control element */
    id: {
      required: true,
      type: String,
    },

    /** Optional description text for the control */
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },

    /** Error message text to display */
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },

    /** Label text for the control */
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },

    /** Applied options configuration object */
    appliedOptions: {
      required: false as const,
      type: Object as PropType<Options>,
      default: undefined,
    },

    /** Controls the visibility of the wrapper */
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },

    /** Indicates if the field is required */
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },

    /** Tracks if the control is currently focused */
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },

    /** Tracks if the control is currently hovered */
    isHovered: {
      required: false as const,
      type: Boolean,
      default: false,
    },

    /** Styling configuration object */
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
  },
  methods: {
    /**
     * Handles mouse over events to update hover state
     * Emits update:isHovered event with true value
     *
     * @returns {void}
     */
    mouseOver(): void {
      this.$emit('update:isHovered', true)
    },

    /**
     * Handles mouse leave events to update hover state
     *
     * @returns {void}
     */
    mouseLeave(): void {
      this.$emit('update:isHovered', false)
    },
  },
})
</script>
