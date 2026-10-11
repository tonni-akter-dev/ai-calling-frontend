/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Settings2,
  Hash,
  Loader2,
  RefreshCw,
  Search,
  Filter,
  Clock,
  Music,
  PhoneCall,
  Users,
  GitBranch,
  ListOrdered,
  PhoneOutgoing,
  PhoneOff,
  Mic,
  Volume2,
  AlertCircle,
  Play,
  Upload,
  FileAudio,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { authHeaders } from "@/app/lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════
type ActionType =
  | "dial_extension"
  | "group_extensions"
  | "goto_ivr"
  | "queue"
  | "external_number"
  | "hangup";

interface KeyMapping {
  key: string;
  action: ActionType;
  value: string;
}

interface IvrConfig {
  id: number;
  name: string;
  description: string;
  welcome_audio_url: string;
  welcome_text: string;
  key_mappings: KeyMapping[];
  timeout_seconds: number;
  status: string;
}

interface VoiceFile {
  id: number;
  name: string;
  url: string;
  format: string;
  size: string;
  campaignId?: string | null;
  createdAt?: string;
}

const ACTION_META: Record<
  ActionType,
  {
    label: string;
    cls: string;
    icon: React.ReactNode;
    placeholder: string;
    hasValue: boolean;
  }
> = {
  dial_extension: {
    label: "Dial Extension",
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <PhoneCall className="w-3 h-3" />,
    placeholder: "e.g. 101",
    hasValue: true,
  },
  group_extensions: {
    label: "Group Extensions",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <Users className="w-3 h-3" />,
    placeholder: "e.g. sales-group",
    hasValue: true,
  },
  goto_ivr: {
    label: "Go to IVR Menu",
    cls: "bg-purple-50 text-purple-700 border-purple-200",
    icon: <GitBranch className="w-3 h-3" />,
    placeholder: "e.g. ivr_support_001",
    hasValue: true,
  },
  queue: {
    label: "Queue",
    cls: "bg-cyan-50 text-cyan-700 border-cyan-200",
    icon: <ListOrdered className="w-3 h-3" />,
    placeholder: "e.g. support-queue",
    hasValue: true,
  },
  external_number: {
    label: "External Number",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <PhoneOutgoing className="w-3 h-3" />,
    placeholder: "e.g. 01700000000",
    hasValue: true,
  },
  hangup: {
    label: "Hangup",
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    icon: <PhoneOff className="w-3 h-3" />,
    placeholder: "",
    hasValue: false,
  },
};

const ACTION_OPTIONS: { value: ActionType; label: string }[] = [
  { value: "dial_extension", label: "Dial Extension" },
  { value: "group_extensions", label: "Group Extensions" },
  { value: "goto_ivr", label: "Go to IVR Menu" },
  { value: "queue", label: "Queue" },
  { value: "external_number", label: "External Number" },
  { value: "hangup", label: "Hangup" },
];

