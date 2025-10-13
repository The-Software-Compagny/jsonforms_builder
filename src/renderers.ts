import { additionalRenderers } from './additional'
import { controlRenderers } from './controls'
import { layoutRenderers } from './layouts'

export const quasarRenderers = [
  ...controlRenderers,
  ...layoutRenderers,
  ...additionalRenderers,
]
