export { default as ControlWrapper } from './ControlWrapper.vue'
export { default as StringControlRenderer } from './StringControlRenderer.vue'
export { default as NumberControlRenderer } from './NumberControlRenderer.vue'
export { default as IntegerControlRenderer } from './IntegerControlRenderer.vue'
export { default as BooleanControlRenderer } from './BooleanControlRenderer.vue'
export { default as DateControlRenderer } from './DateControlRenderer.vue'
export { default as DateTimeControlRenderer } from './DateTimeControlRenderer.vue'

import { entry as stringControlRendererEntry } from './StringControlRenderer.vue'
import { entry as numberControlRendererEntry } from './NumberControlRenderer.vue'
import { entry as integerControlRendererEntry } from './IntegerControlRenderer.vue'
import { entry as booleanControlRendererEntry } from './BooleanControlRenderer.vue'
import { entry as dateControlRendererEntry } from './DateControlRenderer.vue'
import { entry as dateTimeControlRendererEntry } from './DateTimeControlRenderer.vue'

export const controlRenderers = [
  stringControlRendererEntry,
  numberControlRendererEntry,
  integerControlRendererEntry,
  booleanControlRendererEntry,
  dateControlRendererEntry,
  dateTimeControlRendererEntry,
]
