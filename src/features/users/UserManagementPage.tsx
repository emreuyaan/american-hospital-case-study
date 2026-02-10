import { useUserManagement } from './useUserManagement'
import { UserTable } from './UserTable'
import { UserFormModal } from './UserFormModal'
import { SearchAndFilter } from './SearchAndFilter'
import { Button } from '../../components/ui/Button'
import { Pagination } from '../../components/ui/Pagination'
import { Skeleton } from '../../components/ui/Skeleton'
import { EmptyState } from '../../components/ui/EmptyState'
import { Toast } from '../../components/ui/Toast'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'

export function UserManagementPage() {
  const {
    users,
    totalUsers,
    status,
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
  } = useUserManagement()

  return (
    <main className="w-full py-4">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {totalUsers} kullanıcı kayıtlı
          </p>
        </div>
        <Button onClick={openAddModal} aria-label="Yeni kullanıcı ekle">
          + Yeni Kullanıcı
        </Button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end flex-1">
              <SearchAndFilter
                onSearch={handleSearch}
                roleFilter={roleFilter}
                onRoleFilter={handleRoleFilter}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="page-size" className="text-xs text-gray-500 whitespace-nowrap">
                Göster:
              </label>
              <select
                id="page-size"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {status === 'loading' ? (
            <Skeleton rows={pageSize} />
          ) : users.length === 0 ? (
            <div className="px-5 py-8">
              <EmptyState />
            </div>
          ) : (
            <UserTable
              users={users}
              onEdit={openEditModal}
              onDelete={setDeletingUser}
            />
          )}
        </div>

        {totalPages > 1 && (
          <div className="border-t border-gray-200 px-5 py-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <UserFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        user={editingUser}
        loading={submitting}
      />

      <ConfirmDialog
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        title="Kullanıcıyı Sil"
        message={`"${deletingUser?.name}" adlı kullanıcıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        loading={submitting}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleClearToast}
        />
      )}
    </main>
  )
}
