import { Environment } from '@/environment'
import { useMyFieldArray } from '@/hooks/useMyFieldArray'
import { materialQueries } from '@/queries/MaterialQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { TNfeDeCompra } from '@/types/models'
import { AddBoxSharp, Delete, Edit, Inventory, Preview } from '@mui/icons-material'
import { Chip, Divider, Grid, IconButton, Paper, Stack, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { Control, FieldArrayWithId } from 'react-hook-form'
import { MyDataGrid } from '../../shared/components/MyDataGrid'
import { RHFAutocompleteField } from '../../shared/components/RHFwithMUI/RHFAutocompleteField'
import { RHFTextField } from '../../shared/components/RHFwithMUI/RHFTextField'
import { UnderlineLink } from '../../shared/components/UnderlineLink'

export const ItensNfeDeCompraArrayField = ({ control }: { control: Control<TNfeDeCompra> }) => {
  console.log('renderizou ItensNfeDeCompraArrayField')
  //const { isOpenNewMaterialDialog, setIsOpenNewMaterialDialog, setNewMaterialDialogContent } = useDialogContext()

  const { toggleMaterialDialog } = useIsOpenDialog()

  //const { nfeXMLFile, fornecedoraXMLFile } = useFileHandleContext()

  const { LIMITE_DE_LINHAS, MATERIAIS } = Environment

  const {
    fields,
    remove,
    update,
    handleInfo,
    handleEdit,
    handleAddItem,
    handleDelete,
    handleBlur,
    selectedItemIndex,
    readOnly
  } = useMyFieldArray({ control: control, name: 'itens', nameWhachData: 'itens' })

  //const [vinculoStatus, setVinculoStatus] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: LIMITE_DE_LINHAS
  })

  /*   const data = useWatch({
    control: control,
    name: `itens.${selectedItemIndex as number}`
  })

  const idFornecedora = useWatch({
    control: control,
    name: 'idFornecedora'
  }) */

  /*  const findVinculo = useCallback(
    async (filter: TVinculoMaterialFornecedorafilter): Promise<TVinculoMaterialFornecedora | undefined> => {
      const vinculo = await dynamicGetOne(filter)

      return vinculo
    },
    []
  ) */

  /*   const onSelectedItem = useCallback(
    async (selectedItemIndex?: number) => {
      if (selectedItemIndex === undefined) return
      const selectedField = fields[selectedItemIndex]

      const filter: TVinculoMaterialFornecedorafilter = {
        id_fornecedora: idFornecedora,
        referencia_fornecedora: selectedField.referenciaFornecedora
      }

      const vinculo = await findVinculo(filter)
      setVinculoStatus(!!vinculo)

      console.log('onSelectedItem data', data)
      console.log('onSelectedItem selectedField', selectedField)

      vinculo && update(selectedItemIndex, { ...selectedField, idMaterial: vinculo.idMaterial })
      !vinculo && update(selectedItemIndex, { ...selectedField, idMaterial: '' as unknown as number })
    },
    [fields, findVinculo, idFornecedora, update]
  ) */

  //const { mutate: createVinculo, isLoading } = useVinculoCreate({ onSuccess: () => onSelectedItem(selectedItemIndex) })

  /*   useEffect(() => {
    if (!idFornecedora) return
    if (!fields) return
    fields.forEach(async field => {
      const filter: TVinculoMaterialFornecedorafilter = {
        id_fornecedora: idFornecedora,
        referencia_fornecedora: field.referenciaFornecedora
      }

      const vinculo = await findVinculo(filter)

      vinculo && update(fields.indexOf(field), { ...field, idMaterial: vinculo.idMaterial })
    })

    onSelectedItem(selectedItemIndex)
  }, [idFornecedora]) */

  /*   useEffect(() => {
    if (selectedItemIndex === undefined) return
    if (isOpenNewMaterialDialog) return

    onSelectedItem(selectedItemIndex)
  }, [isOpenNewMaterialDialog, selectedItemIndex]) */

  /*   useEffect(() => {
    if (nfeXMLFile) return
    remove()
  }, [remove, nfeXMLFile]) */

  /*   const openNewDialog = (content?: TItemNfeDeCompra) => {
    setNewMaterialDialogContent({
      descricao: content?.descricaoFornecedora,
      fornecedorasVinculadas: [
        {
          referenciaFornecedora: content?.referenciaFornecedora,
          descricaoFornecedora: content?.descricaoFornecedora,
          idFornecedora: fornecedoraXMLFile?.id
        }
      ]
    } as TMaterial)
    setIsOpenNewMaterialDialog(true)
  } */

  /*   function handleLoadindButton(index: number): void {
    const vinculo: TVinculoMaterialFornecedoraSchema = {
      idFornecedora: idFornecedora,
      idMaterial: data.idMaterial,
      referenciaFornecedora: data.referenciaFornecedora,
      descricaoFornecedora: data.descricaoFornecedora
    }

    createVinculo(vinculo)
    console.log('vinculo --->>>', vinculo)
  } */

  const columns: GridColDef<FieldArrayWithId<TNfeDeCompra, 'itens', 'id'>>[] = [
    { field: 'idItem', headerName: 'ID', width: 70 },
    { field: 'referenciaFornecedora', headerName: 'Referencia', minWidth: 220, flex: 0.2 },
    { field: 'descricaoFornecedora', headerName: 'Descricao', minWidth: 220, flex: 0.2 },
    {
      field: 'idMaterial',
      headerName: 'Material',
      minWidth: 200,
      flex: 0.3,
      renderCell: params => (
        <UnderlineLink
          queries={materialQueries}
          id={params.row.idMaterial}
          linkPath={`${MATERIAIS.SHOW_PAGE.replace('id', String(params.row.idMaterial))}`}
          nameProperty='descricao'
        />
      )
    },
    { field: 'undCom', headerName: 'Unidade', minWidth: 155, flex: 0.1 },
    { field: 'quantCom', headerName: 'Quantidade', minWidth: 110, flex: 0.1 },
    { field: 'valorUntCom', headerName: 'Valor Unit.', minWidth: 110, flex: 0.1 },
    { field: 'valorIpi', headerName: 'IPI', minWidth: 110, flex: 0.1 },
    {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 130,
      flex: 0.1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <Stack direction='row' spacing={2}>
          <IconButton color='info' size='small' onClick={() => handleInfo(params)}>
            <Preview fontSize='inherit' />
          </IconButton>

          <IconButton color='info' size='small' onClick={() => handleEdit(params)}>
            <Edit fontSize='inherit' />
          </IconButton>

          <IconButton color='error' size='small' onClick={() => handleDelete(params)}>
            <Delete fontSize='inherit' />
          </IconButton>
        </Stack>
      )
    }
  ]

  return (
    <Grid container rowGap={2}>
      <Grid item flexGrow={1}>
        <Divider textAlign='left'>
          <Chip label='Adicionar novo item' onClick={() => handleAddItem()} icon={<Inventory />} />
        </Divider>
      </Grid>

      {fields
        .filter(field => fields.indexOf(field) === selectedItemIndex)
        .map(field => {
          const originalIndex = fields.indexOf(field)
          return (
            <Grid
              key={field.id}
              container
              component={Paper}
              padding={2}
              rowGap={2}
              columnSpacing={1}
              sx={{ backgroundColor: '#f6f7fb' }}
              alignItems='flex-end'
            >
              <Grid item xs={12} lg={4}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.referenciaFornecedora`}
                  placeholder='Codigo Produto'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  //readOnly={vinculoStatus}
                />
              </Grid>

              <Grid item xs={10} lg={5}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.descricaoFornecedora`}
                  placeholder='Descriçao'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  //readOnly={vinculoStatus}
                />
              </Grid>

              <Grid item xs={12} lg={3} textAlign='end'>
                <Tooltip title='Novo material'>
                  <IconButton color='primary' size='small' onClick={() => toggleMaterialDialog(true)}>
                    <AddBoxSharp />
                  </IconButton>
                </Tooltip>
                <RHFAutocompleteField
                  control={control}
                  name={`itens.${originalIndex}.idMaterial`}
                  placeholder='Materiais/Insumos'
                  queries={materialQueries}
                  onBlur={() => handleBlur(originalIndex)}
                  //readOnly={vinculoStatus}
                />
              </Grid>

              {/*              <Grid item xs={12} lg={3}>
                <LoadingButton
                  startIcon={<InsertLinkRounded />}
                  onClick={() => handleLoadindButton(originalIndex)}
                  loading={isLoading}
                  loadingPosition='start'
                  variant='outlined'
                  color={vinculoStatus ? 'info' : 'error'}
                >
                  {vinculoStatus ? 'Vinculado' : 'Vincular Material'}
                </LoadingButton>
              </Grid> */}

              <Grid item xs={12} lg={3}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.undCom`}
                  placeholder='Unidade de compra'
                  isSelected='unidade'
                  fullWidth
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.quantCom`}
                  placeholder='Quantidade'
                  type='number'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.valorUntCom`}
                  placeholder='Valor unitário'
                  type='number'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <RHFTextField
                  control={control}
                  name={`itens.${originalIndex}.valorIpi`}
                  placeholder='IPI'
                  type='number'
                  onBlur={() => handleBlur(originalIndex)}
                  readOnly={readOnly}
                />
              </Grid>
            </Grid>
          )
        })}

      <Grid item xs={12} component={Paper} variant='outlined'>
        <MyDataGrid
          isLoading={false}
          columns={columns}
          rows={fields}
          totalRowCount={fields.length}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Grid>
    </Grid>
  )
}
