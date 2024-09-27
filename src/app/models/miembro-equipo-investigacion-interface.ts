import {EquipoInvestigacionInterface} from "./equipo-investigacion-interface";

export interface MiembroEquipoInvestigacionInterface extends EquipoInvestigacionInterface{
  puestoMiembroEquipoId?:number
  puestoMiembroEquipoNombre?:string
}
