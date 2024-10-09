export interface FormatoDigiDosInterface {
  id?:number
  formatoDIGIUnoTitulo?:string
  formatoDIGIUnoConvocatoriaId?:number
  formatoDIGIUnoConvocatoriaNombre?:string
  formatoDIGIUnoConvocatoriaAno?:number
  formatoDIGIUnoTipoInvestigacionNombre?:string
  estadoId?:number
  estadoNombre?:number
  fechaCreacion?:Date
  fechaModificacion?:Date
  resumen?:string
  tecnicas?:string
  procesamientoAnalisis?:string
  aspectosEticos?:string
  vinculacionActoresOtrasInstituciones?:string
  proteccionIntelectual?:string
  contribucionPropuesta?:string

  palabraUno?:string
  palabraDos?:string
  palabraTres?:string
  palabraCuatro?:string
  palabraCinco?:string
  introduccion?:string
  contexto?:string
  revisionLiteratura?:string
  planteamientoProblema?:string
  objetivoGeneral?:string

  siAplicaHipotesis?:string
  hipotesisDescripcion?:string

  enfoqueId?:number
  alcanceId?:number
  alcanceDescripcion?:string

  enfoqueDisenoId?:number
  enfoqueOpcionId?:number
  enfoqueOpcionNivelDosId?:number
  enfoqueOpcionNivelTresId?:number
  cuantitativoExperimentalDescripcion?:string
  cualitativoDescripcion?:string
  mixtoExperimentalDescripcion?:string
  mixtoCualitativoDescripcion?:string

  tipoMuestraId?:number;
  tecnicaMuestraId?:number;
  muestraDescripcion?:string;
  noProbabilisticoDescripcion?:string;
  muestraPoblacion?:number
  muestraNivelConfianza?:number
  muestraMargenError?:number
  muestraMinima?:number
}
