import { Environment } from '@/environment'
import { FornecedoraQueries } from '@/queries/FornecedoraQueries'
import { MaterialQueries } from '@/queries/MaterialQueries'
import { TransportadoraQueries } from '@/queries/TransportadoraQueries'
import { TNfeDeCompra } from '@/types/models'
import { Grid, Paper, Typography } from '@mui/material'
import { UnderlineLink } from '../../shared/components/UnderlineLink'

const materialQueries = new MaterialQueries()
const transportadoraQueries = new TransportadoraQueries()
const fornecedoraQueries = new FornecedoraQueries()

const { FORNECEDORAS, TRANSPORTADORAS, MATERIAIS } = Environment

export const transacaoEntradaFields: { label: string; render: (data: TNfeDeCompra) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'NFe', render: data => <Typography noWrap>{data.nfe}</Typography> },
  { label: 'Emitido em', render: data => <Typography noWrap>{data.dataEmissao?.toString()}</Typography> },
  { label: 'Recebido em', render: data => <Typography noWrap>{data.dataRecebimento.toString()}</Typography> },
  {
    label: 'Fornecedora',
    render: data => (
      <UnderlineLink
        queries={fornecedoraQueries}
        id={data.idFornecedora}
        nameProperty='nomeFantasia'
        linkPath={`${FORNECEDORAS.SHOW_PAGE.replace('id', String(data.idFornecedora))}`}
      />
    )
  },
  {
    label: 'Transportadora',
    render: data => (
      <UnderlineLink
        queries={transportadoraQueries}
        id={data.idTransportadora}
        nameProperty='nomeFantasia'
        linkPath={`${TRANSPORTADORAS.SHOW_PAGE.replace('id', String(data.idTransportadora))}`}
      />
    )
  },
  { label: 'Ipi total', render: data => <Typography noWrap>{data.valorTotalIpi}</Typography> },
  { label: 'Total', render: data => <Typography noWrap>{data.valorTotalNfe}</Typography> },
  { label: 'Frete', render: data => <Typography noWrap>{data.valorFrete}</Typography> },
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
          <Grid item xs={2}>
            <Typography variant='caption' noWrap>
              Valor IPI
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
              <Typography noWrap>{item.quantCom}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography noWrap>{item.undCom}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.valorUntCom}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.valorIpi}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
  }
]
