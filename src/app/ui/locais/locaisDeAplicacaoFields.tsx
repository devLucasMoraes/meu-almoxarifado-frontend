import { TLocalDeAplicacao } from '@/types/models'
import { Typography } from '@mui/material'

export const locaisDeAplicacaoFields: { label: string; render: (data: TLocalDeAplicacao) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Nome', render: data => <Typography noWrap>{data.nome}</Typography> }
]
