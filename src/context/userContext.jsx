import { createContext, useContext, useState } from 'react';
 
const UserContext = createContext();
 
// Provider component
export function UserProvider({ children }) {
  const [likedUsers, setLikedUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
 
  function toggleLike(userId) {
    setLikedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  };
 
  function toggleFollow(userId) {
    setFollowedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  };
 
  return (
    <UserContext.Provider value={{ likedUsers, followedUsers, toggleLike, toggleFollow }}>
      {children}
    </UserContext.Provider>
  )
};
 
export function useUserContext() {
  return useContext(UserContext)
};