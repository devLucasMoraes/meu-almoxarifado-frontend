'use client'
import { RequisicaoDeEstoqueForm } from '@/app/ui/requisicoes/RequisicaoDeEstoqueForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { Environment } from '@/environment'
import { requisicaoDeEstoqueQueries } from '@/queries/RequisicaoDeEstoqueQueries'
import { useQuery } from '@tanstack/react-query'

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
        <CrudTools.Root>
          <CrudTools.ShowButton showRoute={`${REQUISICOES_DE_ESTOQUE.SHOW_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <RequisicaoDeEstoqueForm data={requisicaoDeEstoque} id={id} />
    </BasePageLayout>
  )
}
