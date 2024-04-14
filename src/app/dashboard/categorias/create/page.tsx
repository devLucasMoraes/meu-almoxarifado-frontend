import { CategoriaForm } from '@/app/ui/categorias/CategoriaForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou CategoriaCreate')

  const { CATEGORIAS } = Environment

  return (
    <BasePageLayout
      pageTitle='Criar nova'
      breadcrumbsPath={[{ label: 'Categorias', to: `${CATEGORIAS.LIST_PAGE}` }, { label: 'Nova' }]}
    >
      <CategoriaForm />
    </BasePageLayout>
  )
}
