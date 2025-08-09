import { additionalRenderers } from './additional'
import { controlRenderers } from './controls'
import { layoutRenderers } from './layouts'

export const vanillaRenderers = [
  ...controlRenderers,
  ...layoutRenderers,
  ...additionalRenderers,
]
