import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { TransportadoraForm } from '@/app/ui/transportadoras/TransportadoraForm'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou TransportadoraCreate')

  const { TRANSPORTADORAS } = Environment

  return (
    <BasePageLayout
      pageTitle='Nova Transportadora'
      breadcrumbsPath={[{ label: 'Transportadoras', to: `${TRANSPORTADORAS.LIST_PAGE}` }, { label: 'Nova' }]}
    >
      <TransportadoraForm />
    </BasePageLayout>
  )
}
