'use client'
import { requisicaoDeEstoqueFields } from '@/app/ui/requisicoes/requisicaoDeEstoqueFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
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
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${REQUISICOES_DE_ESTOQUE.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TRequisicaoDeEstoque> data={requisicoesDeEstoque} fields={requisicaoDeEstoqueFields} />
    </BasePageLayout>
  )
}
