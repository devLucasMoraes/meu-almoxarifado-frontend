'use client'
import { RequisitanteForm } from '@/app/ui/requisitantes/RequisitanteForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { requisitanteQueries } from '@/queries/RequisitanteQueries'
import { useQuery } from '@tanstack/react-query'

export default function RequisitanteEdit({ params }: { params: { id: string } }) {
  console.log('renderizou RequisitanteEdit')

  const { REQUISITANTES } = Environment

  const id = params.id

  const { data: requisitante } = useQuery({ ...requisitanteQueries.getById(Number(id)) })

  const { mutate: deleteById } = requisitanteQueries.deleteById()

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Requisitante'
      breadcrumbsPath={[{ label: 'Requisitantes', to: `${REQUISITANTES.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${REQUISITANTES.SHOW_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <RequisitanteForm data={requisitante} id={id} />
    </BasePageLayout>
  )
}