// ═══════════════════════════════════════════════════════
// Voice Library Picker Modal
// ═══════════════════════════════════════════════════════
function VoiceLibraryPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string, name: string) => void;
}) {
  const [files, setFiles] = useState<VoiceFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Upload state
  const [label, setLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadFiles() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/voice-files`, {
        headers: authHeaders(),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setFiles(json.data || []);
    } catch (err: any) {
      console.error("loadFiles error:", err);
      toast.error("Failed to load library");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) loadFiles();
  }, [open]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) {
      toast.error("Max 15MB allowed");
      return;
    }
    setFile(f);
    if (!label.trim()) setLabel(f.name.replace(/\.[^.]+$/, ""));
  }

  async function handleUpload() {
    if (!file) {
      toast.error("Select a file first");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("fileName", label.trim() || file.name);
      fd.append("voice_name", label.trim() || file.name);

      // Try /voice-files/upload first
      const res = await fetch(`${API_BASE}/voice-files/upload`, {
        method: "POST",
        headers: authHeaders(), // ⚠️ no Content-Type — FormData
        credentials: "include",
        body: fd,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      toast.success("Uploaded successfully");
      setFile(null);
      setLabel("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      loadFiles();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handlePreview(item: VoiceFile) {
    if (playingId === item.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }
    if (audioRef.current) audioRef.current.pause();
    const a = new Audio(item.url);
    a.play().then(() => setPlayingId(item.id)).catch(() => toast.error("Cannot play"));
    a.onended = () => setPlayingId(null);
    audioRef.current = a;
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/voice-files/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Deleted");
        loadFiles();
      }
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filtered = files.filter(
    (f) =>
      !search.trim() || f.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Audio Resource Library
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select an existing audio or upload a new one
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — 2 columns */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: Upload */}
          <div className="lg:col-span-4 p-5 border-r border-slate-200 bg-slate-50/50 overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Action Center
            </h3>
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              Upload New Audio
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Audio Label
                </label>
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Welcome Greeting"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select File
                </label>
                {!file ? (
                  <label
                    htmlFor="lib-file-input"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-white hover:bg-blue-50/40 hover:border-blue-500 transition"
                  >
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-semibold text-slate-600">
                      Click to browse audio
                    </span>
                    <input
                      id="lib-file-input"
                      ref={fileInputRef}
                      type="file"
                      accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/mp4"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                ) : (
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileAudio className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="p-1 rounded text-rose-500 hover:bg-rose-50"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to Library
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-500 leading-relaxed pt-2">
                System auto-converts files to WAV format (16-bit PCM, 8000Hz
                mono) for optimal PBX audio quality.
              </p>
            </div>
          </div>

          {/* RIGHT: Library List */}
          <div className="lg:col-span-8 flex flex-col overflow-hidden">
            {/* Search bar */}
            <div className="p-4 border-b border-slate-200 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search files by label or name..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Music className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    No audio files yet
                  </p>
                  <p className="text-xs text-slate-500">
                    Upload your first file using the form on the left
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                          <FileAudio className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold uppercase text-slate-500">
                              {item.format}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {item.size}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handlePreview(item)}
                          className={`p-2 rounded-lg border transition ${
                            playingId === item.id
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                          title="Preview"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => {
                            onSelect(item.url, item.name);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Select
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════
export default function IvrManagementPage() {
  const [configs, setConfigs] = useState<IvrConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [editing, setEditing] = useState<IvrConfig | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    welcome_text: "",
    welcome_audio_url: "",
    timeout_seconds: 10,
    key_mappings: [
      { key: "1", action: "dial_extension" as ActionType, value: "" },
    ] as KeyMapping[],
  });

  async function loadConfigs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/ivr`, {
        headers: authHeaders(),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setConfigs(json.data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load IVR configs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConfigs();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("IVR name is required");
      return;
    }

    const url = editing ? `${API_BASE}/ivr/${editing.id}` : `${API_BASE}/ivr`;
    const method = editing ? "PUT" : "POST";

    setSaving(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      toast.success(editing ? "IVR updated" : "IVR created");
      setShowForm(false);
      setEditing(null);
      resetForm();
      loadConfigs();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      welcome_text: "",
      welcome_audio_url: "",
      timeout_seconds: 10,
      key_mappings: [
        { key: "1", action: "dial_extension" as ActionType, value: "" },
      ],
    });
  }

  function addKeyMapping() {
    setFormData((prev) => ({
      ...prev,
      key_mappings: [
        ...prev.key_mappings,
        {
          key: String(prev.key_mappings.length + 1),
          action: "dial_extension" as ActionType,
          value: "",
        },
      ],
    }));
  }

  function removeKeyMapping(index: number) {
    setFormData((prev) => ({
      ...prev,
      key_mappings: prev.key_mappings.filter((_, i) => i !== index),
    }));
  }

  function updateKeyMapping(
    index: number,
    field: keyof KeyMapping,
    value: string
  ) {
    setFormData((prev) => ({
      ...prev,
      key_mappings: prev.key_mappings.map((km, i) =>
        i === index ? { ...km, [field]: value } : km
      ),
    }));
  }

  function handleEdit(config: IvrConfig) {
    setEditing(config);
    setFormData({
      name: config.name,
      description: config.description || "",
      welcome_text: config.welcome_text || "",
      welcome_audio_url: config.welcome_audio_url || "",
      timeout_seconds: config.timeout_seconds || 10,
      key_mappings:
        config.key_mappings?.length > 0
          ? config.key_mappings
          : [{ key: "1", action: "dial_extension" as ActionType, value: "" }],
    });
    setShowForm(true);
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete IVR "${name}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/ivr/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("IVR deleted");
        loadConfigs();
      }
    } catch {
      toast.error("Failed to delete");
    }
  }

  const filtered = configs.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      !statusFilter ||
      (statusFilter === "active" && c.status !== "inactive") ||
      (statusFilter === "inactive" && c.status === "inactive");
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* ═══════ MAIN CARD ═══════ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="p-5 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  IVR Configurations
                </h2>
                <p className="text-xs text-slate-500">
                  {configs.length} IVR{configs.length !== 1 ? "s" : ""} configured
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search IVRs..."
                  className="h-9 w-56 pl-9 pr-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 pl-9 pr-8 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer appearance-none"
                  style={{ color: "#1e293b" }}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                onClick={loadConfigs}
                disabled={loading}
                className="h-9 px-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setEditing(null);
                  setShowForm(true);
                }}
                className="h-9 px-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                Create IVR
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  ID
                </th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Name
                </th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Description
                </th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
                  Timeout
                </th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
                  Routes
                </th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
                  Status
                </th>
                <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="inline-flex flex-col items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <span className="text-xs text-slate-500 font-medium">
                        Loading IVR configs...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="inline-flex flex-col items-center gap-4 max-w-sm">
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                        <Settings2 className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          No IVR configs found
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Create your first IVR to set up interactive call flows
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          resetForm();
                          setEditing(null);
                          setShowForm(true);
                        }}
                        className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        <Plus className="w-4 h-4" />
                        Create IVR
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((config) => (
                  <tr
                    key={config.id}
                    className="hover:bg-blue-50/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-slate-500">
                        #{config.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                          <Mic className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <span className="font-semibold text-slate-900 text-[13px]">
                          {config.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-600 line-clamp-1">
                        {config.description || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {config.timeout_seconds || 10}s
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-1">
                        {(config.key_mappings || []).slice(0, 3).map((km, i) => {
                          const meta =
                            ACTION_META[km.action as ActionType] ||
                            ACTION_META.dial_extension;
                          return (
                            <span
                              key={i}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${meta.cls}`}
                              title={`${km.key} → ${meta.label}`}
                            >
                              <Hash className="w-2.5 h-2.5" />
                              {km.key}
                            </span>
                          );
                        })}
                        {(config.key_mappings || []).length > 3 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-slate-200 bg-slate-100 text-slate-600">
                            +{config.key_mappings.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          config.status === "inactive"
                            ? "bg-slate-100 text-slate-600 border-slate-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {config.status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEdit(config)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white text-[11px] font-bold transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(config.id, config.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white text-[11px] font-bold transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50">
          <div className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{filtered.length}</strong>{" "}
            of <strong className="text-slate-800">{configs.length}</strong> total
            IVRs
          </div>
        </div>
      </div>

      {/* ═══════ CREATE / EDIT MODAL ═══════ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 sticky top-0 bg-white z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editing ? "Edit IVR" : "Create IVR Menu"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure interactive voice routes and settings
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForm(false)}
                disabled={saving}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* SECTION 1: GENERAL */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  General Settings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Menu Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Sales Department IVR"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Timeout (Seconds)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.timeout_seconds}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timeout_seconds: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                <div className="pl-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Internal Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief note about what this IVR handles..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
                  />
                </div>
              </div>

              {/* SECTION 2: AUDIO */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Audio & Routing
                </h3>

                <div className="pl-8 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Welcome Message (Text)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.welcome_text}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          welcome_text: e.target.value,
                        })
                      }
                      placeholder="Press 1 for sales, press 2 for support..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-slate-400" />
                      OR Welcome Audio URL
                    </label>

                    <div className="flex gap-2">
                      <input
                        value={formData.welcome_audio_url}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            welcome_audio_url: e.target.value,
                          })
                        }
                        placeholder="https://res.cloudinary.com/.../welcome.mp3"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                      {/* 🎯 LIBRARY PICKER BUTTON */}
                      <button
                        type="button"
                        onClick={() => setShowLibrary(true)}
                        className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition flex items-center gap-2 shrink-0"
                      >
                        <Music className="w-4 h-4" />
                        Library
                      </button>
                    </div>

                    {formData.welcome_audio_url && (
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-slate-500">Selected:</span>
                        <span className="font-mono text-slate-700 truncate max-w-md">
                          {formData.welcome_audio_url}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3: ROUTES */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    Interactive Routes (Key Presses)
                  </h3>
                  <button
                    type="button"
                    onClick={addKeyMapping}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Route
                  </button>
                </div>

                <div className="pl-8 space-y-3">
                  <div className="hidden md:grid grid-cols-12 gap-3 px-3">
                    <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Key Press
                    </div>
                    <div className="col-span-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Route Action
                    </div>
                    <div className="col-span-5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Target Endpoint
                    </div>
                    <div className="col-span-1" />
                  </div>

                  {formData.key_mappings.map((km, i) => {
                    const meta = ACTION_META[km.action];
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="md:col-span-2">
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              placeholder="1"
                              value={km.key}
                              onChange={(e) =>
                                updateKeyMapping(i, "key", e.target.value)
                              }
                              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-center font-mono font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-4">
                          <select
                            value={km.action}
                            onChange={(e) =>
                              updateKeyMapping(i, "action", e.target.value)
                            }
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer"
                          >
                            {ACTION_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-5">
                          {meta.hasValue ? (
                            <input
                              placeholder={meta.placeholder}
                              value={km.value}
                              onChange={(e) =>
                                updateKeyMapping(i, "value", e.target.value)
                              }
                              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                            />
                          ) : (
                            <div className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-400 text-sm italic flex items-center gap-2">
                              <AlertCircle className="w-3.5 h-3.5" />
                              No target needed
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeKeyMapping(i)}
                            disabled={formData.key_mappings.length === 1}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-500/20 transition"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editing ? "Save Changes" : "Deploy IVR Configuration"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                  className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════ LIBRARY PICKER MODAL ═══════ */}
      <VoiceLibraryPicker
        open={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={(url, name) => {
          setFormData((prev) => ({ ...prev, welcome_audio_url: url }));
          toast.success(`Selected: ${name}`);
        }}
      />
    </div>
  );
}