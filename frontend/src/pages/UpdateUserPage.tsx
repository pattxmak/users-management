import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UpdateUser from '../pages/UpdateUser';
import UserService from '../services/UserService';
import type { User } from '../interfaces/UserInterface';

const UpdateUserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;
    UserService.getUserById(Number(userId)).then(setUser);
  }, [userId]);

  const handleSave = (updatedUser: User) => {
    navigate('/admin/user-management');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <UpdateUser
      isOpen={true}
      onClose={() => navigate('/admin/user-management')}
      user={user}
      onSave={handleSave}
    />
  );
};

export default UpdateUserPage;
