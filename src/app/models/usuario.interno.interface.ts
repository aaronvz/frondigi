import {RoleInterface} from "./role.interface";

export interface UsuarioInternoInterface {
  id?: number
  usuario?: string
  roleId?: number
  roleNombre?: string
  nombres?: string
  apellidos?: string
  nombreCompleto?: string
  telefono?: string
  activo?: boolean
}
