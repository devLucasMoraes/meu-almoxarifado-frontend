import { FornecedoraForm } from '@/app/ui/fornecedoras/FornecedoraForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou FornecedoraCreate')

  const { FORNECEDORAS } = Environment

  return (
    <BasePageLayout
      pageTitle='Nova Fornecedora'
      breadcrumbsPath={[{ label: 'Fornecedoras', to: `${FORNECEDORAS.LIST_PAGE}` }, { label: 'Nova' }]}
    >
      <FornecedoraForm />
    </BasePageLayout>
  )
}
