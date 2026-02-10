import { memo, useCallback, useMemo } from 'react'
import { Table } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import type { User, Role } from './types'
import { formatDate } from '../../utils/formatDate'

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

const roleBadgeVariant: Record<Role, 'admin' | 'doctor' | 'patient'> = {
  Admin: 'admin',
  Doctor: 'doctor',
  Patient: 'patient',
}

const ROLE_LABELS: Record<Role, string> = {
  Admin: 'Yönetici',
  Doctor: 'Doktor',
  Patient: 'Hasta',
}

const PERMISSION_LABELS: Record<string, string> = {
  read: 'Okuma',
  write: 'Yazma',
  delete: 'Silme',
}

function UserTableInner({ users, onEdit, onDelete }: UserTableProps) {
  const keyExtractor = useCallback((user: User) => user.id, [])

  const columns = useMemo(
    () => [
      {
        key: 'name',
        header: 'İsim',
        render: (user: User) => (
          <span className="font-medium text-gray-900">{user.name}</span>
        ),
      },
      {
        key: 'role',
        header: 'Rol',
        render: (user: User) => (
          <Badge variant={roleBadgeVariant[user.role]}>
            {ROLE_LABELS[user.role]}
          </Badge>
        ),
      },
      {
        key: 'permissions',
        header: 'İzinler',
        render: (user: User) => (
          <div className="flex flex-wrap gap-1">
            {user.permissions.map((p) => (
              <Badge key={p} variant="permission">
                {PERMISSION_LABELS[p] ?? p}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        key: 'createdAt',
        header: 'Oluşturulma',
        render: (user: User) => formatDate(user.createdAt),
      },
      {
        key: 'actions',
        header: '',
        render: (user: User) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => onEdit(user)}
              aria-label={`${user.name} düzenle`}
            >
              Düzenle
            </Button>
            <Button
              variant="ghost"
              onClick={() => onDelete(user)}
              aria-label={`${user.name} sil`}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Sil
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  )

  return <Table columns={columns} data={users} keyExtractor={keyExtractor} />
}

export const UserTable = memo(UserTableInner)
