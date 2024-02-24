import { Environment } from '@/environment'
import { categoriaQueries } from '@/queries/CategoriaQueries'
import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { TMaterial } from '@/types/models'
import { Grid, Paper, Typography } from '@mui/material'
import { UnderlineLink } from '../shared/components/UnderlineLink'

const { CATEGORIAS, FORNECEDORAS } = Environment

export const materialFields: { label: string; render: (data: TMaterial) => React.ReactNode }[] = [
  { label: 'Id', render: data => <Typography noWrap>{data.id}</Typography> },
  { label: 'Quantidade em Estoque', render: data => <Typography noWrap>{data.qtdEmEstoque}</Typography> },
  { label: 'Nome', render: data => <Typography noWrap>{data.descricao}</Typography> },
  { label: 'Valor unitario', render: data => <Typography noWrap>{data.valorUntMed}</Typography> },
  {
    label: 'Categoria',
    render: data => (
      <UnderlineLink
        id={data.idCategoria}
        queries={categoriaQueries}
        nameProperty='nome'
        linkPath={`${CATEGORIAS.SHOW_PAGE.replace('id', String(data.idCategoria))}`}
      />
    )
  },
  {
    label: 'Vinculos',
    render: data => (
      <Grid container direction='column' padding={2} marginTop={1} component={Paper} variant='outlined'>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant='caption' noWrap>
              Fornecedora
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='caption' noWrap>
              Codigo do Produto
            </Typography>
          </Grid>
        </Grid>

        {data.fornecedorasVinculadas?.map((item, index) => (
          <Grid container key={`${item.idFornecedora}-${index}`}>
            <Grid item xs={3}>
              <UnderlineLink
                queries={fornecedoraQueries}
                id={item.idFornecedora}
                nameProperty='nomeFantasia'
                linkPath={`${FORNECEDORAS.SHOW_PAGE.replace('id', String(item.idFornecedora))}`}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography noWrap>{item.referenciaFornecedora}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    )
  }
]
