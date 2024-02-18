import { TCategoria } from '@/types/models'
import { Typography } from '@mui/material'

export const categoriaFields: { label: string; render: (data: TCategoria) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Nome', render: data => <Typography noWrap>{data.nome}</Typography> },
  { label: 'Unidade de estoque', render: data => <Typography noWrap>{data.undEstoque}</Typography> },
  { label: 'Estoque minimo', render: data => <Typography noWrap>{data.estoqueMinimo}</Typography> }
]
