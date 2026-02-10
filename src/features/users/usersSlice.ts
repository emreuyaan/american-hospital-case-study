import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, Role, UserFormData } from './types'
import * as api from '../../api/mockApi'
import type { RootState } from '../../store'

const usersAdapter = createEntityAdapter<User>()

interface UsersExtraState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  searchQuery: string
  roleFilter: Role | 'All'
  currentPage: number
  pageSize: number
  toast: { message: string; type: 'success' | 'error' } | null
}

const initialState = usersAdapter.getInitialState<UsersExtraState>({
  status: 'idle',
  error: null,
  searchQuery: '',
  roleFilter: 'All',
  currentPage: 1,
  pageSize: 5,
  toast: null,
})

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  return await api.fetchUsers()
})

export const addUser = createAsyncThunk(
  'users/add',
  async (data: UserFormData) => {
    return await api.createUser(data)
  }
)

export const editUser = createAsyncThunk(
  'users/edit',
  async ({ id, data }: { id: string; data: Partial<UserFormData> }) => {
    return await api.updateUser(id, data)
  }
)

export const removeUser = createAsyncThunk(
  'users/remove',
  async (id: string) => {
    return await api.deleteUser(id)
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setRoleFilter(state, action: PayloadAction<Role | 'All'>) {
      state.roleFilter = action.payload
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    clearToast(state) {
      state.toast = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        usersAdapter.setAll(state, action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Kullanıcılar yüklenemedi.'
      })
      .addCase(addUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload)
        state.toast = { message: 'Kullanıcı başarıyla eklendi.', type: 'success' }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.toast = {
          message: action.error.message ?? 'Kullanıcı eklenemedi.',
          type: 'error',
        }
      })
      .addCase(editUser.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload)
        state.toast = { message: 'Kullanıcı başarıyla güncellendi.', type: 'success' }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.toast = {
          message: action.error.message ?? 'Kullanıcı güncellenemedi.',
          type: 'error',
        }
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload)
        state.toast = { message: 'Kullanıcı başarıyla silindi.', type: 'success' }
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.toast = {
          message: action.error.message ?? 'Kullanıcı silinemedi.',
          type: 'error',
        }
      })
  },
})

export const {
  setSearchQuery,
  setRoleFilter,
  setCurrentPage,
  setPageSize,
  clearToast,
} = usersSlice.actions

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users)

export default usersSlice.reducer
