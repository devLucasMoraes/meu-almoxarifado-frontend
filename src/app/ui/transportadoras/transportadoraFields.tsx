import { TTransportadora } from '@/types/models'
import { Typography } from '@mui/material'

export const transportadoraFields: { label: string; render: (data: TTransportadora) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Nome', render: data => <Typography noWrap>{data.nomeFantasia}</Typography> },
  { label: 'Razão social', render: data => <Typography noWrap>{data.razaoSocial}</Typography> },
  { label: 'CNPJ', render: data => <Typography noWrap>{data.cnpj}</Typography> },
  { label: 'Telefone', render: data => <Typography noWrap>{data.fone}</Typography> }
]
