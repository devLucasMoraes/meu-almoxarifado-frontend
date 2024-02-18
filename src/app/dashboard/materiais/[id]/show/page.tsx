'use client'
import { materialFields } from '@/app/ui/materiais/materialFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { MaterialQueries } from '@/queries/MaterialQueries'
import { TMaterial } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

const materialQueries = new MaterialQueries()

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou MaterialShow')

  const { MATERIAIS } = Environment

  const id = params.id

  const { data: material } = useQuery({ ...materialQueries.getById(Number(id)) })

  const { mutate: deleteById } = materialQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={material?.descricao ?? ''}
      breadcrumbsPath={[{ label: 'Materiais', to: `${MATERIAIS.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools
          mostrarBotaoEditar
          linkBotaoEditar={`${MATERIAIS.EDIT_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <EntityInfo<TMaterial> data={material} fields={materialFields} />
    </BasePageLayout>
  )
}
