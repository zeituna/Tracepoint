import { useAuthContext } from '../contexts'

export const usePermissions = () => {
  const { user } = useAuthContext()

  const hasPermission = (requiredRole) => {
    if (!user) return false
    
    const userRole = user.role || 'user'
    
    const roleHierarchy = {
      admin: ['admin', 'moderator', 'user'],
      moderator: ['moderator', 'user'],
      user: ['user'],
    }

    return roleHierarchy[requiredRole]?.includes(userRole) || false
  }

  const isAdmin = () => hasPermission('admin')
  const isModerator = () => hasPermission('moderator')
  const isUser = () => hasPermission('user')

  return {
    hasPermission,
    isAdmin,
    isModerator,
    isUser,
    user,
  }
}
