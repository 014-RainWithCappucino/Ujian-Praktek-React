import { useState, useEffect } from 'react';
import { UserProvider } from './context/userContext';
import Navbar from './components/navbar';
import UserCard from './components/userCard';
import Footer from './components/footer';
 
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
 
  // Fetch 
 useEffect(() => {
  async function PengambilanAPI() {
    try {
      const getAPI = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!getAPI.ok) {
        throw new Error("gagal mengambil API");
      }

      const data = await getAPI.json();
      setUsers(data);

    } catch(err) {
      console.error(err);
      setError('Gagal mengambil data. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  PengambilanAPI();
}, [])
 
  // Filter user
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
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

          {!loading && error && (
            <p className="text-center text-red-400 mt-10">{error}</p>
          )}

           {/* 404 */}
          {!loading && !error && filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-10">User tidak ditemukan.</p>
          )}

          

          {/* Grid UserCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </main>
 
        {/* Footer */}
        <Footer />
      </div>
    </UserProvider>
  )
}