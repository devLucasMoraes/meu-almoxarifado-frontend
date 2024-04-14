'use client'
import { materialFields } from '@/app/ui/materiais/materialFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { Environment } from '@/environment'
import { materialQueries } from '@/queries/MaterialQueries'
import { TMaterial } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

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
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${MATERIAIS.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TMaterial> data={material} fields={materialFields} />
    </BasePageLayout>
  )
}
