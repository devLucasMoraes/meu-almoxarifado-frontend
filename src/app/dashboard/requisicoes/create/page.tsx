import { RequisicaoDeEstoqueForm } from '@/app/ui/requisicoes/RequisicaoDeEstoqueForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou TransacaoSaidaCreate')

  const { REQUISICOES_DE_ESTOQUE } = Environment

  return (
    <BasePageLayout
      pageTitle='Nova Requisição'
      breadcrumbsPath={[{ label: 'Requisições', to: `${REQUISICOES_DE_ESTOQUE.LIST_PAGE}` }, { label: 'Nova' }]}
    >
      <RequisicaoDeEstoqueForm />
    </BasePageLayout>
  )
}
