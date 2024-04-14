import { DatePicker } from '@mui/x-date-pickers'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'

export const RHFDatePicker = <TField extends FieldValues>(props: {
  control: Control<TField>
  name: Path<TField>
  placeholder?: string
  fullWidth?: boolean
}) => {
  const { control, name } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null as PathValue<TField, Path<TField>>}
      render={({ field: { ...field }, fieldState: { error } }) => {
        return (
          <DatePicker
            label={props.placeholder}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
                size: 'small'
              }
            }}
            {...field}
          />
        )
      }}
    />
  )
}
