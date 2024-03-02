'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { transportadoraFields } from '@/app/ui/transportadoras/transportadoraFields'
import { Environment } from '@/environment'
import { transportadoraQueries } from '@/queries/TransportadoraQueries'
import { TTransportadora } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

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
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${TRANSPORTADORAS.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TTransportadora> data={transportadora} fields={transportadoraFields} />
    </BasePageLayout>
  )
}
