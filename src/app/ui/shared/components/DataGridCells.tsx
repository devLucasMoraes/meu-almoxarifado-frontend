import { unidades } from '@/constants'
import { Environment } from '@/environment'
import { materialQueries } from '@/queries/MaterialQueries'
import { Autocomplete, MenuItem, Select, SelectChangeEvent, TextField, debounce } from '@mui/material'
import {
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridTreeNodeWithRender,
  useGridApiContext
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { FieldError, FieldValues } from 'react-hook-form'

interface AutocompleteCellProps<T extends FieldValues>
  extends GridRenderCellParams<T, any, any, GridTreeNodeWithRender> {
  errors: FieldError | undefined
}

export function SelectEditInputCell(props: GridRenderEditCellParams) {
  const { id, value, field, error } = props

  console.log('SelectEditInputCell error', error)

  const apiRef = useGridApiContext()

  console.log('SelectEditInputCell', id, value, field)

  const handleChange = async (event: SelectChangeEvent) => {
    console.log('SelectEditInputCell event.target.value', event.target.value)

    await apiRef.current.setEditCellValue({ id, field, value: event.target.value })
    apiRef.current.stopCellEditMode({ id, field })
  }

  return (
    <Select value={value ?? ''} onChange={handleChange} size='small' sx={{ height: 1 }} fullWidth autoFocus>
      <MenuItem value={''}>Selecione uma opção</MenuItem>
      {unidades.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export function SelectCell<T extends FieldValues>(props: AutocompleteCellProps<T>) {
  const { value, errors } = props
  return (
    <div>
      {value}
      {errors && <div style={{ color: 'red' }}>{errors.message}</div>}
    </div>
  )
}

export function AutocompleteEditInputCell(props: GridRenderEditCellParams) {
  const { id, value, field, error } = props

  const { LIMITE_DE_LINHAS } = Environment

  const [inputValue, setInputValue] = useState('')

  const debouncedSetInputValue = debounce(value => {
    setInputValue(value)
  }, 500)

  const { data: searchData } = useQuery({ ...materialQueries.searchTerm(inputValue, 0, LIMITE_DE_LINHAS) })

  console.log('AutocompleteEditInputCell error', error)

  const apiRef = useGridApiContext()

  console.log('AutocompleteEditInputCell', id, value, field)

  return (
    <Autocomplete
      value={value ? searchData?.content.find(option => value === option.id) ?? null : null}
      options={searchData?.content ?? []}
      getOptionLabel={option => option.label}
      //isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      onChange={async (_event, value, _reason, _details) => {
        console.log('value', value)
        console.log('SelectEditInputCell value', value)
        const valueToSet = value ? value.id : null
        await apiRef.current.setEditCellValue({ id, field, value: valueToSet })
        if (valueToSet === null) return
        apiRef.current.stopCellEditMode({ id, field })
      }}
      onInputChange={(_, newValue) => debouncedSetInputValue(newValue)}
      renderInput={params => <TextField {...params} error={!!error} helperText={error?.message} />}
    />
  )
}

export function AutocompleteCell<T extends FieldValues>(props: AutocompleteCellProps<T>) {
  const { value, errors } = props

  const { data } = useQuery({ ...materialQueries.getById(value) })

  console.log('renderAutocomplete props', props)
  return (
    <div>
      {data?.descricao}
      {errors && <div style={{ color: 'red' }}>{errors.message}</div>}
    </div>
  )
}
