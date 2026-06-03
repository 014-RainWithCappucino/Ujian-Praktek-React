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