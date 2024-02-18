import { Environment } from '@/environment'
import { QueryBase } from '@/queries/QueryBase'
import { debounce } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export function RHFAutocompleteField<T extends FieldValues, k>({
  control,
  queries,
  name,
  placeholder,
  readOnly,
  onBlur
}: {
  control: Control<T>
  name: Path<T>
  queries: QueryBase<k>
  placeholder: string
  onBlur?: () => void
  readOnly?: boolean
}) {
  const { LIMITE_DE_LINHAS } = Environment

  const [inputValue, setInputValue] = useState('')

  const debouncedSetInputValue = debounce(value => {
    setInputValue(value)
  }, 500)

  const { data: searchData } = useQuery({ ...queries.searchTerm(inputValue, 0, LIMITE_DE_LINHAS) })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            fullWidth
            getOptionLabel={option => option.label}
            onChange={(_, newValue) => {
              field.onChange(newValue ? newValue.id : null)
            }}
            onInputChange={(_, newValue) => debouncedSetInputValue(newValue)}
            options={searchData?.content ?? []}
            readOnly={readOnly}
            value={field.value ? searchData?.content.find(option => field.value === option.id) ?? null : null}
            renderInput={params => (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                inputRef={field.ref}
                label={placeholder}
                name={field.name}
                onBlur={() => {
                  field.onBlur
                  onBlur && onBlur()
                }}
                size='small'
              />
            )}
          />
        )
      }}
    />
  )
}
