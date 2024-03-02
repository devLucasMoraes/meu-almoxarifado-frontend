'use client'
import { categoriaFields } from '@/app/ui/categorias/categoriaFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { Environment } from '@/environment'
import { categoriaQueries } from '@/queries/CategoriaQueries'
import { TCategoria } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou CategoriaShow')

  const { CATEGORIAS } = Environment

  const id = params.id

  const { data: categoria } = useQuery({ ...categoriaQueries.getById(Number(id)) })

  const { mutate: deleteById } = categoriaQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={categoria?.nome}
      breadcrumbsPath={[{ label: 'Categorias', to: `${CATEGORIAS.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${CATEGORIAS.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TCategoria> data={categoria} fields={categoriaFields} />
    </BasePageLayout>
  )
}
