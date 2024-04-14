import { TRequisitante } from '@/types/models'
import { Typography } from '@mui/material'

export const requisitanteFields: { label: string; render: (data: TRequisitante) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Nome', render: data => <Typography noWrap>{data.nome}</Typography> },
  { label: 'Telefone', render: data => <Typography noWrap>{data.fone}</Typography> }
]
