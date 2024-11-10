'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './store/auth';

export default function Home() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuthStore((state) => state.getIsAuthenticated()); // Avoid calling function in useEffect

  const { push } = useRouter();
  const [formData, setFormData] = useState({
    voter_id: '',
    name: '',
    dob: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Make the API call to login
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    });

    if (response.ok) {
      // Set authentication state upon successful login
      setIsAuthenticated(true);
      push('/vote');
    } else {
      const errorResponse = await response.json();
      setError(errorResponse.error || 'Login failed: Invalid credentials or server error.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center flex-grow bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="voterId" className="block text-sm font-medium text-gray-700">Voter ID</label>
              <input
                id="voterId"
                name="voter_id"
                type="text"
                required
                value={formData.voter_id}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
