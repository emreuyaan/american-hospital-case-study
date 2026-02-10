import { UserManagementPage } from './features/users/UserManagementPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <UserManagementPage />
      </div>
    </div>
  )
}

export default App
