import { MaterialForm } from '@/app/ui/materiais/MaterialForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou MaterialCreate')

  const { MATERIAIS } = Environment

  return (
    <BasePageLayout
      pageTitle='Criar novo'
      breadcrumbsPath={[{ label: 'Materiais', to: `${MATERIAIS.LIST_PAGE}` }, { label: 'Novo' }]}
    >
      <MaterialForm />
    </BasePageLayout>
  )
}
