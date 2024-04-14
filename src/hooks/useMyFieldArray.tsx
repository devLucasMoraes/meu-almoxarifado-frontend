import { GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldArrayWithId,
  FieldValues,
  Path,
  useFieldArray,
  useWatch
} from 'react-hook-form'

interface useMyFieldArrayProps<TField extends FieldValues> {
  control: Control<TField>
  name: ArrayPath<TField>
  nameWhachData: Path<TField>
}

export const useMyFieldArray = <TField extends FieldValues>({
  control,
  name,
  nameWhachData
}: useMyFieldArrayProps<TField>) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name
  })

  const [selectedItemIndex, setSelectedItemIndex] = useState<number>()
  const [readOnly, setReadOnly] = useState<boolean>(true)

  const data = useWatch({
    control: control,
    name: nameWhachData
  })

  function handleAddItem(field?: FieldArray<TField>) {
    append(field as FieldArray<TField>)
    setSelectedItemIndex(fields.length)
    setReadOnly(false)
  }

  function handleInfo(params: GridRenderCellParams<FieldArrayWithId<TField, ArrayPath<TField>, 'id'>>): void {
    if (!params.row.id) return
    setSelectedItemIndex(fields.indexOf(params.row))
    setReadOnly(true)
    if (selectedItemIndex == undefined) return
    if (!data[selectedItemIndex]) return
    update(selectedItemIndex, { ...data[selectedItemIndex] })
  }

  function handleEdit(params: GridRenderCellParams<FieldArrayWithId<TField, ArrayPath<TField>, 'id'>>): void {
    if (!params.row.id) return
    setSelectedItemIndex(fields.indexOf(params.row))
    setReadOnly(false)
    if (selectedItemIndex == undefined) return
    if (!data[selectedItemIndex]) return
    update(selectedItemIndex, { ...data[selectedItemIndex] })
  }

  function handleDelete(params: GridRenderCellParams<FieldArrayWithId<TField, ArrayPath<TField>, 'id'>>): void {
    if (!params.row.id) return
    remove(fields.indexOf(params.row))
  }

  function handleBlur(index: number) {
    if (readOnly) return
    if (selectedItemIndex == undefined) return
    if (!data[selectedItemIndex]) return
    if (selectedItemIndex != index) return
    update(selectedItemIndex as number, { ...data[selectedItemIndex] })
  }

  return {
    fields,
    append,
    remove,
    update,
    readOnly,
    selectedItemIndex,
    handleInfo,
    handleEdit,
    handleAddItem,
    handleDelete,
    handleBlur
  }
}
