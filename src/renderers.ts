import { additionalsRenderers } from './additional'
import { controlsRenderers } from './controls'
import { layoutsRenderers } from './layouts'

export const quasarRenderers = [
  ...controlsRenderers,
  ...layoutsRenderers,
  ...additionalsRenderers,
]
