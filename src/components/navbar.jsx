import { useRef } from 'react';

export default function Navbar({ onSearch }) {
  const searchRef = useRef('');

  function handleChange(e) {
    searchRef.current = e.target.value
    onSearch(searchRef.current);
  }

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <span className="text-blue-600 font-bold text-2xl tracking-tight shrink-0">
          TwiGram
        </span>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Cari user..."
          onChange={handleChange}
          className="w-full max-w-70 bg-gray-200 text-md text-gray-800 placeholder-gray-400 rounded-full px-6 py-2 outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
      </div>
    </nav>
  )
};