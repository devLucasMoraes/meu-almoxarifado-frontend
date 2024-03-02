'use client'
import { localDeAplicacaoFields } from '@/app/ui/locais/localDeAplicacaoFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { Environment } from '@/environment'
import { localDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { TLocalDeAplicacao } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

export default function Page({ params }: { params: { id: string } }) {
  console.log('renderizou DestinoShow')

  const { LOCAIS_DE_APLICACAO } = Environment

  const id = params.id

  const { data: local } = useQuery({ ...localDeAplicacaoQueries.getById(Number(id)) })

  const { mutate: deleteById } = localDeAplicacaoQueries.deleteById()

  function handleDelete(id: number): void {
    if (!id) return
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle={local?.nome}
      breadcrumbsPath={[{ label: 'Locais', to: `${LOCAIS_DE_APLICACAO.LIST_PAGE}` }, { label: 'Exibir' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.EditButton editRoute={`${LOCAIS_DE_APLICACAO.EDIT_PAGE.replace('id', id)}`} />
          <CrudTools.DeleteButton handleDelete={() => handleDelete(Number(id))} />
        </CrudTools.Root>
      }
    >
      <EntityInfo<TLocalDeAplicacao> data={local} fields={localDeAplicacaoFields} />
    </BasePageLayout>
  )
}
