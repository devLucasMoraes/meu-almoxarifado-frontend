import { EmprestimoForm } from '@/app/ui/emprestimos/EmprestimoForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { Environment } from '@/environment'

export default function Page() {
  console.log('renderizou CategoriaCreate')

  const { EMPRESTIMO } = Environment

  return (
    <BasePageLayout
      pageTitle='Criar novo'
      breadcrumbsPath={[{ label: 'Emprestimos a pagar', to: `${EMPRESTIMO.A_PAGAR.LIST_PAGE}` }, { label: 'Novo' }]}
    >
      <EmprestimoForm />
    </BasePageLayout>
  )
}
