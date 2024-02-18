'use client'
import { MaterialForm } from '@/app/ui/materiais/MaterialForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { MaterialQueries } from '@/queries/MaterialQueries'
import { useQuery } from '@tanstack/react-query'

const materialQueries = new MaterialQueries()

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou MaterialEdit')

  const { MATERIAIS } = Environment

  const id = params.id

  const { data: material } = useQuery({ ...materialQueries.getById(Number(id)) })

  const { mutate: deleteById } = materialQueries.deleteById()

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Material'
      breadcrumbsPath={[{ label: 'Materiais', to: `${MATERIAIS.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${MATERIAIS.SHOW_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <MaterialForm id={id} data={material} />
    </BasePageLayout>
  )
}
