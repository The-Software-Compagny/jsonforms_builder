<template>
  <div v-if="layout.visible" :class="layoutClassObject.root">
    <!-- <pre v-text="JSON.stringify(layout, null, 2)"></pre> -->
    <div v-for="(element, index) in layout.uischema.elements" :key="`${layout.path}-${index}`" :class="layoutClassObject.item">
      <dispatch-renderer :schema="layout.schema" :uischema="element" :path="layout.path" :enabled="layout.enabled" :renderers="layout.renderers" :cells="layout.cells" />
    </div>
  </div>
</template>

<script lang="ts">
import { isLayout, JsonFormsRendererRegistryEntry, Layout, rankWith } from '@jsonforms/core'
import { defineComponent } from 'vue'
import { DispatchRenderer, rendererProps, useJsonFormsLayout, type RendererProps } from '@jsonforms/vue'
import { useVanillaLayout } from '../utils'

const layoutRenderer = defineComponent({
  name: 'LayoutRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    return useVanillaLayout(useJsonFormsLayout(props))
  },
  computed: {
    layoutClassObject(): any {
      // console.log('this.styles', this.styles)
      return this.layout.direction === 'row' ? this.styles.horizontalLayout : this.styles.verticalLayout
      return {}
    },
  },
})

export default layoutRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(1, isLayout),
}
</script>
