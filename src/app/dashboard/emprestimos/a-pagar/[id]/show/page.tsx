'use client'
import { emprestimosFields } from '@/app/ui/emprestimos/emprestimoFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { Environment } from '@/environment'
import { emprestimoAPagarQueries } from '@/queries/EmprestimoAPagarQueries'
import { TEmprestimo } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou CategoriaShow')

  const { EMPRESTIMO } = Environment

  const id = params.id

  const { data: emprestimo } = useQuery({ ...emprestimoAPagarQueries.getById(Number(id)) })

  const { mutate: deleteById } = emprestimoAPagarQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={emprestimo?.situacao}
      breadcrumbsPath={[{ label: 'Emprestimos', to: `${EMPRESTIMO.A_PAGAR.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${EMPRESTIMO.A_PAGAR.EDIT_PAGE.replace('id', String(id))}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TEmprestimo> data={emprestimo} fields={emprestimosFields} />
    </BasePageLayout>
  )
}
