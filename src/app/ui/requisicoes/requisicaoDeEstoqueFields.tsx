import { Environment } from '@/environment'
import { localDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { materialQueries } from '@/queries/MaterialQueries'
import { requisitanteQueries } from '@/queries/RequisitanteQueries'
import { TRequisicaoDeEstoque } from '@/types/models'
import { Grid, Paper, Typography } from '@mui/material'
import { UnderlineLink } from '../shared/components/UnderlineLink'

const { REQUISITANTES, LOCAIS_DE_APLICACAO, MATERIAIS } = Environment

export const requisicaoDeEstoqueFields: { label: string; render: (data: TRequisicaoDeEstoque) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Ordem de Produção', render: data => <Typography noWrap>{data.ordemProducao}</Typography> },
  { label: 'Requerido em', render: data => <Typography noWrap>{data.dataRequisicao?.toString()}</Typography> },
  { label: 'Total', render: data => <Typography noWrap>{data.valorTotal}</Typography> },
  {
    label: 'Requisitante',
    render: data => (
      <UnderlineLink
        queries={requisitanteQueries}
        id={data.idRequisitante}
        nameProperty='nome'
        linkPath={`${REQUISITANTES.SHOW_PAGE.replace('id', String(data.dataRequisicao))}`}
      />
    )
  },
  {
    label: 'Local de Aplicação',
    render: data => (
      <UnderlineLink
        queries={localDeAplicacaoQueries}
        id={data.idLocalDeAplicacao}
        nameProperty='nome'
        linkPath={`${LOCAIS_DE_APLICACAO.SHOW_PAGE.replace('id', String(data.idLocalDeAplicacao))}`}
      />
    )
  },
  { label: 'Observações', render: data => <Typography noWrap>{data.obs}</Typography> },
  {
    label: 'Itens',
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
              Quantidade Entregue
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='caption' noWrap>
              Undidade de Consumo
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption' noWrap>
              Valor Unitario
            </Typography>
          </Grid>
        </Grid>

        {data.itens?.map((item, index) => (
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
              <Typography noWrap>{item.undConsumo}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.valorUntEntregue}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
  }
]
