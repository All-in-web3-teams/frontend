import React, { FormEvent, useEffect, useState } from 'react'
import { Input, Textarea, Select, SelectItem, Button } from '@nextui-org/react'

export type ruleItem = {
  message: string
} & (
  | {
      required: boolean
    }
  | {
      min: number
    }
  | {
      max: number
    }
  | {
      validator: string
    }
)

export type ControlItem = {
  key: string
  label: string
  defaultValue?: any
  disabled?: boolean
  placeholder?: string
  rules?: ruleItem[]
} & (
  | {
      type: 'text' | 'number' | 'textarea'
    }
  | {
      type: 'select'
      options: { label: string; value: string | number }[]
    }
)

export interface FormProps<Values = any> {
  controls: ControlItem[]
  onSubmit: (values: Values) => void
  values?: Values
  submitText?: string
}

export default function Form<Values>(props: FormProps<Values>) {
  const { controls, onSubmit, values = {}, submitText = 'Submit' } = props

  const [form, setForm] = useState({} as any)
  const [error, setError] = useState({} as { [key: string]: { isInvalid: boolean; errorMessage: string } })

  const [isLoading, setIsLoading] = useState(false)

  const loadingSubmit = async (func: (values: any) => void) => {
    setIsLoading(true)
    try {
      await func(values)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (controls && controls.length > 0) {
      const form = {} as Values

      controls.forEach((i) => Object.assign(form as any, { [i.key]: '' }))
      const error = {}
      controls.forEach((i) => {
        if (i.defaultValue) {
          Object.assign(form as any, { [i.key]: i.defaultValue })
        } else {
          Object.assign(form as any, { [i.key]: '' })
        }

        Object.assign(error, {
          [i.key]: {
            isInvalid: false,
            errorMessage: ''
          }
        })
      })
      console.log('controls: ', controls)

      setForm(form)
      setError(error as any)
    }
  }, [JSON.stringify(controls)])

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      setForm(values as Values)
    }
  }, [JSON.stringify(values)])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    let newError = {} as { [key: string]: { isInvalid: boolean; errorMessage: string } }

    for (const key of Object.keys(form)) {
      const value = form[key]
      const control = controls.find((item) => item.key === key)!

      if (control?.rules && control.rules.length > 0) {
        let rendered = false
        //ToDo: min/max validator
        control.rules.map((item) => {
          if (!rendered && 'required' in item && item.required && !value) {
            rendered = true
            newError = {
              ...newError,
              [control.key]: { isInvalid: true, errorMessage: item.message }
            }
          } else {
            newError = {
              ...newError,
              [control.key]: { isInvalid: false, errorMessage: '' }
            }
          }
        })
      }

      setError(newError)
    }

    let noError = true
    for (const key of Object.keys(newError)) {
      if (newError[key].isInvalid) {
        noError = false
      }
    }

    if (!noError) {
      return
    }

    loadingSubmit(() => onSubmit(form as any))
  }

  const handleFormChange = async (key: string, value: string) => {
    const control = controls.find((item) => item.key === key)!

    if (control.type === 'number' && value) {
      if (/^\d*$/.test(value)) {
        setForm({
          ...form,
          [key]: Number(value)
        })
      }
    } else {
      setForm({
        ...form,
        [key]: value
      })
    }

    handleSetError(control, value)
  }

  const handleSetError = (control: ControlItem, value: any) => {
    if (control?.rules && control.rules.length > 0) {
      let rendered = false
      //ToDo: min/max validator
      control.rules.map((item) => {
        if (!rendered && 'required' in item && item.required && !value) {
          rendered = true
          setError({
            ...error,
            [control.key]: { isInvalid: true, errorMessage: item.message }
          })
        } else {
          setError({
            ...error,
            [control.key]: { isInvalid: false, errorMessage: '' }
          })
        }
      })
    }
  }

  const renderFormControl = (c: ControlItem) => {
    if (c.type === 'text' || c.type === 'number') {
      return (
        <div className="mb-3" key={c.key}>
          <Input
            type="text"
            variant="bordered"
            labelPlacement="outside-left"
            value={form[c.key] ? form[c.key] : c.defaultValue}
            disabled={c.disabled || false}
            label={c.label}
            placeholder={c.placeholder}
            classNames={{
              label: 'w-32 text-right text-lg',
              base: 'justify-center',
              input: 'w-96'
            }}
            isInvalid={error[c.key]?.isInvalid}
            onChange={(e) => handleFormChange(c.key, e.target.value)}
            errorMessage={error[c.key]?.isInvalid && error[c.key].errorMessage}
          />
        </div>
      )
    }

    if (c.type === 'textarea') {
      return (
        <div className="mb-3" key={c.key}>
          <Textarea variant="bordered" labelPlacement="outside-left" label={c.label} placeholder={c.placeholder} />
          {/* {c.rules && c.rules.length > 0 && renderError(c.rules, form[c.key])} */}
        </div>
      )
    }

    if (c.type === 'select') {
      return (
        <div className="mb-3" key={c.key}>
          <Select
            label={c.label}
            labelPlacement="outside-left"
            variant="bordered"
            value={form[c.key]}
            classNames={{
              label: 'w-32 text-right text-lg',
              base: 'justify-center'
            }}
            onChange={(e) => handleFormChange(c.key, e.target.value)}
          >
            {c.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
          {/* {c.rules && c.rules.length > 0 && renderError(c.rules, form[c.key])} */}
        </div>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {controls.map((item) => renderFormControl(item))}
      <div className="flex justify-center mt-7">
        <Button isLoading={isLoading} color="primary" className="text-[#333333] h-14 text-xl px-24 rounded-full" type="submit">
          {submitText}
        </Button>
      </div>
    </form>
  )
}
