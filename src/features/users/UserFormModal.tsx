import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import type { User, UserFormData, Role, Permission } from './types'
import { ROLES, PERMISSIONS } from './types'

const schema = z.object({
  name: z
    .string()
    .min(1, 'İsim boş bırakılamaz.')
    .min(2, 'İsim en az 2 karakter olmalı.'),
  role: z.enum(['Admin', 'Doctor', 'Patient'] as const),
  permissions: z
    .array(z.enum(['read', 'write', 'delete'] as const))
    .min(1, 'En az bir izin seçilmeli.'),
})

interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: UserFormData) => void
  user: User | null
  loading?: boolean
}

const ROLE_LABELS: Record<Role, string> = {
  Admin: 'Yönetici',
  Doctor: 'Doktor',
  Patient: 'Hasta',
}

const PERMISSION_LABELS: Record<Permission, string> = {
  read: 'Okuma',
  write: 'Yazma',
  delete: 'Silme',
}

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  user,
  loading = false,
}: UserFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      role: 'Patient',
      permissions: ['read'],
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset(
        user
          ? { name: user.name, role: user.role, permissions: user.permissions }
          : { name: '', role: 'Patient', permissions: ['read'] }
      )
    }
  }, [isOpen, user, reset])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="İsim"
          placeholder="Kullanıcı adı"
          error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Rol</label>
              <Listbox value={field.value} onChange={field.onChange}>
                <div className="relative">
                  <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    {ROLE_LABELS[field.value]}
                  </ListboxButton>
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
                    {ROLES.map((role) => (
                      <ListboxOption
                        key={role}
                        value={role}
                        className="cursor-pointer select-none px-3 py-2 text-gray-700 data-[focus]:bg-blue-50 data-[selected]:font-medium data-[selected]:text-blue-700"
                      >
                        {ROLE_LABELS[role]}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          )}
        />

        <Controller
          control={control}
          name="permissions"
          render={({ field, fieldState }) => (
            <fieldset className="flex flex-col gap-1.5">
              <legend className="text-sm font-medium text-gray-700">
                İzinler
              </legend>
              <div className="flex gap-3">
                {PERMISSIONS.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={field.value.includes(perm)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...field.value, perm]
                          : field.value.filter((p) => p !== perm)
                        field.onChange(next)
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {PERMISSION_LABELS[perm]}
                  </label>
                ))}
              </div>
              {fieldState.error && (
                <p className="text-xs text-red-600" role="alert">
                  {fieldState.error.message}
                </p>
              )}
            </fieldset>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
            İptal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Kaydediliyor...' : user ? 'Güncelle' : 'Ekle'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
