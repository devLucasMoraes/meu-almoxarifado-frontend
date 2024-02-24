'use client'
import { transacaoEntradaFields } from '@/app/ui/nfe/compra/transacaoEntradaFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { nfeDeCompraQueries } from '@/queries/NfeDeCompraQueries'
import { TNfeDeCompra } from '@/types/models'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou NfeDeCompraShow')

  const { NFE_DE_COMPRA } = Environment

  const id = params.id

  const [tab, setTab] = useState('1')

  const handleChangeTab = (_: any, newValue: string) => {
    setTab(newValue)
  }

  const { data: nfeDeCompra } = useQuery({ ...nfeDeCompraQueries.getById(Number(id)) })

  const { mutate: deleteById } = nfeDeCompraQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={nfeDeCompra?.nfe ?? ''}
      breadcrumbsPath={[{ label: 'Notas', to: `${NFE_DE_COMPRA.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools
          mostrarBotaoEditar
          linkBotaoEditar={`${NFE_DE_COMPRA.EDIT_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      {/*       <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab}>
            <Tab label='Nota Fiscal' value='1' />
            <Tab label='Movimentações' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
        </TabPanel>
        <TabPanel value='2'></TabPanel>
      </TabContext> */}
      <EntityInfo<TNfeDeCompra> data={nfeDeCompra} fields={transacaoEntradaFields} />
    </BasePageLayout>
  )
}
