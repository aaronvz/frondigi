export interface FormatoDigiDosInterface {
  id?:number
  formatoDIGIUnoTitulo?:string
  formatoDIGIUnoConvocatoriaId?:number
  formatoDIGIUnoConvocatoriaNombre?:string
  formatoDIGIUnoConvocatoriaAno?:number
  estadoId?:number
  estadoNombre?:number
  fechaCreacion?:Date
  fechaModificacion?:Date
  resumen?:string

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
}
