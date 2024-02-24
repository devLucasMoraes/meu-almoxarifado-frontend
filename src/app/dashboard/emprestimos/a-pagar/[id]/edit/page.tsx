'use client'
import { EmprestimoForm } from '@/app/ui/emprestimos/EmprestimoForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { emprestimoAPagarQueries } from '@/queries/EmprestimoAPagarQueries'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou CategoriaEdit')

  const { EMPRESTIMO } = Environment

  const id = params.id

  const { mutate: deleteById } = emprestimoAPagarQueries.deleteById()

  const { data: emprestimo } = useQuery({ ...emprestimoAPagarQueries.getById(Number(id)) })

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Emprestimo'
      breadcrumbsPath={[{ label: 'Emprestimos a pagar', to: `${EMPRESTIMO.A_PAGAR.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${EMPRESTIMO.A_PAGAR.SHOW_PAGE.replace('id', String(id))}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <EmprestimoForm id={id} data={emprestimo} />
    </BasePageLayout>
  )
}
