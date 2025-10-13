export { default as LayoutRenderer } from './LayoutRenderer.vue'
export { default as CategorizationRenderer } from './CategorizationRenderer.vue'

import { entry as layoutRendererEntry } from './LayoutRenderer.vue'
import { entry as categorizationRendererEntry } from './CategorizationRenderer.vue'

export const layoutRenderers = [
  layoutRendererEntry,
  categorizationRendererEntry,
]
