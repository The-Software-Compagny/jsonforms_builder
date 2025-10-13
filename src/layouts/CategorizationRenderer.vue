<template lang="pug">
  .q-col-gutter-sm
    .col
      q-tabs(
        v-model="activeCategory"
        dense
        align="justify"
        swipeable
      )
        q-tab(
          v-for="(_, index) in visibleCategories"
          :key="index"
          :name="index"
          :label="visibleCategoryLabels[index]"
        )
      q-separator
      q-tab-panels(v-model="activeCategory" animated)
        q-tab-panel.q-px-none(
          v-for="(element, index) in visibleCategories"
          :key="index"
          :name="index"
        )
          dispatch-renderer(
            :schema="layout.schema"
            :uischema="element.value.uischema"
            :path="layout.path"
            :enabled="layout.enabled"
            :renderers="layout.renderers"
            :cells="layout.cells"
          )
</template>

<script lang="ts">
import {
  and,
  categorizationHasCategory,
  isCategorization,
  JsonFormsRendererRegistryEntry,
  rankWith,
  type Layout,
} from '@jsonforms/core'
import { DispatchRenderer, rendererProps, useJsonFormsCategorization, type RendererProps } from '@jsonforms/vue'
import { defineComponent, ref } from 'vue'
import { useQuasarControl } from '../utils'

const layoutRenderer = defineComponent({
  name: 'categorization-renderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const activeCategory = ref(0)

    return {
      ...useQuasarControl(useJsonFormsCategorization(props)),
      activeCategory,
    }
  },
  computed: {
    visibleCategories() {
      return this.categories.filter((category) => category.value.visible)
    },
    visibleCategoryLabels(): string[] {
      return this.visibleCategories.map((element) => {
        return element.value.label
      })
    },
  },
})

export default layoutRenderer

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(2, and(isCategorization, categorizationHasCategory)),
}
</script>
