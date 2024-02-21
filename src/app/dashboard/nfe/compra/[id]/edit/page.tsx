'use client'
import { NfeDeCompraForm } from '@/app/ui/nfe/compra/NfeDeCompraForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { NfeDeCompraQueries } from '@/queries/NfeDeCompraQueries'
import { useQuery } from '@tanstack/react-query'

const nfeDeCompraQueries = new NfeDeCompraQueries()

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou NfeDeCompraEdit')

  const { NFE_DE_COMPRA } = Environment

  const id = params.id

  const { mutate: deleteById } = nfeDeCompraQueries.deleteById()

  const { data: transacaoEntrada } = useQuery({ ...nfeDeCompraQueries.getById(Number(id)) })

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Nota'
      breadcrumbsPath={[{ label: 'Notas', to: `${NFE_DE_COMPRA.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${NFE_DE_COMPRA.SHOW_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <NfeDeCompraForm data={transacaoEntrada} id={id} />
    </BasePageLayout>
  )
}
