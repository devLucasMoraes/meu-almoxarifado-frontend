'use client'
import { LocaisDeAplicacaoForm } from '@/app/ui/locais/LocaisDeAplicacaoForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { LocalDeAplicacaoQueries } from '@/queries/LocalDeAplicacaoQueries'
import { useQuery } from '@tanstack/react-query'

const localDeAplicacaoQueries = new LocalDeAplicacaoQueries()

export default function LocaisDeAplicacaoEdit({ params }: { params: { id: string } }) {
  console.log('renderizou LocaisDeAplicacaoEdit')

  const { LOCAIS_DE_APLICACAO } = Environment

  const id = params.id

  const { mutate: deleteById } = localDeAplicacaoQueries.deleteById()

  const { data: local } = useQuery({ ...localDeAplicacaoQueries.getById(Number(id)) })

  function handleDelete(id: number): void {
    if (confirm('Realmente deseja apagar?')) {
      deleteById(id)
    }
  }

  return (
    <BasePageLayout
      pageTitle='Editar Local de Aplicação'
      breadcrumbsPath={[{ label: 'Locais', to: `${LOCAIS_DE_APLICACAO.LIST_PAGE}` }, { label: 'Editar' }]}
      tools={
        <CrudTools
          mostrarBotaoExibir
          linkBotaoExibir={`${LOCAIS_DE_APLICACAO.SHOW_PAGE.replace('id', id)}`}
          mostrarBotaoApagar
          aoClicarEmApagar={() => handleDelete(Number(id))}
        />
      }
    >
      <LocaisDeAplicacaoForm data={local} id={id} />
    </BasePageLayout>
  )
}
