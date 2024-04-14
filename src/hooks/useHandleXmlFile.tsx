import { fornecedoraService } from '@/services/FornecedoraService'
import { transportadoraService } from '@/services/TransportadoraService'
import { useDialogDataStore } from '@/store/dialogDataStore'
import { useIsOpenDialog } from '@/store/dialogStore'
import { INfeProc } from '@/types/INfeProc'
import { TFornecedora, TTransportadora } from '@/types/models'
import { XMLParser } from 'fast-xml-parser'
import { useCallback, useEffect, useMemo, useState } from 'react'

const parseXml = (fileContent: string): INfeProc => {
  const alwaysArray = ['nfeProc.NFe.infNFe.det']

  const parser = new XMLParser({
    numberParseOptions: {
      eNotation: false,
      leadingZeros: false,
      hex: false
    },
    isArray: (_tagName, jpath, _isLeafNode, _isAttribute) => {
      if (alwaysArray.indexOf(jpath) !== -1) {
        return true
      } else return false
    }
  })

  return parser.parse(fileContent)
}

export function useHandleXmlFile() {
  const [nfeProcJson, setNfeProcJson] = useState<INfeProc>()
  const [nfeData, setNfeData] = useState<{}>()
  const [fornecedora, setFornecedora] = useState<TFornecedora>()
  const [transportadora, setTransportadora] = useState<TTransportadora>()

  const { toggleFornecedoraDialog, toggleTransportadoraDialog } = useIsOpenDialog()
  const { setFornecedoraDialogData, setTransportadoraDialogData, fornecedoraDialogData, transportadoraDialogData } =
    useDialogDataStore()

  const getFornecedora = useCallback(
    async (fornecedoraNfe: any) => {
      try {
        const fornecedora = await fornecedoraService.getByCnpj(fornecedoraNfe.CNPJ.toString())
        setFornecedora(fornecedora)
      } catch (error) {
        const fornecedoraXMLFile = {
          cnpj: fornecedoraNfe.CNPJ.toString(),
          nomeFantasia: fornecedoraNfe.xFant ?? '',
          razaoSocial: fornecedoraNfe.xNome,
          fone: fornecedoraNfe.enderEmit.fone?.toString() ?? ''
        }
        setFornecedoraDialogData(fornecedoraXMLFile as TFornecedora)
        toggleFornecedoraDialog(true)
      }
    },
    [setFornecedoraDialogData, toggleFornecedoraDialog]
  )

  const getTransportadora = useCallback(
    async (transportadoraNfe: any) => {
      try {
        const transportadora = await transportadoraService.getByCnpj(transportadoraNfe.CNPJ.toString())
        setTransportadora(transportadora)
      } catch (error) {
        const transportadoraXMLFile = {
          cnpj: transportadoraNfe.CNPJ.toString(),
          nomeFantasia: '',
          razaoSocial: transportadoraNfe.xNome ?? '',
          fone: ''
        }
        setTransportadoraDialogData(transportadoraXMLFile as TFornecedora)
        toggleTransportadoraDialog(true)
      }
    },
    [setTransportadoraDialogData, toggleTransportadoraDialog]
  )

  const itensNfeXMLFile = useMemo(() => {
    if (!nfeProcJson) return []

    const itensNfe = nfeProcJson.nfeProc.NFe.infNFe.det
    const materiaisVinculados = fornecedora?.materiaisVinculados ?? []

    return itensNfe.map(item => ({
      idMaterial: materiaisVinculados.find(vinculo => item.prod.cProd.toString() === vinculo.referenciaFornecedora)
        ?.idMaterial,
      descricaoFornecedora: item.prod.xProd,
      referenciaFornecedora: item.prod.cProd.toString(),
      undCom: item.prod.uCom.toUpperCase(),
      quantCom: item.prod.qCom,
      valorUntCom: item.prod.vUnCom,
      valorIpi: item.imposto.IPI.IPITrib?.vIPI ?? 0
    }))
  }, [fornecedora?.materiaisVinculados, nfeProcJson])

  useEffect(() => {
    if (!nfeProcJson) return
    setFornecedoraDialogData(undefined)
    setTransportadoraDialogData(undefined)

    const fornecedoraNfe = nfeProcJson.nfeProc.NFe.infNFe.emit
    const transportadoraNfe = nfeProcJson.nfeProc.NFe.infNFe.transp.transporta

    getFornecedora(fornecedoraNfe)
    getTransportadora(transportadoraNfe)
  }, [getFornecedora, getTransportadora, nfeProcJson, setFornecedoraDialogData, setTransportadoraDialogData])

  useEffect(() => {
    if (!fornecedora && fornecedoraDialogData?.id) {
      setFornecedora(fornecedoraDialogData)
    }
    if (!transportadora && transportadoraDialogData?.id) {
      setTransportadora(transportadoraDialogData)
    }
    console.log('passou antes f', fornecedora)
    console.log('passou antes t', transportadora)
    if (!nfeProcJson || !fornecedora || !transportadora) return
    console.log('passou depois f', fornecedora)
    console.log('passou depois t', transportadora)

    const chaveNfe = nfeProcJson.nfeProc.protNFe.infProt.chNFe
    const dataEmissaoNfe = nfeProcJson.nfeProc.NFe.infNFe.ide.dhEmi
    const totaisNfe = nfeProcJson.nfeProc.NFe.infNFe.total

    const nfeData = {
      nfe: '',
      chaveNfe: chaveNfe.toString(),
      dataEmissao: new Date(dataEmissaoNfe),
      valorFrete: totaisNfe.ICMSTot.vFrete,
      valorSeguro: totaisNfe.ICMSTot.vSeg,
      valorDesconto: totaisNfe.ICMSTot.vDesc,
      valorOutros: totaisNfe.ICMSTot.vOutro,
      valorTotalIpi: totaisNfe.ICMSTot.vIPI,
      valorTotalProdutos: totaisNfe.ICMSTot.vProd,
      valorTotalNfe: totaisNfe.ICMSTot.vNF,
      obs: '',
      idTransportadora: transportadora.id,
      idFornecedora: fornecedora.id,
      itens: itensNfeXMLFile
    }

    setNfeData(nfeData)
  }, [fornecedora, fornecedoraDialogData, itensNfeXMLFile, nfeProcJson, transportadora, transportadoraDialogData])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.length ? files[0] : null
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const fileContent = reader.result?.toString() ?? ''
      const nfeProcJson: INfeProc = parseXml(fileContent)
      setFornecedora(undefined)
      setTransportadora(undefined)
      setNfeData(undefined)
      setNfeProcJson(nfeProcJson)
    }
    reader.readAsText(file)
  }

  return { handleFileChange, nfeData }
}
