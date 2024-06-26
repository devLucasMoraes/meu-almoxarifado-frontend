'use client'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { TransportadoraForm } from '@/app/ui/transportadoras/TransportadoraForm'
import { Environment } from '@/environment'
import { transportadoraQueries } from '@/queries/TransportadoraQueries'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou TransportadoraEdit')

  const { TRANSPORTADORAS } = Environment

  const id = params.id

  const { mutate: deleteById } = transportadoraQueries.deleteById()

  const { data: transportadora } = useQuery({ ...transportadoraQueries.getById(Number(id)) })

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Transportadora'
      breadcrumbsPath={[{ label: 'Transportadoras', to: `${TRANSPORTADORAS.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.ShowButton showRoute={`${TRANSPORTADORAS.SHOW_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <TransportadoraForm data={transportadora} id={id} />
    </BasePageLayout>
  )
}
