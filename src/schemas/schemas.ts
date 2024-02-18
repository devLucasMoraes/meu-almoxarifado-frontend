import { z } from 'zod'

export const ConversaoDeConsumoSchema = z.object({
  idConversao: z.number().optional(),
  undConsumo: z.string().nonempty(),
  undEstoque: z.string().nonempty(),
  fatorDeConversao: z.coerce.number()
})

export const CategoriaSchema = z.object({
  id: z.number().optional(),
  nome: z.string().nonempty(),
  undEstoque: z.string().nonempty(),
  estoqueMinimo: z.number().nonnegative(),
  conversoesDeConsumo: z.array(ConversaoDeConsumoSchema).optional()
})

export const ConversaoDeCompraSchema = z.object({
  idConversao: z.number().optional(),
  undCompra: z.string().nonempty(),
  undEstoque: z.string().nonempty(),
  fatorDeConversao: z.number()
})

export const VinculoMaterialFornecedoraSchema = z.object({
  idVinculo: z.number().optional(),
  idFornecedora: z.number(),
  idMaterial: z.number().optional(),
  referenciaFornecedora: z.string(),
  descricaoFornecedora: z.string(),
  conversoesDeCompra: z.array(ConversaoDeCompraSchema).optional()
})

export const MaterialSchema = z.object({
  id: z.number().optional(),
  descricao: z.string().nonempty(),
  valorUntMedAuto: z.boolean(),
  valorUnt: z.coerce.number().optional(),
  idCategoria: z.number(),
  fornecedorasVinculadas: z.array(VinculoMaterialFornecedoraSchema).optional()
})

export const FornecedoraSchema = z.object({
  id: z.number().optional(),
  nomeFantasia: z.string().nonempty(),
  razaoSocial: z.string().nonempty(),
  cnpj: z.string().nonempty(),
  fone: z.string().nonempty()
})

export const TransportadoraSchema = z.object({
  id: z.number().optional(),
  nomeFantasia: z.string().nonempty(),
  razaoSocial: z.string().nonempty(),
  cnpj: z.string().nonempty(),
  fone: z.string().nonempty()
})

export const RequisitanteSchema = z.object({
  id: z.number().optional(),
  nome: z.string().nonempty(),
  fone: z.string().nonempty()
})
