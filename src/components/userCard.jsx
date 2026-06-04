import { useUserContext } from '../context/UserContext';

export default function UserCard({ user }) {
  const { likedUsers, followedUsers, toggleLike, toggleFollow } = useUserContext();

  const isLiked = likedUsers.includes(user.id);
  const isFollowed = followedUsers.includes(user.id);

  // Ambil inisial dari nama untuk avatar
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col gap-4 hover:shadow-sm transition-shadow">
      {/* Header: avatar + nama + username */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-base shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 truncate">{user.name}</p>
          <p className="text-sm text-gray-400">@{user.username}</p>
        </div>
      </div>

      {/* Email */}
      <p className="text-sm text-gray-500 truncate">{user.email}</p>

      {/* Tombol Like dan Follow */}
      <div className="flex gap-2 pt-1">
        {/* Tombol Like */}
        <button
          onClick={() => toggleLike(user.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
            isLiked
              ? 'bg-red-50 border-red-300 text-red-500'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-400'
          }`}
        >
          {isLiked ? '❤️' : '🤍'} {isLiked ? 'Liked' : 'Like'}
        </button>

        {/* Tombol Follow */}
        <button
          onClick={() => toggleFollow(user.id)}
          className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
            isFollowed
              ? 'bg-blue-50 border-blue-300 text-blue-600'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500'
          }`}
        >
          {isFollowed ? '✓ Following' : '+ Follow'}
        </button>
      </div>
    </div>
  )
};