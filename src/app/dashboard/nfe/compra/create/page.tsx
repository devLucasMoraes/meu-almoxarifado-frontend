'use client'
import { NfeDeCompraForm } from '@/app/ui/nfe/compra/NfeDeCompraForm'
import { BasePageLayout } from '@/app/ui/shared/components/BasePageLayout'
import { CrudTools } from '@/app/ui/shared/components/CrudTools'
import { Environment } from '@/environment'
import { useHandleXmlFile } from '@/hooks/useHandleXmlFile'
import { TNfeDeCompra } from '@/types/models'

export default function Page() {
  console.log('renderizou NfeDeCompraCreate')

  const { NFE_DE_COMPRA } = Environment

  const { handleFileChange, nfeData } = useHandleXmlFile()

  return (
    <BasePageLayout
      pageTitle='Nova NFe'
      breadcrumbsPath={[{ label: 'Notas', to: `${NFE_DE_COMPRA.LIST_PAGE}` }, { label: 'Nova' }]}
      tools={
        <CrudTools.Root>
          <CrudTools.ImportButton handleImport={handleFileChange} />
        </CrudTools.Root>
      }
    >
      <NfeDeCompraForm data={nfeData as TNfeDeCompra} />
    </BasePageLayout>
  )
}
