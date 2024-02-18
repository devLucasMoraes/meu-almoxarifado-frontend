'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { transportadoraFields } from '@/app/ui/transportadoras/transportadoraFields'
import { Environment } from '@/environment'
import { TransportadoraQueries } from '@/queries/TransportadoraQueries'
import { TTransportadora } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

const transportadoraQueries = new TransportadoraQueries()

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou TransportadoraShow')

  const { TRANSPORTADORAS } = Environment

  const id = params.id

  const { data: transportadora } = useQuery({ ...transportadoraQueries.getById(Number(id)) })

  const { mutate: deleteById } = transportadoraQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={transportadora?.nomeFantasia}
      breadcrumbsPath={[{ label: 'Transportadoras', to: `${TRANSPORTADORAS.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools
          mostrarBotaoEditar
          linkBotaoEditar={`${TRANSPORTADORAS.EDIT_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <EntityInfo<TTransportadora> data={transportadora} fields={transportadoraFields} />
    </BasePageLayout>
  )
}
