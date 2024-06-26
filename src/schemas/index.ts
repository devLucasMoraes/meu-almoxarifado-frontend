import { Unidade } from '@/types/enum'
import { z } from 'zod'

export const ConversaoDeConsumoSchema = z.object({
  idConversao: z.number().optional(),
  undConsumo: z.string().min(1),
  undEstoque: z.string().min(1),
  fatorDeConversao: z.coerce.number()
})

export const CategoriaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1),
  undEstoque: z.string().min(1),
  estoqueMinimo: z.number().nonnegative(),
  conversoesDeConsumo: z.array(ConversaoDeConsumoSchema).optional()
})

export const ConversaoDeCompraSchema = z.object({
  idConversao: z.number().optional(),
  undCompra: z.string().min(1),
  undEstoque: z.string().min(1),
  fatorDeConversao: z.number()
})

export const VinculoMaterialFornecedoraSchema = z.object({
  idVinculo: z.number().optional(),
  idFornecedora: z.number(),
  idMaterial: z.number().optional(),
  referenciaFornecedora: z.string(),
  descricaoFornecedora: z.string().optional(),
  conversoesDeCompra: z.array(ConversaoDeCompraSchema).optional()
})

export const MaterialSchema = z.object({
  id: z.number().optional(),
  descricao: z.string().min(1),
  valorUntMedAuto: z.boolean(),
  valorUnt: z.coerce.number().optional(),
  idCategoria: z.number(),
  fornecedorasVinculadas: z.array(VinculoMaterialFornecedoraSchema).optional()
})

export const FornecedoraSchema = z.object({
  id: z.number().optional(),
  nomeFantasia: z.string().min(1),
  razaoSocial: z.string().min(1),
  cnpj: z.string().min(1),
  fone: z.string().min(1),
  materiaisVinculados: z.array(VinculoMaterialFornecedoraSchema).optional()
})

export const TransportadoraSchema = z.object({
  id: z.number().optional(),
  nomeFantasia: z.string().min(1),
  razaoSocial: z.string().min(1),
  cnpj: z.string().min(1),
  fone: z.string().min(1)
})

export const RequisitanteSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1),
  fone: z.string().min(1)
})

export const LocalDeAplicacaoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1)
})

export const ItemNfeDeCompraSchema = z.object({
  idItem: z.number().optional(),
  idMaterial: z.number(),
  undCom: z.nativeEnum(Unidade),
  quantCom: z.number(),
  valorUntCom: z.number(),
  valorIpi: z.number(),
  descricaoFornecedora: z.string().optional(),
  referenciaFornecedora: z.string().optional()
})

export const NfeDeCompraSchema = z.object({
  id: z.number().optional(),
  nfe: z.string().optional(),
  chaveNfe: z.string().optional(),
  dataEmissao: z.date().optional().nullable(),
  dataRecebimento: z.date(),
  valorFrete: z.number().optional(),
  valorSeguro: z.number().optional(),
  valorDesconto: z.number().optional(),
  valorOutros: z.number().optional(),
  valorTotalIpi: z.number().optional(),
  valorTotalProdutos: z.number().optional(),
  valorTotalNfe: z.number().optional(),
  obs: z.string().optional(),
  idTransportadora: z.number(),
  idFornecedora: z.number(),
  itens: z.array(ItemNfeDeCompraSchema)
})

export const ItemRequisicaoDeEstoqueSchema = z.object({
  idItem: z.number().optional(),
  idMaterial: z.number(),
  undConsumo: z.nativeEnum(Unidade),
  quantEntregue: z.number()
})

export const RequisicaoDeEstoqueSchema = z.object({
  id: z.number().optional(),
  dataRequisicao: z.date(),
  obs: z.string().optional(),
  ordemProducao: z.string().optional(),
  idRequisitante: z.coerce.number(),
  idLocalDeAplicacao: z.coerce.number(),
  itens: z.array(ItemRequisicaoDeEstoqueSchema)
})

export const AcertoSchema = z.object({
  id: z.number().optional(),
  idMaterial: z.number(),
  justificativa: z.string().min(1),
  quantidade: z.number()
})
