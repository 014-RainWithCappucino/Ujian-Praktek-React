# TwiGram — Dokumentasi Proyek
 
Proyek ini merupakan website sosial media sederhana berbasis **React + Vite** yang menampilkan data pengguna dari API publik. Pengguna dapat mencari, menyukai, dan mengikuti user yang tersedia.
 
---
 
## Struktur Proyek
 
```
src/
├── App.jsx                  
├── main.jsx                 
├── index.css                
├── components/
│   ├── navbar.jsx         
│   ├── userCard.jsx        
│   └── footer.jsx          
└── context/
    └── UserContext.jsx    
```
 
---

## Penjelasan Komponen
 
### `navbar.jsx`
Komponen navigasi yang tampil di bagian atas halaman. Berisi logo dan input pencarian untuk memfilter user berdasarkan nama atau username. Komponen ini menggunakan `useRef` untuk membaca nilai input.
 
### `userCard.jsx`
Komponen kartu yang menampilkan informasi singkat setiap user: inisial avatar, nama, username, dan email. Dilengkapi dua tombol interaktif yaitu **Like** dan **Follow**. Komponen ini dapat dipanggil berulang dengan data `user` yang berbeda berdasarkan `user.id`.
 
### `footer.jsx`
Komponen statis di bagian bawah halaman. Menampilkan teks hak cipta dan sumber data dari JSONPlaceholder.
 
### `UserContext.jsx`
Menyediakan state global `likedUsers` dan `followedUsers` beserta fungsi `toggleLike` dan `toggleFollow` yang bisa diakses oleh seluruh komponen tanpa *prop drilling*.
 
---

## Penjelasan Fetch API
 
Data pengguna diambil dari `https://jsonplaceholder.typicode.com/users` menggunakan `fetch()` yang dibungkus dalam `useEffect`. *Dependency array* kosong `[]` memastikan proses ini hanya berjalan sekali saat komponen pertama kali di-render, sehingga tidak ada pemanggilan API berulang ketika terjadi perubahan state.

---
 
## Implementasi React Hook
 
### `useState`
 
Digunakan di `App.jsx` untuk menyimpan state utama aplikasi, dan di `UserContext.jsx` untuk menyimpan daftar user yang di-like dan di-follow.
 
```js
// App.jsx
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
const [searchQuery, setSearchQuery] = useState('')
const [error, setError] = useState(null)
```

```js
// UserContext.jsx
const [likedUsers, setLikedUsers] = useState([])
const [followedUsers, setFollowedUsers] = useState([])
```
 
### `useEffect`
 
Digunakan di `App.jsx` untuk menjalankan fetch API ketika komponen pertama kali dirender.
 
```js
useEffect(() => {
  async function PengambilanAPI() {
    try {
      const getAPI = await fetch('https://jsonplaceholder.typicode.com/users')
 
      if (!getAPI.ok) {
        throw new Error("gagal mengambil API")
      }
 
      const data = await getAPI.json()
      setUsers(data)
 
    } catch(err) {
      console.error(err)
      setError('Gagal mengambil data. Coba lagi nanti.')
    } finally {
      setLoading(false)
    }
  }
 
  PengambilanAPI()
}, [])
```
 
### `useContext`
 
Dibuat di UserContext.jsx menggunakan createContext(), lalu dipakai di userCard.jsx lewat custom hook useUserContext(). Sehingga state like & follow bisa langsung diakses oleh komponen UserCard tanpa perlu diteruskan satu per satu lewat props (prop drilling).
 
```js
// UserContext.jsx — membuat context
const UserContext = createContext()
 
export function useUserContext()     {
  return useContext(UserContext)
}
```

```js
// userCard.jsx — mengakses context
const { likedUsers, followedUsers, toggleLike, toggleFollow } = useUserContext()
```
 
### `useRef`
 
Digunakan di `navbar.jsx` untuk menyimpan nilai input pencarian. Perubahan nilai di `useRef` tidak memicu *re-render* pada komponen Navbar, sehingga lebih efisien dibanding mengunakan `useState`.
 
```js
const searchRef = useRef('')
 
function handleChange(e) {
  searchRef.current = e.target.value
  onSearch(searchRef.current)
}
```