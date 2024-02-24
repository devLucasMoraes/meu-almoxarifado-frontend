import { Environment } from '@/environment'
import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { materialQueries } from '@/queries/MaterialQueries'
import { TEmprestimo } from '@/types/models'
import { Grid, Paper, Typography } from '@mui/material'
import { UnderlineLink } from '../shared/components/UnderlineLink'

const { FORNECEDORAS, MATERIAIS } = Environment

export const emprestimosFields: { label: string; render: (data: TEmprestimo) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Data', render: data => <Typography noWrap>{data.dataDeAbertura.toString()}</Typography> },
  {
    label: 'Fornecedora',
    render: data => (
      <UnderlineLink
        queries={fornecedoraQueries}
        id={data.idFornecedora}
        nameProperty='nomeFantasia'
        linkPath={`${FORNECEDORAS.SHOW_PAGE.replace('id', String(data.idFornecedora))}${data.idFornecedora}`}
      />
    )
  },
  { label: 'Situacao', render: data => <Typography noWrap>{data.situacao}</Typography> },
  { label: 'Tipo', render: data => <Typography noWrap>{data.tipo}</Typography> },
  {
    label: 'Itens a receber',
    render: data => (
      <Grid container padding={2} marginTop={1} component={Paper} variant='outlined'>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant='caption' noWrap>
              Material
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption' noWrap>
              Quantidade Comprada
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='caption' noWrap>
              Undidade de Compra
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption' noWrap>
              Valor Unitario
            </Typography>
          </Grid>
        </Grid>

        {data.itensAReceber?.map((item, index) => (
          <Grid container key={`${item.idMaterial}-${index}`}>
            <Grid item xs={3}>
              <UnderlineLink
                queries={materialQueries}
                id={item.idMaterial}
                nameProperty='descricao'
                linkPath={`${MATERIAIS.SHOW_PAGE.replace('id', String(item.idMaterial))}`}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.quantEntregue}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography noWrap>{item.unidade}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.valorUnt}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
  }
]
