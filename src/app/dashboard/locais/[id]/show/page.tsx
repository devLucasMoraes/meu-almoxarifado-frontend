'use client'
import { locaisDeAplicacaoFields } from '@/app/ui/locais/locaisDeAplicacaoFields'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { EntityInfo } from '@/app/ui/shared/components/EntityInfo'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { LocalDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { TLocalDeAplicacao } from '@/types/models'
import { useQuery } from '@tanstack/react-query'

const localDeAplicacaoQueries = new LocalDeAplicacaoQueries()

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
        <CrudTools
          mostrarBotaoEditar
          linkBotaoEditar={`${LOCAIS_DE_APLICACAO.EDIT_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <EntityInfo<TLocalDeAplicacao> data={local} fields={locaisDeAplicacaoFields} />
    </BasePageLayout>
  )
}
