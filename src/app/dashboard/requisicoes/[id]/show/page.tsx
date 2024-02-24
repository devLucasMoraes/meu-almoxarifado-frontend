'use client'
import { requisicaoDeEstoqueFields } from '@/app/ui/requisicoes/requisicaoDeEstoqueFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { requisicaoDeEstoqueQueries } from '@/queries/RequisicaoDeEstoqueQueries'
import { TRequisicaoDeEstoque } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou RequisicaoDeEstoqueShow')

  const { REQUISICOES_DE_ESTOQUE } = Environment

  const id = params.id

  const { data: requisicoesDeEstoque } = useQuery({ ...requisicaoDeEstoqueQueries.getById(Number(id)) })

  const { mutate: deleteById } = requisicaoDeEstoqueQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={requisicoesDeEstoque?.ordemProducao ?? ''}
      breadcrumbsPath={[{ label: 'Requisições', to: `${REQUISICOES_DE_ESTOQUE.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools
          mostrarBotaoEditar
          linkBotaoEditar={`${REQUISICOES_DE_ESTOQUE.EDIT_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <EntityInfo<TRequisicaoDeEstoque> data={requisicoesDeEstoque} fields={requisicaoDeEstoqueFields} />
    </BasePageLayout>
  )
}
