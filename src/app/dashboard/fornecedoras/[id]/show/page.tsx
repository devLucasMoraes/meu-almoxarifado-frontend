'use client'
import { fornecedoraFields } from '@/app/ui/fornecedoras/fornecedoraFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { Environment } from '@/environment'
import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { TFornecedora } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou FornecedoraShow')

  const { FORNECEDORAS } = Environment

  const id = params.id

  const { data: fornecedora } = useQuery({ ...fornecedoraQueries.getById(Number(id)) })

  const { mutate: deleteById } = fornecedoraQueries.deleteById()

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={fornecedora?.nomeFantasia}
      breadcrumbsPath={[{ label: 'Fornecedoras', to: `${FORNECEDORAS.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${FORNECEDORAS.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TFornecedora> data={fornecedora} fields={fornecedoraFields} />
    </BasePageLayout>
  )
}
