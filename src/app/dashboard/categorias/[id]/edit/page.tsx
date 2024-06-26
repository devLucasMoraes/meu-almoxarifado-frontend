'use client'
import { CategoriaForm } from '@/app/ui/categorias/CategoriaForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { Environment } from '@/environment'
import { categoriaQueries } from '@/queries/CategoriaQueries'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou CategoriaEdit')

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
      pageTitle='Editar Categoria'
      breadcrumbsPath={[{ label: 'Categorias', to: `${CATEGORIAS.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.ShowButton showRoute={`${CATEGORIAS.SHOW_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <CategoriaForm id={id} data={categoria} />
    </BasePageLayout>
  )
}
