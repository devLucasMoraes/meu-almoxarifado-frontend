import { RequisitanteForm } from '@/app/ui/requisitantes/RequisitanteForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou RequisitanteCreate')

  const { REQUISITANTES } = Environment

  return (
    <BasePageLayout
      pageTitle='Novo Requisitante'
      breadcrumbsPath={[{ label: 'Requisitantes', to: `${REQUISITANTES.LIST_PAGE}` }, { label: 'Novo' }]}
    >
      <RequisitanteForm />
    </BasePageLayout>
  )
}
