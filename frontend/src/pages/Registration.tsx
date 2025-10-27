import { useState } from "react";
import type { User, RegisterRequest } from "../interfaces/UserInterface";


interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUser: RegisterRequest) => void;
}

const Registration: React.FC<CreateUserProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    city: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: RegisterRequest = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      city: formData.city,
    };
    onSave(newUser);
    onClose();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium text-gray-700 text-left">Role</label>
          <select
            name="role"
            className="w-full border rounded px-3 py-2 bg-white"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">
            City
          </label>
          <input
            type="text"
            name="city"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default Registration;
