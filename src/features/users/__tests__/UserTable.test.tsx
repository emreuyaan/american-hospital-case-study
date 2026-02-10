import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserTable } from '../UserTable'
import type { User } from '../types'

vi.mock('../../../utils/formatDate', () => ({
  formatDate: (iso: string) => iso.split('T')[0],
}))

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Ali Veli',
    role: 'Admin',
    permissions: ['read', 'write', 'delete'],
    createdAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    name: 'Ayşe Fatma',
    role: 'Doctor',
    permissions: ['read', 'write'],
    createdAt: '2024-03-20T14:30:00Z',
  },
]

describe('UserTable', () => {
  const onEdit = vi.fn()
  const onDelete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('tüm kullanıcıları tablo satırlarında gösterir', () => {
    render(<UserTable users={MOCK_USERS} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText('Ali Veli')).toBeInTheDocument()
    expect(screen.getByText('Ayşe Fatma')).toBeInTheDocument()
  })

  it('rol badge\'lerini doğru gösterir', () => {
    render(<UserTable users={MOCK_USERS} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText('Yönetici')).toBeInTheDocument()
    expect(screen.getByText('Doktor')).toBeInTheDocument()
  })

  it('düzenle butonuna tıklandığında onEdit çağrılır', async () => {
    const user = userEvent.setup()
    render(<UserTable users={MOCK_USERS} onEdit={onEdit} onDelete={onDelete} />)

    const editButtons = screen.getAllByText('Düzenle')
    await user.click(editButtons[0])

    expect(onEdit).toHaveBeenCalledWith(MOCK_USERS[0])
  })

  it('sil butonuna tıklandığında onDelete çağrılır', async () => {
    const user = userEvent.setup()
    render(<UserTable users={MOCK_USERS} onEdit={onEdit} onDelete={onDelete} />)

    const deleteButtons = screen.getAllByText('Sil')
    await user.click(deleteButtons[1])

    expect(onDelete).toHaveBeenCalledWith(MOCK_USERS[1])
  })

  it('izin badge\'lerini gösterir', () => {
    render(<UserTable users={MOCK_USERS} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getAllByText('Okuma')).toHaveLength(2)
    expect(screen.getAllByText('Yazma')).toHaveLength(2)
    expect(screen.getAllByText('Silme')).toHaveLength(1)
  })
})
