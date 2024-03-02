'use client'
import { requisitanteFields } from '@/app/ui/requisitantes/requisitanteFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { Environment } from '@/environment'
import { requisitanteQueries } from '@/queries/RequisitanteQueries'
import { TRequisitante } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou RequisitanteShow')

  const { REQUISITANTES } = Environment

  const id = params.id

  const { data: requisitante } = useQuery({ ...requisitanteQueries.getById(Number(id)) })

  const { mutate: deleteById } = requisitanteQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={requisitante?.nome}
      breadcrumbsPath={[{ label: 'Requisitantes', to: `${REQUISITANTES.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${REQUISITANTES.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TRequisitante> data={requisitante} fields={requisitanteFields} />
    </BasePageLayout>
  )
}
