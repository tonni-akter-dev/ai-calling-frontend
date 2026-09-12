"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  AlertCircle,
  Tag,
  Phone,
  Mail,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  Contact,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "@/app/redux/features/apis/contactApi";
import {
  ContactFormData,
  ContactMetrics,
  ContactStatus,
  ContactListResponse,
} from "@/app/utils/type";
import { GROUPS } from "@/app/utils/data";

const EMPTY_FORM: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  group: "VIP Customers",
  status: "Active",
};

function getApiErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (
      error as {
        data?: {
          message?: string;
          error?: string;
        };
      }
    ).data;

    return (
      data?.message || data?.error || "Something went wrong. Please try again."
    );
  }

  return "Something went wrong. Please try again.";
}

function StatusBadge({ status }: { status: ContactStatus }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        Active
      </span>
    );
  }

  if (status === "Unsubscribed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
        <AlertCircle className="h-3 w-3 text-amber-600" />
        Unsubscribed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-200/80 bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-700">
      <AlertCircle className="h-3 w-3 text-rose-600" />
      Bounced
    </span>
  );
}

function GroupBadge({ group }: { group: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700">
      <Tag className="h-3 w-3 text-slate-400" />
      {group || "No Group"}
    </span>
  );
}

function PageHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-primary">
          <Users className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Manage Contacts
          </h1>

          <p className="mt-0.5 text-xs font-medium text-slate-500">
            Organize target customer phone lists for voice & SMS broadcasts.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          Add Contact
        </button>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  valueClass,
  titleClass,
}: {
  title: string;
  value: number;
  valueClass: string;
  titleClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${titleClass}`}
      >
        {title}
      </span>

      <p className={`mt-1 text-xl font-black ${valueClass}`}>{value}</p>
    </div>
  );
}

interface ContactStatsProps {
  metrics: ContactMetrics | undefined;
  loading: boolean;
}

function ContactStats({
  metrics,
  loading,
}: ContactStatsProps): React.ReactElement {
  const totalContacts = metrics?.totalContacts ?? 0;
  const activeReachable = metrics?.activeReachable ?? 0;
  const unsubscribed = metrics?.unsubscribed ?? 0;
  const bounced = metrics?.bounced ?? 0;

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatsCard
        title="Total Contacts"
        value={totalContacts}
        valueClass="text-slate-900"
        titleClass="text-slate-400"
      />

      <StatsCard
        title="Active Reachable"
        value={activeReachable}
        valueClass="text-emerald-600"
        titleClass="text-emerald-600"
      />

      <StatsCard
        title="Unsubscribed"
        value={unsubscribed}
        valueClass="text-amber-600"
        titleClass="text-amber-600"
      />

      <StatsCard
        title="Bounced / Invalid"
        value={bounced}
        valueClass="text-rose-600"
        titleClass="text-rose-600"
      />
    </div>
  );
}

function ContactToolbar({
  search,
  group,
  total,
  onSearchChange,
  onGroupChange,
  onRefresh,
  refreshing,
}: {
  search: string;
  group: string;
  total: number;
  onSearchChange: (value: string) => void;
  onGroupChange: (value: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-base font-bold tracking-wide text-slate-900">
          Contact Directory
        </h2>

        <p className="mt-0.5 text-xs font-medium text-slate-500">
          Showing {total} contacts
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name, phone, or email..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white sm:w-70"
          />
        </div>

        <select
          value={group}
          onChange={(e) => onGroupChange(e.target.value)}
          className="h-10 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-bold text-slate-700 outline-none transition focus:border-primary"
        >
          <option value="All">All Groups</option>

          {GROUPS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          title="Refresh contacts"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

function TableLoading() {
  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="border-b border-slate-100">
          {Array.from({ length: 7 }).map((__, cell) => (
            <td key={cell} className="px-6 py-5">
              <div className="h-4 animate-pulse rounded bg-slate-100" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={7}>
        <div className="flex min-h-62.5 flex-col items-center justify-center p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Users className="h-6 w-6" />
          </div>

          <h3 className="mt-3 text-sm font-bold text-slate-700">
            No contacts found
          </h3>

          <p className="mt-1 max-w-sm text-xs text-slate-500">
            Add individual contacts or upload a CSV file to populate your list.
          </p>
        </div>
      </td>
    </tr>
  );
}

function ContactTableRow({
  contact,
  index,
  onEdit,
  onDelete,
}: {
  contact: Contact;
  index: number;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <tr className="transition duration-150 hover:bg-slate-50/70">
      <td className="w-16 px-6 py-4 text-center font-mono font-bold text-slate-500">
        {index + 1}
      </td>

      <td className="px-6 py-4 font-bold text-slate-900">
        {contact.name || "Unnamed Contact"}
      </td>

      <td className="px-6 py-4 font-mono font-bold text-slate-800">
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-slate-400" />
          <span>{contact.phone}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-slate-500">
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-slate-400" />
          <span>{contact.email || "N/A"}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <GroupBadge group={contact.group} />
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={contact.status} />
      </td>

      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Edit3 className="h-3.5 w-3.5 text-slate-500" />
            Edit
          </button>

          <button
            onClick={() => onDelete(contact.id)}
            className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function ContactTable({
  contacts,
  loading,
  onEdit,
  onDelete,
}: {
  contacts: Contact[];
  loading: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 font-bold uppercase tracking-wider text-slate-400">
            <th className="w-16 px-6 py-3.5 text-center">S.N.</th>

            <th className="px-6 py-3.5">CONTACT NAME</th>

            <th className="px-6 py-3.5">PHONE NUMBER</th>

            <th className="px-6 py-3.5">EMAIL</th>

            <th className="px-6 py-3.5">GROUP</th>

            <th className="px-6 py-3.5">STATUS</th>

            <th className="px-6 py-3.5 text-right">ACTION</th>
          </tr>
        </thead>

        {loading ? (
          <TableLoading />
        ) : (
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <ContactTableRow
                  key={contact.id}
                  contact={contact}
                  index={index}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        )}
      </table>
    </div>
  );
}

function ContactMobileCard({
  contact,
  index,
  onEdit,
  onDelete,
}: {
  contact: Contact;
  index: number;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900">
            {contact.name || "Unnamed Contact"}
          </h3>

          <p className="mt-0.5 font-mono text-[11px] font-bold text-slate-600">
            {contact.phone}
          </p>

          {contact.email && (
            <p className="mt-1 text-[10px] text-slate-400">{contact.email}</p>
          )}
        </div>

        <span className="font-mono text-xs font-bold text-slate-400">
          #{index + 1}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <GroupBadge group={contact.group} />
        <StatusBadge status={contact.status} />
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => onEdit(contact)}
          className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700"
        >
          <Edit3 className="h-3.5 w-3.5" />
          Edit
        </button>

        <button
          onClick={() => onDelete(contact.id)}
          className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

function ContactMobileList({
  contacts,
  loading,
  onEdit,
  onDelete,
}: {
  contacts: Contact[];
  loading: boolean;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}) {
  if (loading) {
    return (
      <div className="space-y-3 p-4 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4 md:hidden">
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <ContactMobileCard
            key={contact.id}
            contact={contact}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Users className="h-6 w-6" />
          </div>

          <h3 className="mt-3 text-sm font-bold text-slate-700">
            No contacts found
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Try changing your search or group filter.
          </p>
        </div>
      )}
    </div>
  );
}

function ContactModal({
  open,
  editingContact,
  form,
  setForm,
  submitting,
  onClose,
  onSubmit,
}: {
  open: boolean;
  editingContact: Contact | null;
  form: ContactFormData;
  setForm: React.Dispatch<React.SetStateAction<ContactFormData>>;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">
              {editingContact ? "Edit Contact" : "Add New Contact"}
            </h2>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              {editingContact
                ? "Update the contact information."
                : "Add an individual record to your recipient list."}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={submitting}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Full Name <span className="text-rose-500">*</span>
            </label>

            <input
              required
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="e.g., Rahim Ahmed"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Phone Number <span className="text-rose-500">*</span>
            </label>

            <input
              required
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="+8801700000000"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 font-mono text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="name@example.com"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Target Group
            </label>

            <select
              value={form.group}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  group: e.target.value,
                }))
              }
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-primary"
            >
              {GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {editingContact && (
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    status: e.target.value as ContactStatus,
                  }))
                }
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-primary"
              >
                <option value="Active">Active</option>

                <option value="Unsubscribed">Unsubscribed</option>

                <option value="Bounced">Bounced</option>
              </select>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  {editingContact ? (
                    <Edit3 className="h-4 w-4" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}

                  {editingContact ? "Update Contact" : "Save Contact"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageContactsPage() {
  const [search, setSearch] = useState("");
  const [selectedGroupFilter, setSelectedGroupFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);

  const { data, isLoading, isFetching, error, refetch } = useGetContactsQuery({
    search,
    group: selectedGroupFilter,
  });

  const [createContact, { isLoading: creating }] = useCreateContactMutation();

  const [updateContact, { isLoading: updating }] = useUpdateContactMutation();

  const [deleteContact, { isLoading: deleting }] = useDeleteContactMutation();

  const responseData = data as ContactListResponse | undefined;
  const contacts: Contact[] = responseData?.contacts ?? [];
  const metrics: ContactMetrics | undefined = responseData?.metrics;

  const handleOpenAddModal = () => {
    setEditingContact(null);
    setForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);

    setForm({
      name: contact.name || "",
      phone: contact.phone,
      email: contact.email || "",
      group: contact.group || "VIP Customers",
      status: contact.status,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (creating || updating) return;

    setIsModalOpen(false);
    setEditingContact(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      alert("Name and phone number are required.");
      return;
    }

    try {
      if (editingContact) {
        await updateContact({
          id: editingContact.id,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          group: form.group,
          status: form.status,
        }).unwrap();

        alert("Contact updated successfully.");
      } else {
        await createContact({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          group: form.group,
        }).unwrap();

        alert("Contact added successfully.");
      }

      handleCloseModal();
    } catch (error) {
      alert(getApiErrorMessage(error));
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?",
    );

    if (!confirmed) return;

    try {
      await deleteContact(id).unwrap();

      alert("Contact deleted successfully.");
    } catch (error) {
      alert(getApiErrorMessage(error));
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Contacts API Error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen max-w-[1600px] mx-auto space-y-6 bg-slate-50 p-4 text-slate-800 md:p-6">
      <PageHeader onAdd={handleOpenAddModal} />

      <ContactStats metrics={metrics} loading={isLoading} />

      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        <ContactToolbar
          search={search}
          group={selectedGroupFilter}
          total={contacts.length}
          onSearchChange={setSearch}
          onGroupChange={setSelectedGroupFilter}
          onRefresh={() => refetch()}
          refreshing={isFetching}
        />

        <ContactTable
          contacts={contacts}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ContactMobileList
          contacts={contacts}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ContactModal
        open={isModalOpen}
        editingContact={editingContact}
        form={form}
        setForm={setForm}
        submitting={creating || updating}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {deleting && (
        <div className="fixed bottom-5 right-5 z-110 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-xl">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Deleting contact...
        </div>
      )}
    </div>
  );
}
