"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  phoneNumber: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  profilePicture: string | null;
  status: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setUsers([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/fetchUserSearch?query=${encodeURIComponent(searchQuery)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users || []);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setError("An error occurred while searching");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchUserSearch(query);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black-100 p-4 w-full">
      {/* Search Bar at Top */}
      <div className="w-full flex justify-center">
        <div className="w-3/4 mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Search by phone number"
            className="w-full py-3 px-2 text-white bg-[#202C33] border rounded-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <div className="mt-4 text-white">Searching...</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}

      {/* Result Section */}
      <div className="mt-8 w-full max-w-md">
        {users.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  {user.profilePicture && (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {user.phoneNumber}
                      </span>
                    </div>
                    {user.email && (
                      <p className="text-sm text-gray-500">{user.email}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">{user.status}</p>
                    {user.bio && (
                      <p className="text-sm text-gray-500 mt-1">{user.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          query && (
            <div className="mt-4 text-white text-center">
              No users found matching your search
            </div>
          )
        )}
      </div>
    </div>
  );
}
