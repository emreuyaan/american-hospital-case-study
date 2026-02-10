export type Role = 'Admin' | 'Doctor' | 'Patient'

export type Permission = 'read' | 'write' | 'delete'

export interface User {
  id: string
  name: string
  role: Role
  permissions: Permission[]
  createdAt: string
}

export interface UserFormData {
  name: string
  role: Role
  permissions: Permission[]
}

export const ROLES: Role[] = ['Admin', 'Doctor', 'Patient']
export const PERMISSIONS: Permission[] = ['read', 'write', 'delete']
