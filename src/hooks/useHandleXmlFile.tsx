import { fornecedoraQueries } from '@/queries/FornecedoraQueries'
import { transportadoraQueries } from '@/queries/TransportadoraQueries'
import { useIsOpenDialog } from '@/store/dialogStore'
import { INfeProc } from '@/types/INfeProc'
import { TFornecedora, TTransportadora } from '@/types/models'
import { useQuery } from '@tanstack/react-query'
import { XMLParser } from 'fast-xml-parser'
import { useEffect, useState } from 'react'

export function useHandleXmlFile() {
  const [nfeProcJson, setNfeProcJson] = useState<INfeProc>()
  const [fornecedoraXMLFile, setFornecedoraXMLFile] = useState<TFornecedora>()
  const [transportadoraXMLFile, setTransportadoraXMLFile] = useState<TTransportadora>()
  const [nfeXMLFile, setNfeXMLFile] = useState({})
  console.log('-----------nfeProcJson-------------', nfeProcJson)

  const { toggleFornecedoraDialog, toggleTransportadoraDialog } = useIsOpenDialog()

  const { data: fornecedora, isError: fornecedoraNotFound } = useQuery({
    ...fornecedoraQueries.getByCnpj(`cnpj=${fornecedoraXMLFile?.cnpj ?? ''} `),
    retry: false
  })

  const { data: transportadora, isError: transportadoraNotFound } = useQuery({
    ...transportadoraQueries.getByCnpj(`cnpj=${transportadoraXMLFile?.cnpj ?? ''} `),
    retry: false
  })

  if (fornecedoraNotFound) {
    toggleFornecedoraDialog(true)
  }

  if (transportadoraNotFound) {
    toggleTransportadoraDialog(true)
  }

  useEffect(() => {
    if (!nfeProcJson) return

    const transportadoraNfe = nfeProcJson.nfeProc.NFe.infNFe.transp.transporta

    const transportadoraXMLFile: TTransportadora = {
      id: transportadora?.content.map(t => t.id) as unknown as number,
      cnpj: transportadoraNfe.CNPJ.toString(),
      nomeFantasia: '',
      razaoSocial: transportadoraNfe.xNome ?? '',
      fone: ''
    }
    setTransportadoraXMLFile(transportadoraXMLFile)
  }, [nfeProcJson, transportadora?.content])

  useEffect(() => {
    if (!nfeProcJson) return

    const fornecedoraNfe = nfeProcJson.nfeProc.NFe.infNFe.emit

    const fornecedoraXMLFile: TFornecedora = {
      id: fornecedora?.content.map(t => t.id) as unknown as number,
      cnpj: fornecedoraNfe.CNPJ.toString(),
      nomeFantasia: fornecedoraNfe.xFant,
      razaoSocial: fornecedoraNfe.xNome,
      fone: fornecedoraNfe.enderEmit.fone ? fornecedoraNfe.enderEmit.fone.toString() : ''
    }
    setFornecedoraXMLFile(fornecedoraXMLFile)
  }, [fornecedora?.content, nfeProcJson])

  useEffect(() => {
    if (!nfeProcJson) return

    const chaveNfe = nfeProcJson.nfeProc.protNFe.infProt.chNFe
    const dataEmissaoNfe = nfeProcJson.nfeProc.NFe.infNFe.ide.dhEmi
    const totaisNfe = nfeProcJson.nfeProc.NFe.infNFe.total

    const itensNfe = nfeProcJson.nfeProc.NFe.infNFe.det

    const itensNfeXMLFile = itensNfe.map(item => ({
      descricaoFornecedora: item.prod.xProd,
      referenciaFornecedora: item.prod.cProd.toString(),
      undCom: item.prod.uCom.toUpperCase(),
      quantCom: item.prod.qCom,
      valorUntCom: item.prod.vUnCom,
      valorIpi: item.imposto.IPI.IPITrib?.vIPI ?? 0
    }))

    const nfeXMLFile = {
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
      idTransportadora: transportadora?.content.map(t => t.id) as unknown as number,
      idFornecedora: fornecedora?.content.map(t => t.id) as unknown as number,
      itens: itensNfeXMLFile
    }

    setNfeXMLFile(nfeXMLFile)
  }, [fornecedora?.content, nfeProcJson, transportadora?.content])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    const file = fileInput.files?.[0]
    fileInput.value = ''
    if (!file) return

    const parser = new XMLParser({
      numberParseOptions: {
        eNotation: false,
        leadingZeros: false,
        hex: false
      }
    })

    const reader = new FileReader()
    reader.onload = () => {
      const fileContent = reader.result?.toString() ?? ''
      const nfeProcJson: INfeProc = parser.parse(fileContent)
      setNfeProcJson(nfeProcJson)
    }
    reader.readAsText(file)
  }
  return { handleFileChange, nfeXMLFile }
}
