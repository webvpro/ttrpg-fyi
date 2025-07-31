// composables/useUser.ts
// Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export const useUser = () => {
  const normalizeUser = (userData: any): User | null => {
    if (!userData) return null;
    
    // Handle both $id and id formats
    const id = userData.id || userData.$id;
    if (!id) return null;
    
    return {
      id,
      name: userData.name || '',
      email: userData.email || '',
      avatar: userData.avatar || userData.profilePicture || undefined
    };
  };
  
  return { normalizeUser };
};