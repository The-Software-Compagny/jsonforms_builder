<template>
  <div class="container">
    <!-- <pre v-text="JSON.stringify(example, null, 2)"></pre> -->
    <json-forms
      :key="example.name"
      :data="example.data"
      :schema="example.schema"
      :uischema="example.uischema"
      :renderers="renderers"
      :i18n="example.i18n"
      :additional-errors="additionalErrors"
      @change="onChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { JsonForms, JsonFormsChangeEvent } from '@jsonforms/vue'
import { ErrorObject } from 'ajv'
import { vanillaRenderers } from '../../src'
import { getExamples } from '../../examples/register'

const examples = getExamples()

export default defineComponent({
  name: 'App',
  components: {
    JsonForms,
  },
  data() {
    const additionalErrors: ErrorObject[] = []
    return {
      data: {},
      renderers: Object.freeze(vanillaRenderers),
      currentExampleName: examples[0].name,
      examples,
      i18n: examples[0].i18n,
      additionalErrors,
    }
  },
  computed: {
    example() {
      const name = (this as any).currentExampleName
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return examples.find((ex) => ex.name === name)!
    },
  },
  methods: {
    onChange(event: JsonFormsChangeEvent) {
      console.log(event)
      this.data = event.data
    },
  },
})
</script>
