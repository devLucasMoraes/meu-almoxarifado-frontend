import { Checkbox } from '@mui/material'
import { ChangeEvent } from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'

export function RHFCheckbox<TField extends FieldValues>(props: {
  control: Control<TField>
  name: Path<TField>
  fullWidth?: boolean
}) {
  console.log('renderixou RHFCheckbox')
  const { control, name } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={true as PathValue<TField, Path<TField>>}
      render={({ field: { ...field }, fieldState: { error } }) => {
        function handleChange(event: ChangeEvent<HTMLInputElement>) {
          field.onChange(event.target.checked)
        }

        return (
          <Checkbox
            checked={field.value}
            name={field.name}
            onBlur={field.onBlur}
            onChange={e => handleChange(e)}
            ref={field.ref}
            value={field.value}
          />
        )
      }}
    />
  )
}
