'use client'
import { NfeDeCompraForm } from '@/app/ui/nfe/compra/NfeDeCompraForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/crudTools/CrudTools'
import { Environment } from '@/environment'
import { useHandleXmlFile } from '@/hooks/useHandleXmlFile'
import { TNfeDeCompra } from '@/types/models'

export default function Page() {
  console.log('renderizou NfeDeCompraCreate')

  const { NFE_DE_COMPRA } = Environment

  const { handleFileChange, nfeXMLFile } = useHandleXmlFile()

  return (
    <BasePageLayout
      pageTitle='Nova NFe'
      breadcrumbsPath={[{ label: 'Notas', to: `${NFE_DE_COMPRA.LIST_PAGE}` }, { label: 'Nova' }]}
      tools={
        <CrudTools
          //mostrarBotaoResetXML={!!nfeXMLFile?.nfe}
          //aoClicarEmResetXML={reset}
          mostrarBotaoImportarXML
          aoAlternarArquivo={handleFileChange}
        />
      }
    >
      <NfeDeCompraForm data={nfeXMLFile as TNfeDeCompra} />
    </BasePageLayout>
  )
}
