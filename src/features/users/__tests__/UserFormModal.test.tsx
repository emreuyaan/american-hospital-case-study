import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserFormModal } from '../UserFormModal'
import type { User } from '../types'

describe('UserFormModal', () => {
  const onClose = vi.fn()
  const onSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('yeni kullanıcı modunda "Yeni Kullanıcı" başlığını gösterir', () => {
    render(
      <UserFormModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        user={null}
      />
    )

    expect(screen.getByText('Yeni Kullanıcı')).toBeInTheDocument()
  })

  it('düzenleme modunda kullanıcı bilgilerini doldurur', () => {
    const user: User = {
      id: '1',
      name: 'Test User',
      role: 'Doctor',
      permissions: ['read', 'write'],
      createdAt: '2024-01-01T00:00:00Z',
    }

    render(
      <UserFormModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        user={user}
      />
    )

    expect(screen.getByText('Kullanıcıyı Düzenle')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
  })

  it('boş isim ile gönderildiğinde hata mesajı gösterir', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        user={null}
      />
    )

    const submitBtn = screen.getByText('Ekle')
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('iptal butonuna tıklandığında onClose çağrılır', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        user={null}
      />
    )

    await user.click(screen.getByText('İptal'))
    expect(onClose).toHaveBeenCalled()
  })

  it('geçerli form gönderildiğinde onSubmit çağrılır', async () => {
    const user = userEvent.setup()
    render(
      <UserFormModal
        isOpen={true}
        onClose={onClose}
        onSubmit={onSubmit}
        user={null}
      />
    )

    const nameInput = screen.getByPlaceholderText('Kullanıcı adı')
    await user.clear(nameInput)
    await user.type(nameInput, 'Yeni Kullanıcı')

    await user.click(screen.getByText('Ekle'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    const callArg = onSubmit.mock.calls[0][0]
    expect(callArg.name).toBe('Yeni Kullanıcı')
    expect(callArg.role).toBe('Patient')
    expect(callArg.permissions).toContain('read')
  })
})
