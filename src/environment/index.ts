// Definir constantes para valores fixos
const LIMITE_DE_LINHAS_PADRAO = 10

// Definir caminhos de URL para diferentes entidades
const PagePaths = {
  REQUISITANTES: {
    LIST_PAGE: '/dashboard/requisitantes',
    SHOW_PAGE: '/dashboard/requisitantes/id/show',
    EDIT_PAGE: '/dashboard/requisitantes/id/edit',
    CREATE_PAGE: '/dashboard/requisitantes/create'
  },
  LOCAIS_DE_APLICACAO: {
    LIST_PAGE: '/dashboard/locais',
    SHOW_PAGE: '/dashboard/locais/id/show',
    EDIT_PAGE: '/dashboard/locais/id/edit',
    CREATE_PAGE: '/dashboard/locais/create'
  },
  NFE_DE_COMPRA: {
    LIST: '/nfe_de_compra',
    SHOW: '/nfe_de_compra/show/',
    EDIT: '/nfe_de_compra/edit/',
    NEW: '/nfe_de_compra/new',
    DELETE: '/nfe_de_compra/delete/'
  },
  REQUISICOES_DE_ESTOQUE: {
    LIST: '/requisicoes',
    SHOW: '/requisicoes/show/',
    EDIT: '/requisicoes/edit/',
    NEW: '/requisicoes/new',
    DELETE: '/requisicoes/delete/'
  },
  TRANSPORTADORAS: {
    LIST_PAGE: '/dashboard/transportadoras',
    SHOW_PAGE: '/dashboard/transportadoras/id/show',
    EDIT_PAGE: '/dashboard/transportadoras/id/edit',
    CREATE_PAGE: '/dashboard/transportadoras/create'
  },
  FORNECEDORAS: {
    LIST_PAGE: '/dashboard/fornecedoras',
    SHOW_PAGE: '/dashboard/fornecedoras/id/show',
    EDIT_PAGE: '/dashboard/fornecedoras/id/edit',
    CREATE_PAGE: '/dashboard/fornecedoras/create'
  },
  MATERIAIS: {
    QUERY: '/materiais/query',
    LIST_PAGE: '/dashboard/materiais',
    SHOW_PAGE: '/dashboard/materiais/id/show',
    EDIT_PAGE: '/dashboard/materiais/id/edit',
    CREATE_PAGE: '/dashboard/materiais/create'
  },
  CATEGORIAS: {
    LIST_PAGE: '/dashboard/categorias',
    SHOW_PAGE: '/dashboard/categorias/id/show',
    EDIT_PAGE: '/dashboard/categorias/id/edit',
    CREATE_PAGE: '/dashboard/categorias/create'
  },
  VINCULOS: {
    LIST: '/vinculos',
    SHOW: '/vinculos/show/',
    SHOW_QUERY: '/vinculos/show/query',
    EDIT: '/vinculos/edit/',
    NEW: '/vinculos/new',
    DELETE: '/vinculos/delete/'
  },
  EMPRESTIMO: {
    LIST: '/emprestimos/a-pagar',
    SHOW: '/emprestimos/a-pagar/show/',
    EDIT: '/emprestimos/a-pagar/edit/',
    NEW: '/emprestimos/a-pagar/new',
    DELETE: '/emprestimos/a-pagar/delete/'
  }
}

// Definir a URL base para recuperação de dados
const URL_BASE = process.env.NEXT_PUBLIC_BACKEND_URL_API

// Exportar o objeto Environment aprimorado
export const Environment = {
  // Limite de linhas para listagens
  LIMITE_DE_LINHAS: LIMITE_DE_LINHAS_PADRAO,

  // Caminhos de URL para diferentes páginas
  ...PagePaths,

  // URL base para recuperação de dados
  URL_BASE: URL_BASE
}
