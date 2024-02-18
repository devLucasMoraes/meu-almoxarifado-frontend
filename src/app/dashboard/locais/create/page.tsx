import { LocaisDeAplicacaoForm } from '@/app/ui/locais/LocaisDeAplicacaoForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function LocaisDeAplicacaoCreate() {
  console.log('renderizou LocaisDeAplicacaoCreate')

  const { LOCAIS_DE_APLICACAO } = Environment

  return (
    <BasePageLayout
      pageTitle='Novo Local de Aplicação'
      breadcrumbsPath={[{ label: 'Locais', to: `${LOCAIS_DE_APLICACAO.LIST_PAGE}` }, { label: 'Novo' }]}
    >
      <LocaisDeAplicacaoForm />
    </BasePageLayout>
  )
}
