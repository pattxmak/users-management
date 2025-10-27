import { useEffect, useState } from "react";
import type { User } from "../interfaces/UserInterface";
import UserService from "../services/UserService";

interface UpdateUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [city, setCity] = useState(user?.city || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCity(user.city);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = async () => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name,
      email,
      city,
    };

    try {
      await UserService.updateUser(user.id, updatedUser);
      onSave(updatedUser); // ส่งกลับ parent
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-900 bg-opacity-60 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm">
        <div className="relative flex flex-col bg-white">
          {/* Header */}
          <div className="relative m-2.5 flex justify-center items-center text-white h-24 rounded-md bg-gray-900">
            <h3 className="text-2xl">Update User</h3>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 p-6">
            <div>
              <label className="block mb-2 text-sm text-slate-600">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
              />
            </div>
            {/* <div>
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
              />
            </div> */}
            <div>
              <label className="block mb-2 text-sm text-slate-600">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 flex flex-col gap-2">
            <button
              onClick={handleSave}
              className="w-full rounded-md bg-gray-900 py-2 px-4 text-sm text-white"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-slate-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
