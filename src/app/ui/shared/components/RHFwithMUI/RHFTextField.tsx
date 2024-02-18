import { situacao, tipo, unidades } from '@/constants'
import { InputAdornment, MenuItem, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'

export const RHFTextField = <TField extends FieldValues>(props: {
  control: Control<TField>
  name: Path<TField>
  placeholder?: string
  fullWidth?: boolean
  isSelected?: 'tipo' | 'unidade' | 'situacao'
  endAdornment?: string
  type?: React.HTMLInputTypeAttribute
  onBlur?: () => void
  readOnly?: boolean
}) => {
  const { control, name } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={'' as PathValue<TField, Path<TField>>}
      render={({ field: { ...field }, fieldState: { error } }) => {
        function handleFieldOnChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
          if (props.type === 'number') {
            field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
          } else {
            field.onChange(e.target.value)
          }
        }

        return (
          <TextField
            error={!!error}
            fullWidth={props.fullWidth}
            helperText={error?.message}
            InputProps={{
              endAdornment: <InputAdornment position='end'>{props.endAdornment}</InputAdornment>,
              readOnly: props.readOnly
            }}
            label={props.placeholder}
            name={field.name}
            onBlur={() => {
              field.onBlur()
              props.onBlur && props.onBlur()
            }}
            onChange={e => handleFieldOnChange(e)}
            ref={field.ref}
            select={!!props.isSelected}
            size='small'
            type={props.type}
            value={field.value}
          >
            {props.isSelected === 'unidade' &&
              unidades.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            {props.isSelected === 'tipo' &&
              tipo.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            {props.isSelected === 'situacao' &&
              situacao.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        )
      }}
    />
  )
}
