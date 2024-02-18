'use client'
import { requisitanteFields } from '@/app/ui/requisitantes/requisitanteFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { RequisitanteQueries } from '@/queries/RequisitanteQueries'
import { TRequisitante } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

const requisitanteQueries = new RequisitanteQueries()

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
        <CrudTools
          mostrarBotaoEditar
          linkBotaoEditar={`${REQUISITANTES.EDIT_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <EntityInfo<TRequisitante> data={requisitante} fields={requisitanteFields} />
    </BasePageLayout>
  )
}
