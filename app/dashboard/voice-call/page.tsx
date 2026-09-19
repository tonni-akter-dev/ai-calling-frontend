/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Play,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Loader2,
  ArrowLeft,
  RefreshCw,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { authHeaders } from "@/app/lib/authToken"; 

const API_BASE = process.env.NEXT_PUBLIC_API_URL

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
    new Set(input.split("\n").map(normalizeBdNumber).filter(isValidBdNumber))
  );
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const [voiceName, setVoiceName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [numbersInput, setNumbersInput] = useState("");
  const [isLaunching, setIsLaunching] = useState(false);

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
    [numbersInput]
  );

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
    const id = setInterval(loadLogs, 5000);
    return () => clearInterval(id);
  }, [loadLogs]);

  const handleStartCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!voiceName.trim()) return toast.error("Please enter a voice name");
    if (!audioUrl.trim()) return toast.error("Please enter a public audio URL");
    if (parsedNumbers.length === 0)
      return toast.error("Please enter at least one valid number");

    setIsLaunching(true);
    try {
      // STEP 1: register voice URL
      const regRes = await fetch(`${API_BASE}/voice-files/register-url`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(),
        body: JSON.stringify({
          voice_name: voiceName.trim(),
          audio_url: audioUrl.trim(),
        }),
      });
      const regJson = await regRes.json();

      if (!regRes.ok || !regJson.success || !regJson.data?.id) {
        throw new Error(regJson.message || "Voice upload failed");
      }

      const audioFileId = regJson.data.id;

      // STEP 2: launch campaign
      const launchRes = await fetch(`${API_BASE}/campaigns/launch`, {
        method: "POST",
        credentials: "include",
        headers: authHeaders(),
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
        `Campaign started — ${launchJson.data?.totalNumbers ?? parsedNumbers.length} calls queued.`
      );

      setVoiceName("");
      setAudioUrl("");
      setNumbersInput("");
      loadLogs();
    } catch (error: any) {
      toast.error(error?.message || "Failed to launch campaign");
    } finally {
      setIsLaunching(false);
    }
  };

  const getLogStatusBadge = (status: string) => {
    const s = status?.toUpperCase();
    const config: Record<
      string,
      { className: string; icon: React.ReactNode; label: string }
    > = {
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
      FAILED: {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "Failed",
      },
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
              Upload voice and launch bulk IP Call BD calls
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

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Public Audio URL <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  required
                  placeholder="https://your-storage.com/voice.mp3"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-primary focus:bg-white transition"
                />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <FileAudio className="w-3 h-3" />
                MP3, WAV, or OGG. Must be publicly accessible.
              </p>
            </div>

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
                  <span>Launching Campaign...</span>
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
                Real-time status from IP Call BD
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
                                log.duration % 60
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