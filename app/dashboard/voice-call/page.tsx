/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Loader2,
  ArrowLeft,
  RefreshCw,
  UploadCloud,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { authHeaders, getToken } from "@/app/lib/authToken";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface CallLog {
  id: number;
  phone: string;
  status: string;
  duration: number;
  time: string;
}

function normalizeBdNumber(n: string) {
  return n.trim().replace(/^(\+?88)/, "");
}

function isValidBdNumber(n: string) {
  return /^01[3-9]\d{8}$/.test(n);
}

function parseNumbers(input: string) {
  return Array.from(
    new Set(input.split("\n").map(normalizeBdNumber).filter(isValidBdNumber)),
  );
}

export default function CreateCampaignPage() {
  const router = useRouter();

  // Form state
  const [voiceName, setVoiceName] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string>("");
  const [numbersInput, setNumbersInput] = useState("");
  const [isLaunching, setIsLaunching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live logs state
  const [logs, setLogs] = useState<CallLog[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    success: 0,
    failed: 0,
    active: 0,
  });
  const [logsLoading, setLogsLoading] = useState(true);

  const parsedNumbers = useMemo(
    () => parseNumbers(numbersInput),
    [numbersInput],
  );

  // ============================================================
  // Load live logs
  // ============================================================
  const loadLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/campaigns/live-logs`, {
        cache: "no-store",
        credentials: "include",
        headers: authHeaders(),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to load logs");

      setLogs(json.logs || []);
      setSummary({
        total: json.summary?.total || 0,
        success: json.summary?.success || 0,
        failed: json.summary?.failed || 0,
        active: json.summary?.active || 0,
      });
    } catch (err: any) {
      console.error("loadLogs error:", err?.message);
    } finally {
      setLogsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
    const id = setInterval(loadLogs, 30000);
    return () => clearInterval(id);
  }, [loadLogs]);

  // ============================================================
  // File picker handlers
  // ============================================================
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // Size check (10MB)
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File too large. Max 10MB allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setAudioFile(f);

    // cleanup previous preview URL
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioPreviewUrl(URL.createObjectURL(f));

    // Auto-fill voice name from filename
    if (!voiceName.trim()) {
      setVoiceName(f.name.replace(/\.[^.]+$/, ""));
    }
  };

  const clearFile = () => {
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setAudioFile(null);
    setAudioPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ============================================================
  // Launch campaign
  //   1. Upload file → Cloudinary via backend → returns audioFileId
  //   2. Launch campaign with audioFileId (backend uses ePBX API)
  // ============================================================
  const handleStartCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!voiceName.trim()) return toast.error("Please enter a voice name");
    if (!audioFile) return toast.error("Please select an audio file");
    if (parsedNumbers.length === 0)
      return toast.error("Please enter at least one valid number");

    setIsLaunching(true);

    try {
      // ---- STEP 1: Upload file to Cloudinary ----
      setIsUploading(true);
      const fd = new FormData();
      fd.append("file", audioFile);
      fd.append("voice_name", voiceName.trim());

      const uploadRes = await fetch(`${API_BASE}/voice-files/upload`, {
        method: "POST",
        // credentials: "include",
        headers: {
          // ✅ Don't use authHeaders() — it forces JSON Content-Type
          Authorization: `Bearer ${getToken()}`,
        }, // ⚠️ don't set Content-Type — browser sets boundary
        body: fd,
      });

      const uploadJson = await uploadRes.json();
      setIsUploading(false);

      if (!uploadRes.ok || !uploadJson.success || !uploadJson.data?.id) {
        throw new Error(uploadJson.message || "Voice upload failed");
      }

      const audioFileId = uploadJson.data.id;

      // ---- STEP 2: Launch campaign (backend uses ePBX API) ----
      const launchRes = await fetch(`${API_BASE}/campaigns/launch`, {
        method: "POST",
        credentials: "include",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: voiceName.trim(),
          targetNumbers: parsedNumbers.join("\n"),
          audioFileId,
        }),
      });

      const launchJson = await launchRes.json();

      if (!launchRes.ok || !launchJson.success) {
        throw new Error(launchJson.message || "Failed to launch campaign");
      }

      toast.success(
        `Campaign started — ${
          launchJson.data?.totalNumbers ?? parsedNumbers.length
        } calls queued.`,
      );

      // reset form
      setVoiceName("");
      clearFile();
      setNumbersInput("");
      loadLogs();
    } catch (error: any) {
      toast.error(error?.message || "Failed to launch campaign");
    } finally {
      setIsLaunching(false);
      setIsUploading(false);
    }
  };

  // ============================================================
  // Status badge helper — ePBX + legacy statuses
  // ============================================================
  const getLogStatusBadge = (status: string) => {
    const s = status?.toUpperCase();
    const config: Record<
      string,
      { className: string; icon: React.ReactNode; label: string }
    > = {
      // ─── Answered / Completed ───────────────────────
      ANSWERED: {
        className: "bg-emerald-50 border-emerald-200/80 text-emerald-700",
        icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
        label: "Answered",
      },
      COMPLETED: {
        className: "bg-emerald-50 border-emerald-200/80 text-emerald-700",
        icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
        label: "Answered",
      },
      // ─── ePBX: Customer pressed 1 → confirmed ─────
      CONFIRMED: {
        className: "bg-emerald-50 border-emerald-200/80 text-emerald-700",
        icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
        label: "Confirmed",
      },
      // ─── ePBX: Customer pressed 2 → rejected ──────
      REJECTED: {
        className: "bg-amber-50 border-amber-200/80 text-amber-700",
        icon: <XCircle className="w-3 h-3 text-amber-600" />,
        label: "Rejected",
      },
      // ─── ePBX: Call received but no button press ──
      "NO-RESPONSE": {
        className: "bg-blue-50 border-blue-200/80 text-blue-700",
        icon: <CheckCircle2 className="w-3 h-3 text-blue-600" />,
        label: "No Response",
      },
      NORESPONSE: {
        className: "bg-blue-50 border-blue-200/80 text-blue-700",
        icon: <CheckCircle2 className="w-3 h-3 text-blue-600" />,
        label: "No Response",
      },
      // ─── Failures ─────────────────────────────────
      BUSY: {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "Busy",
      },
      "NO-ANSWER": {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "No Answer",
      },
      NOANSWER: {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "No Answer",
      },
      FAILED: {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "Failed",
      },
      // ─── In progress ──────────────────────────────
      QUEUED: {
        className: "bg-slate-100 border-slate-200/80 text-slate-500",
        icon: <Loader2 className="w-3 h-3 text-slate-400 animate-spin" />,
        label: "Queued",
      },
      RINGING: {
        className: "bg-purple-50 border-purple-200/80 text-purple-700",
        icon: <Loader2 className="w-3 h-3 text-purple-600 animate-spin" />,
        label: "Ringing",
      },
      "IN-PROGRESS": {
        className: "bg-purple-50 border-purple-200/80 text-purple-700",
        icon: <Loader2 className="w-3 h-3 text-purple-600 animate-spin" />,
        label: "In Progress",
      },
    };
    return (
      config[s] || {
        className: "bg-slate-100 border-slate-200/80 text-slate-500",
        icon: <Loader2 className="w-3 h-3 text-slate-400 animate-spin" />,
        label: status,
      }
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto bg-slate-50 min-h-screen p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white border border-slate-200 transition"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Create Voice Campaign
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Upload voice and launch bulk AI Call BD calls
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push("/admin/campaigns")}
          className="text-sm text-primary hover:text-blue-700 font-medium"
        >
          View All Campaigns →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT — form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Campaign Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure your bulk voice campaign
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-lg">
              {parsedNumbers.length} Numbers Ready
            </span>
          </div>

          <form onSubmit={handleStartCampaign} className="space-y-5">
            {/* Voice Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Voice Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Eid Promo Voice 2026"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>

            {/* Voice File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Voice File <span className="text-rose-500">*</span>
              </label>

              {!audioFile ? (
                <label
                  htmlFor="audio-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50/60 hover:bg-blue-50/40 hover:border-primary transition"
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm font-semibold text-slate-700">
                    Click to upload voice file
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    MP3, WAV, OGG, M4A — max 10MB
                  </span>
                  <input
                    id="audio-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/ogg,audio/mp4,audio/m4a"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              ) : (
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <FileAudio className="w-5 h-5 text-blue-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {audioFile.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="p-1.5 rounded-lg hover:bg-rose-50 transition"
                      title="Remove file"
                    >
                      <X className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>

                  {/* Live audio preview */}
                  {audioPreviewUrl && (
                    <audio
                      controls
                      src={audioPreviewUrl}
                      className="w-full mt-3 h-9"
                    />
                  )}
                </div>
              )}

              <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <FileAudio className="w-3 h-3" />
                File will be uploaded to Cloudinary and used for calls via ePBX.
              </p>
            </div>

            {/* Target numbers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Target Phone Numbers <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-slate-400">
                  One number per line
                </span>
              </div>
              <textarea
                rows={6}
                required
                placeholder={`01700000000\n01800000000\n01900000000`}
                value={numbersInput}
                onChange={(e) => setNumbersInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition resize-none"
              />
              {parsedNumbers.length > 0 && (
                <p className="mt-2 text-xs text-emerald-600 font-medium">
                  ✅ {parsedNumbers.length} valid Bangladeshi numbers detected
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLaunching}
              className="w-full bg-primary hover:bg-blue-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-sm transition duration-200 flex items-center justify-center space-x-2 shadow-xs mt-4"
            >
              {isLaunching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {isUploading ? "Uploading voice…" : "Launching Campaign..."}
                  </span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>START BULK CALLING NOW</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT — live logs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Live Call Logs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time call status
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadLogs}
                className="p-1.5 rounded-lg hover:bg-slate-100 transition"
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4 text-slate-400" />
              </button>
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Total
              </span>
              <p className="text-base font-black text-slate-700 mt-0.5">
                {summary.total}
              </p>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Success
              </span>
              <p className="text-base font-black text-emerald-600 mt-0.5">
                {summary.success}
              </p>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Failed
              </span>
              <p className="text-base font-black text-rose-600 mt-0.5">
                {summary.failed}
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-80 pr-1">
            {logsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p className="text-sm font-medium text-slate-600">
                  No call logs yet
                </p>
                <p className="text-xs text-slate-400">
                  Launch a campaign to see live calls
                </p>
              </div>
            ) : (
              logs.map((log) => {
                const status = getLogStatusBadge(log.status);
                const StatusIcon = status.icon;
                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between hover:bg-slate-50/70 transition"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-mono font-bold text-slate-900">
                        {log.phone}
                      </p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
                        <span>{log.time}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">
                          {log.duration
                            ? `${Math.floor(log.duration / 60)}:${String(
                                log.duration % 60,
                              ).padStart(2, "0")}`
                            : "0:00"}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.className}`}
                    >
                      {StatusIcon}
                      <span>{status.label}</span>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
