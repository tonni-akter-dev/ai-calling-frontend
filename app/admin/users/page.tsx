/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Search, Eye, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  useGetAllUsersQuery,
  useGetMeQuery,
} from "@/app/redux/features/apis/userApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useRegisterMutation } from "@/app/redux/features/apis/auth-api";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const {
    data: currentUser,
    isLoading: isUserLoading,
    error: userError,
  } = useGetMeQuery({});

  // Get all users
  const {
    data: usersResponse,
    isLoading: isUsersLoading,
    error: usersError,
    refetch,
  } = useGetAllUsersQuery({});

  const users: any[] = Array.isArray(usersResponse)
    ? usersResponse
    : (usersResponse?.users ?? usersResponse?.data ?? []);

  // Use register mutation for creating users
  const [register, { isLoading: isCreating }] = useRegisterMutation();

  // Check if user is super_admin
  const isSuperAdmin = currentUser?.role === "super_admin";

  // Filter users based on search
  const filteredUsers = users?.filter(
    (user: { name: any; email: any; company_name: any }) =>
      `${user.name} ${user.email} ${user.company_name || ""}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.companyName
    ) {
      setFormError("All fields are required");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      // Using the register API to create a new user
      const result = await register({
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName,
        },
      }).unwrap();
      console.log(result);
      setSuccessMessage(`User "${formData.name}" created successfully!`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        companyName: "",
      });

      // Refresh user list after short delay
      setTimeout(() => {
        refetch();
        setIsModalOpen(false);
        setSuccessMessage("");
      }, 1500);
    } catch (err) {
      const error = err as { data?: { error?: string } };
      setFormError(error.data?.error || "Failed to create user");
    }
  };

  // Loading state
  if (isUserLoading || isUsersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (userError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p>
            Authentication error:{" "}
            {(userError as { data?: { error?: string } })?.data?.error ||
              "Please login again"}
          </p>
          <button
            onClick={() => {
              Cookies.remove("accessToken");
              router.push("/login");
            }}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <p>
            Error loading users:{" "}
            {(usersError as { data?: { error?: string } })?.data?.error ||
              "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage all registered customers and administrators.
          </p>
          {currentUser && (
            <p className="mt-1 text-xs text-slate-400">
              Logged in as: {currentUser.name} ({currentUser.role})
            </p>
          )}
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add New User
          </button>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or company..."
              className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                  User
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                  Company
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                  Role
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                  Subscription
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-bold uppercase text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-slate-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map(
                  (user: {
                    id: any;
                    name: any;
                    email: any;
                    company_name: any;
                    role: any;
                    subscription_status: any;
                  }) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.company_name || "N/A"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.role === "super_admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "admin"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.subscription_status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.subscription_status || "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-semibold text-emerald-600">
                          ● Active
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/subscriptions/${user.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Details
                        </Link>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-900">Add New User</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFormError("");
                  setSuccessMessage("");
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              {successMessage && (
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                  {successMessage}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter password (min 6 characters)"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormError("");
                    setSuccessMessage("");
                  }}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
                >
                  {isCreating ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
