<template lang="pug">
  div(v-if="visible" :id="id" :class="styles.control.root")
    .q-field__inner.relative-position.col.self-stretch
      //- .q-field.row.no-wrap.items-start.q-field--filled.q-input.q-field--labeled.q-field--dark.q-field--error.q-field--highlighted.q-field--with-bottom.input
      slot
      //- .q-field__bottom.row.items-start.q-field__bottom--animated(v-if='"#/properties/committer" === id')
      //-   .q-field__messages.col
      //-     div(role='alert') is a required propertyy
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core'
import { defineComponent, PropType } from 'vue'
import { Styles } from '../styles'
import { Options } from '../utils'

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: true,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as const,
      type: Object as PropType<Options>,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription,
      )
    },
    showAsterisk(): boolean {
      return this.required && !this.appliedOptions?.hideRequiredAsterisk
    },
  },
})
</script>
