import {PermissionInterface} from "./permission.interface";

export interface RoleInterface {
  id: number
  nombre: string
  permissions: PermissionInterface[]
}
