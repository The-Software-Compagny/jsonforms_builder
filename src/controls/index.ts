export { default as ControlWrapper } from './ControlWrapper.vue'
export { default as StringControlRenderer } from './StringControlRenderer.vue'
export { default as NumberControlRenderer } from './NumberControlRenderer.vue'
export { default as IntegerControlRenderer } from './IntegerControlRenderer.vue'
export { default as BooleanControlRenderer } from './BooleanControlRenderer.vue'

import { entry as stringControlRendererEntry } from './StringControlRenderer.vue'
import { entry as numberControlRendererEntry } from './NumberControlRenderer.vue'
import { entry as integerControlRendererEntry } from './IntegerControlRenderer.vue'
import { entry as booleanControlRendererEntry } from './BooleanControlRenderer.vue'

export const controlRenderers = [
  stringControlRendererEntry,
  numberControlRendererEntry,
  integerControlRendererEntry,
  booleanControlRendererEntry,
]
