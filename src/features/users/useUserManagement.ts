import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import {
  fetchUsers,
  addUser,
  editUser,
  removeUser,
  selectAllUsers,
  setSearchQuery,
  setRoleFilter,
  setCurrentPage,
  setPageSize,
  clearToast,
} from './usersSlice'
import type { Role, User, UserFormData } from './types'

export function useUserManagement() {
  const dispatch = useAppDispatch()
  const allUsers = useAppSelector(selectAllUsers)
  const { status, searchQuery, roleFilter, currentPage, pageSize, toast } =
    useAppSelector((s) => s.users)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  const filteredUsers = useMemo(() => {
    let result = allUsers
    if (roleFilter !== 'All') {
      result = result.filter((u) => u.role === roleFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((u) => u.name.toLowerCase().includes(q))
    }
    return result
  }, [allUsers, roleFilter, searchQuery])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredUsers.length / pageSize)),
    [filteredUsers.length, pageSize]
  )

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredUsers.slice(start, start + pageSize)
  }, [filteredUsers, currentPage, pageSize])

  const handleSearch = useCallback(
    (q: string) => dispatch(setSearchQuery(q)),
    [dispatch]
  )

  const handleRoleFilter = useCallback(
    (role: Role | 'All') => dispatch(setRoleFilter(role)),
    [dispatch]
  )

  const handlePageChange = useCallback(
    (page: number) => dispatch(setCurrentPage(page)),
    [dispatch]
  )

  const handlePageSizeChange = useCallback(
    (size: number) => dispatch(setPageSize(size)),
    [dispatch]
  )

  const openAddModal = useCallback(() => {
    setEditingUser(null)
    setModalOpen(true)
  }, [])

  const openEditModal = useCallback((user: User) => {
    setEditingUser(user)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    setEditingUser(null)
  }, [])

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      setSubmitting(true)
      try {
        if (editingUser) {
          await dispatch(editUser({ id: editingUser.id, data })).unwrap()
        } else {
          await dispatch(addUser(data)).unwrap()
        }
        closeModal()
      } catch {
        // Toast zaten slice tarafından yönetiliyor
      } finally {
        setSubmitting(false)
      }
    },
    [dispatch, editingUser, closeModal]
  )

  const handleDelete = useCallback(async () => {
    if (!deletingUser) return
    setSubmitting(true)
    try {
      await dispatch(removeUser(deletingUser.id)).unwrap()
      setDeletingUser(null)
    } catch {
      // Toast slice tarafından yönetiliyor
    } finally {
      setSubmitting(false)
    }
  }, [dispatch, deletingUser])

  const handleClearToast = useCallback(() => {
    dispatch(clearToast())
  }, [dispatch])

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    status,
    searchQuery,
    roleFilter,
    currentPage,
    pageSize,
    totalPages,
    toast,
    modalOpen,
    editingUser,
    deletingUser,
    submitting,
    handleSearch,
    handleRoleFilter,
    handlePageChange,
    handlePageSizeChange,
    openAddModal,
    openEditModal,
    closeModal,
    handleSubmit,
    setDeletingUser,
    handleDelete,
    handleClearToast,
  }
}
