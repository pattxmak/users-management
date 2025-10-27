import React, { useEffect, useState } from 'react';
import { EnvelopeIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import UserService from '../services/UserService';
import type { User } from '../interfaces/UserInterface';

const ProfileCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try {
        const data = await UserService.getYourProfile();
        setUserData(data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!userData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-3xl w-full">
        <ProfileCard className="p-8">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
          </div>

          <div className="space-y-6 text-gray-700">
            {/* Email */}
            <div className="flex items-center gap-3 border-b pb-3">
              <EnvelopeIcon className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 text-left">Email</p>
                <p>{userData.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 border-b pb-3">
              <ShieldCheckIcon className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 text-left">Role</p>
                <p>{userData.role}</p>
              </div>
            </div>

            {/* City */}
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-500 text-left">City</p>
                <p>{userData.city}</p>
              </div>
            </div>
          </div>
        </ProfileCard>
      </div>
    </div>
  );
};

export default Profile;
