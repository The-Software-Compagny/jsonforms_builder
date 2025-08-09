import { useStyles } from '../styles'
import { computed, ref } from 'vue'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

export const useVanillaControl = <I extends { control: any; handleChange: any }>(
  input: I,
  adaptTarget: (target: any) => any = (v) => v.value,
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  )

  const isFocused = ref(false)
  const onChange = (event: Event) => {
    input.handleChange(input.control.value.path, adaptTarget(event.target))
  }

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } = input.control.value
    return { id, description, errors, label, visible, required }
  })

  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
  }
}

export const useVanillaLayout = <I extends { layout: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      structuredClone(input.layout.value.config),
      structuredClone(input.layout.value.uischema.options)
    )
  )

  return {
    ...input,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
  }
}

export const useVanillaLabel = <I extends { label: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.label.value.config),
      cloneDeep(input.label.value.uischema.options)
    )
  );
  return {
    ...input,
    styles: useStyles(input.label.value.uischema),
    appliedOptions,
  }
}
