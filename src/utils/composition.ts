import { useStyles } from '../styles'
import { computed, ComputedRef, inject, ref } from 'vue'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { computeLabel, ControlElement, DispatchPropsOfControl, DispatchPropsOfMultiEnumControl, isDescriptionHidden, JsonFormsSubStates, UISchemaElement } from '@jsonforms/core'
import debounce from 'lodash/debounce'
import { IsDynamicPropertyContext } from './inject'
import get from 'lodash/get'
import isPlainObject from 'lodash/isPlainObject'

export const useControlAppliedOptions = <
  T extends { config: any; uischema: UISchemaElement },
  I extends {
    control: ComputedRef<T>;
  },
>(
  input: I,
) => {
  return computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options),
    ),
  )
}

export const useComputedLabel = <
  T extends { label: string; required: boolean },
  I extends { control: ComputedRef<T> },
>(
  input: I,
  appliedOptions: ReturnType<typeof useControlAppliedOptions>,
) => {
  return computed((): string => {
    return computeLabel(
      input.control.value.label,
      input.control.value.required,
      !!appliedOptions.value?.hideRequiredAsterisk,
    )
  })
}

export const useVanillaControl = <
  T extends {
    uischema: ControlElement
    path: string
    config: any
    label: string
    description: string
    required: boolean
    errors: string
    id: string
    visible: boolean
  },
  I extends {
    control: ComputedRef<T>
  } & (DispatchPropsOfControl | DispatchPropsOfMultiEnumControl),
>(
  input: I,
  adaptTarget: (target: any) => any = (v) => v,
  debounceWait?: number,
) => {
  const touched = ref(false)

  const changeEmitter =
    typeof debounceWait === 'number' &&
      (input as DispatchPropsOfControl).handleChange
      ? debounce((input as DispatchPropsOfControl).handleChange, debounceWait)
      : (input as DispatchPropsOfControl).handleChange

  const onChange = (value: any) => {
    if (changeEmitter) {
      // console.debug('onChange', input.control.value.path, value)
      changeEmitter(input.control.value.path, adaptTarget(value))
    }
  }

  const appliedOptions = useControlAppliedOptions(input)
  const isFocused = ref(false)

  const handleFocus = () => {
    isFocused.value = true
  }

  const handleBlur = () => {
    touched.value = true
    isFocused.value = false
  }

  const filteredErrors = computed(() => {
    return touched.value || !appliedOptions.value.enableFilterErrorsBeforeTouch
      ? input.control.value.errors
      : ''
  })

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription,
    )
  }

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } = input.control.value

    return { id, description, errors, label, visible, required }
  })

  const computedLabel = useComputedLabel(input, appliedOptions)

  const styles = useStyles(input.control.value.uischema)

  const quasarProps = (path: string) => {
    const props = get(appliedOptions.value?.quasar, path)

    return props && isPlainObject(props) ? props : {}
  }

  const overwrittenControl = computed(() => {
    return {
      ...input.control.value,
      errors: filteredErrors.value,
    }
  })

  const rawErrors = computed(() => input.control.value.errors)

  return {
    ...input,
    control: overwrittenControl,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    computedLabel,
    touched,
    quasarProps,
    persistentHint,
    handleBlur,
    handleFocus,
    onChange,
    rawErrors,
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

export const useJsonForms = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms')

  if (!jsonforms) {
    throw new Error(
      "'jsonforms couldn't be injected. Are you within JSON Forms?",
    )
  }

  return jsonforms
}

export const determineClearValue = (defaultValue: any) => {
  const jsonforms = useJsonForms()

  const useDefaultValue = inject<boolean>(
    IsDynamicPropertyContext,
    jsonforms.core?.schema.type !== 'object',
  )

  // undefined will clear the property from the object
  return useDefaultValue ? defaultValue : undefined
}
