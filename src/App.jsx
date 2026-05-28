import { useState, useEffect } from 'react'
import { UserProvider } from './context/UserContext'
import Navbar from './components/navbar'
import UserCard from './components/UserCard'

 
export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
 
  // Fetch 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
 
  // Filter user
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )
 
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar*/}
        <Navbar onSearch={setSearchQuery} />
 
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
          {/* Loading state */}
          {loading && (
            <p className="text-center text-gray-400 mt-10">Memuat data...</p>
          )}
 
          {/* 404 */}
          {!loading && filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-10">User tidak ditemukan.</p>
          )}
 
          {/* Grid UserCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </main>
 
      </div>
    </UserProvider>
  )
}