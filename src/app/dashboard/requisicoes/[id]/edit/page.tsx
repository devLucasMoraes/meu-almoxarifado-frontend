'use client'
import { RequisicaoDeEstoqueForm } from '@/app/ui/requisicoes/RequisicaoDeEstoqueForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { RequisicaoDeEstoqueQueries } from '@/queries/RequisicaoDeEstoqueQueries'
import { useQuery } from '@tanstack/react-query'

const requisicaoDeEstoqueQueries = new RequisicaoDeEstoqueQueries()

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou RequisicaoDeEstoqueEdit')

  const { REQUISICOES_DE_ESTOQUE } = Environment

  const id = params.id

  const { data: requisicaoDeEstoque } = useQuery({ ...requisicaoDeEstoqueQueries.getById(Number(id)) })

  const { mutate: deleteById } = requisicaoDeEstoqueQueries.deleteById()

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Requisição'
      breadcrumbsPath={[{ label: 'Requisições', to: `${REQUISICOES_DE_ESTOQUE.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${REQUISICOES_DE_ESTOQUE.SHOW_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <RequisicaoDeEstoqueForm data={requisicaoDeEstoque} id={id} />
    </BasePageLayout>
  )
}