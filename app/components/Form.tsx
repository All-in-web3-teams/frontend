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

export interface FormProps {
  controls: ControlItem[]
  onSubmit: (values: { [K in ControlItem['key']]: string }) => void
  values?: { [K in ControlItem['key']]: string }
  submitText?: string
}

const DefaultProps: FormProps = {
  controls: [],
  onSubmit: () => {},
  values: {},
  submitText: 'Submit'
}

export default function Form(props: FormProps = DefaultProps) {
  const { controls, onSubmit, values, submitText } = props
  const [form, setForm] = useState({} as Record<string, any>)
  const [error, setError] = useState({} as { [key in ControlItem['key']]: { isInvalid: boolean; errorMessage: string } })

  useEffect(() => {
    if (controls && controls.length > 0) {
      const form = {}
      controls.forEach((i) => Object.assign(form, { [i.key]: '' }))
      const error = {}
      controls.forEach((i) =>
        Object.assign(error, {
          [i.key]: {
            isInvalid: false,
            errorMessage: ''
          }
        })
      )
      setForm(form)
      setError(error)
    }
  }, [JSON.stringify(controls)])

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      setForm(values)
    }
  }, [JSON.stringify(values)])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    let noError = true
    for (const key of Object.keys(form)) {
      if (error[key].isInvalid) {
        noError = false
      }
    }

    if (!noError) {
      return
    }

    onSubmit(form)
  }

  const handleFormChange = async (key: string, value: string) => {
    const control = controls.find((item) => item.key === key)!
    if (control.type === 'number') {
      if (/^\d*$/.test(value)) {
        setForm({
          ...form,
          [key]: value
        })
      }
    } else {
      setForm({
        ...form,
        [key]: value
      })
    }

    if (control?.rules && control.rules.length > 0) {
      let rendered = false
      //ToDo: min/max validator
      control.rules.map((item, index) => {
        if (!rendered && 'required' in item && item.required && !value) {
          rendered = true
          setError({
            ...error,
            [key]: { isInvalid: true, errorMessage: item.message }
          })
        } else {
          setError({
            ...error,
            [key]: { isInvalid: false, errorMessage: '' }
          })
        }
      })
    }
  }

  const renderFormControl = (c: ControlItem) => {
    if (c.type === 'text') {
      return (
        <div className="mb-3" key={c.key}>
          <Input
            type="text"
            variant="bordered"
            labelPlacement="outside-left"
            value={form[c.key]}
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
          <Select label={c.label} labelPlacement="outside-left" variant="bordered">
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
        <Button color="primary" className="text-[#333333] h-14 text-xl px-24 " type="submit">
          {submitText}
        </Button>
      </div>
    </form>
  )
}
