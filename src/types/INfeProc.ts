export interface INfeProc {
  nfeProc: NfeProc
}

interface NfeProc {
  NFe: Nfe
  protNFe: ProtNfe
}

interface Nfe {
  infNFe: InfNfe
  Signature: Signature
}

interface InfNfe {
  ide: Ide
  emit: Emit
  dest: Dest
  det: Det[]
  total: Total
  transp: Transp
  cobr: Cobr
  pag: Pag
  infAdic: InfAdic
}

interface Ide {
  cUF: number
  cNF: number
  natOp: string
  mod: number
  serie: number
  nNF: number
  dhEmi: string
  tpNF: number
  idDest: number
  cMunFG: number
  tpImp: number
  tpEmis: number
  cDV: number
  tpAmb: number
  finNFe: number
  indFinal: number
  indPres: number
  procEmi: number
  verProc: string
}

interface Emit {
  CNPJ: number
  xNome: string
  xFant: string
  enderEmit: EnderEmit
  IE: number
  IM: number
  CNAE: number
  CRT: number
}

interface EnderEmit {
  xLgr: string
  nro: number
  xBairro: string
  cMun: number
  xMun: string
  UF: string
  CEP: number
  cPais: number
  xPais: string
  fone: number
}

interface Dest {
  CNPJ: number
  xNome: string
  enderDest: EnderDest
  indIEDest: number
  IE: number
  email: string
}

interface EnderDest {
  xLgr: string
  nro: number
  xBairro: string
  cMun: number
  xMun: string
  UF: string
  CEP: number
  cPais: number
  xPais: string
  fone: number
}

export interface Det {
  prod: Prod
  imposto: Imposto
}

interface Prod {
  cProd: number
  cEAN: any
  xProd: string
  NCM: number
  CFOP: number
  uCom: string
  qCom: number
  vUnCom: number
  vProd: number
  cEANTrib: any
  uTrib: string
  qTrib: number
  vUnTrib: number
  indTot: number
  CEST?: number
  indEscala?: string
}

interface Imposto {
  ICMS: Icms
  IPI: Ipi
  PIS: Pis
  COFINS: Cofins
}

interface Icms {
  ICMS00: Icms00
}

interface Icms00 {
  orig: number
  CST: number
  modBC: number
  vBC: number
  pICMS: number
  vICMS: number
}

interface Ipi {
  cEnq: number
  IPINT?: Ipint
  IPITrib?: Ipitrib
}

interface Ipint {
  CST: number
}

interface Ipitrib {
  CST: number
  vBC: number
  pIPI: number
  vIPI: number
}

interface Pis {
  PISAliq: Pisaliq
}

interface Pisaliq {
  CST: number
  vBC: number
  pPIS: number
  vPIS: number
}

interface Cofins {
  COFINSAliq: Cofinsaliq
}

interface Cofinsaliq {
  CST: number
  vBC: number
  pCOFINS: number
  vCOFINS: number
}

interface Total {
  ICMSTot: Icmstot
}

interface Icmstot {
  vBC: number
  vICMS: number
  vICMSDeson: number
  vFCP: number
  vBCST: number
  vST: number
  vFCPST: number
  vFCPSTRet: number
  vProd: number
  vFrete: number
  vSeg: number
  vDesc: number
  vII: number
  vIPI: number
  vIPIDevol: number
  vPIS: number
  vCOFINS: number
  vOutro: number
  vNF: number
}

interface Transp {
  modFrete: 0 | 1 | 2 | 3 | 4 | 9
  transporta: Transporta
  vol: Vol
}

interface Transporta {
  CNPJ: number
  xNome: string
  IE: number
  xEnder: string
  xMun: string
  UF: string
}

interface Vol {
  qVol: number
  pesoL: number
  pesoB: number
}

interface Cobr {
  fat: Fat
  dup: Dup
}

interface Fat {
  nFat: string
  vOrig: number
  vDesc: number
  vLiq: number
}

interface Dup {
  nDup: number
  dVenc: string
  vDup: number
}

interface Pag {
  detPag: DetPag
}

interface DetPag {
  indPag: number
  tPag: number
  vPag: number
}

interface InfAdic {
  infCpl: string
}

interface Signature {
  SignedInfo: SignedInfo
  SignatureValue: string
  KeyInfo: KeyInfo
}

interface SignedInfo {
  CanonicalizationMethod: string
  SignatureMethod: string
  Reference: Reference
}

interface Reference {
  Transforms: Transforms
  DigestMethod: string
  DigestValue: string
}

interface Transforms {
  Transform: string[]
}

interface KeyInfo {
  X509Data: X509Data
}

interface X509Data {
  X509Certificate: string
}

interface ProtNfe {
  infProt: InfProt
}

interface InfProt {
  tpAmb: number
  verAplic: string
  chNFe: number
  dhRecbto: string
  nProt: number
  digVal: string
  cStat: number
  xMotivo: string
}
