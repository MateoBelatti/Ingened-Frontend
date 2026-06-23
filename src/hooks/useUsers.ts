import { useState, useEffect, useCallback } from 'react';
import { userService } from '../service/user.service';
import type { User } from '../types/user.types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getUserById = useCallback((id: number): User | undefined => {
    return users.find((user) => user.id === id);
  }, [users]);

  return {
    users,
    getUserById,
    loading,
    error,
    setUsers, 
  };
};
