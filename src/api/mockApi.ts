import type { User, UserFormData } from '../features/users/types'

const SEED_USERS: User[] = [
  { id: '1', name: 'Ahmet Yılmaz', role: 'Admin', permissions: ['read', 'write', 'delete'], createdAt: '2024-01-15T09:00:00Z' },
  { id: '2', name: 'Elif Demir', role: 'Doctor', permissions: ['read', 'write'], createdAt: '2024-02-20T14:30:00Z' },
  { id: '3', name: 'Mehmet Kaya', role: 'Patient', permissions: ['read'], createdAt: '2024-03-10T08:15:00Z' },
  { id: '4', name: 'Zeynep Arslan', role: 'Doctor', permissions: ['read', 'write'], createdAt: '2024-03-22T11:45:00Z' },
  { id: '5', name: 'Can Öztürk', role: 'Patient', permissions: ['read'], createdAt: '2024-04-05T16:00:00Z' },
  { id: '6', name: 'Ayşe Çelik', role: 'Admin', permissions: ['read', 'write', 'delete'], createdAt: '2024-04-18T10:20:00Z' },
  { id: '7', name: 'Burak Şahin', role: 'Doctor', permissions: ['read', 'write'], createdAt: '2024-05-01T13:00:00Z' },
  { id: '8', name: 'Selin Koç', role: 'Patient', permissions: ['read'], createdAt: '2024-05-14T09:30:00Z' },
  { id: '9', name: 'Emre Aydın', role: 'Doctor', permissions: ['read', 'write', 'delete'], createdAt: '2024-06-02T15:45:00Z' },
  { id: '10', name: 'Deniz Yıldız', role: 'Patient', permissions: ['read'], createdAt: '2024-06-20T08:00:00Z' },
  { id: '11', name: 'Fatma Kurt', role: 'Admin', permissions: ['read', 'write', 'delete'], createdAt: '2024-07-08T12:10:00Z' },
  { id: '12', name: 'Oğuz Çetin', role: 'Doctor', permissions: ['read', 'write'], createdAt: '2024-07-25T14:00:00Z' },
  { id: '13', name: 'Merve Aksoy', role: 'Patient', permissions: ['read'], createdAt: '2024-08-11T10:30:00Z' },
  { id: '14', name: 'Kerem Polat', role: 'Doctor', permissions: ['read', 'write'], createdAt: '2024-08-29T16:20:00Z' },
  { id: '15', name: 'İrem Güneş', role: 'Patient', permissions: ['read'], createdAt: '2024-09-15T09:00:00Z' },
]

let users = [...SEED_USERS]
let nextId = 16

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 800))
}

export async function fetchUsers(): Promise<User[]> {
  return delay([...users])
}

export async function createUser(data: UserFormData): Promise<User> {
  const duplicate = users.find(
    (u) => u.name.toLowerCase() === data.name.toLowerCase()
  )
  if (duplicate) {
    throw new Error('Bu isimde bir kullanıcı zaten mevcut.')
  }

  const newUser: User = {
    id: String(nextId++),
    name: data.name,
    role: data.role,
    permissions: data.permissions,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  return delay(newUser)
}

export async function updateUser(
  id: string,
  data: Partial<UserFormData>
): Promise<User> {
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('Kullanıcı bulunamadı.')

  if (data.name) {
    const duplicate = users.find(
      (u) => u.id !== id && u.name.toLowerCase() === data.name!.toLowerCase()
    )
    if (duplicate) {
      throw new Error('Bu isimde bir kullanıcı zaten mevcut.')
    }
  }

  users[index] = { ...users[index], ...data }
  return delay(users[index])
}

export async function deleteUser(id: string): Promise<string> {
  const index = users.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('Kullanıcı bulunamadı.')
  users.splice(index, 1)
  return delay(id)
}
