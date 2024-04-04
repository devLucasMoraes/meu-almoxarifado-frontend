import { AcertoForm } from '@/app/ui/estoque/acerto/AcertoForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou acerto')

  const { MATERIAIS } = Environment

  return (
    <BasePageLayout
      pageTitle='Acerto de Estoque'
      breadcrumbsPath={[{ label: 'Acerto', to: `${MATERIAIS.ACERTO_ESTOQUE}` }, { label: 'Novo' }]}
    >
      <AcertoForm />
    </BasePageLayout>
  )
}
