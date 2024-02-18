'use client'
import { FornecedoraForm } from '@/app/ui/fornecedoras/FornecedoraForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { FornecedoraQueries } from '@/queries/FornecedoraQueries'
import { useQuery } from '@tanstack/react-query'

const fornecedoraQueries = new FornecedoraQueries()

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou FornecedoraEdit')

  const { FORNECEDORAS } = Environment

  const id = params.id

  const { mutate: deleteById } = fornecedoraQueries.deleteById()

  const { data: fornecedora } = useQuery({ ...fornecedoraQueries.getById(Number(id)) })

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Fornecedora'
      breadcrumbsPath={[{ label: 'Fornecedoras', to: `${FORNECEDORAS.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${FORNECEDORAS.SHOW_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <FornecedoraForm data={fornecedora} id={id} />
    </BasePageLayout>
  )
}
