export interface FormatoDigiUnoInterface {
  id?:number
  titulo?:string
  convocatoriaId?:number
  convocatoriaNombre?:string
  convocatoriaAno?:number
  estadoId?:number
  estadoNombre?:string
  estadoColorTexto?:string
  estadoColorFondo?:string
  fechaCreacion?:Date
  fechaModificacion?:Date
  unidadAcademicaId?:number
  unidadInvestigacionId?:number
  fechaInicio?:Date
  fechaFin?:Date
  metaPrioridadNacionalDesarrolloId?:number
  ejeTematicoId?:number
  tipoInvestigacionId?:number
  areaConocimientoId?:number

  coordinadorId?:number
  coordinadorNombres?:string
  coordinadorApellidos?:string
  coordinadorOrcid?:string
  coordinadorGoogleAcademico?:string
  coordinadorEspecialidadExperiencia?:string
  coordinadorUnidadAcademicaId?:number
  coordinadorPlazaOcupaId?:number
  coordinadorEntidadesOtrasContratos?:string
  coordinadorHaCoordinadoInvestigacionesCofinanciadas?:boolean
  coordinadorActualmenteEjecutaInvestigacion?:boolean
  coordinadorHorasContratadas?:number
  coordinadorHorasSolicitadas?:number
  coordinadorHaParticipadoInvestigacionesCofinanciadas?:boolean
  coordinadorEstaEjecutandoInvestigacion?:boolean
}


