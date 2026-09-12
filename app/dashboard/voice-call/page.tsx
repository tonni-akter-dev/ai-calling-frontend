/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Play,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Zap,
  Loader2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import {
  useLaunchCampaignMutation,
  useGetLiveLogsQuery,
} from "@/app/redux/features/apis/campaignApi";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState("");
  const [numbersInput, setNumbersInput] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  // Fetch live logs
  const { 
    data: logsData, 
    refetch: refetchLogs,
    isLoading: logsLoading 
  } = useGetLiveLogsQuery({});

  const [launchCampaign] = useLaunchCampaignMutation();

  const logs = logsData?.logs || [];
  const summary = logsData?.summary || { total: 0, success: 0, active: 0, failed: 0 };

  const parsedNumberCount = numbersInput
    .split("\n")
    .map((num) => num.trim())
    .filter((num) => num.length > 0).length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleStartCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campaignName) {
      toast.error("Please enter a campaign name");
      return;
    }
    if (!numbersInput) {
      toast.error("Please enter target phone numbers");
      return;
    }
    if (!audioFile) {
      toast.error("Please upload a voice message");
      return;
    }

    setIsLaunching(true);
    try {
      const formData = new FormData();
      formData.append("name", campaignName);
      formData.append("targetNumbers", numbersInput);
      formData.append("file", audioFile);

      await launchCampaign(formData).unwrap();
      toast.success("Campaign launched successfully!");
      
      // Reset form
      setCampaignName("");
      setNumbersInput("");
      setAudioFile(null);
      
      // Refresh logs
      refetchLogs();
      
      // Redirect to campaigns list after short delay
      setTimeout(() => {
        router.push("/admin/campaigns");
      }, 2000);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to launch campaign");
    } finally {
      setIsLaunching(false);
    }
  };

  // Auto-refresh logs every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchLogs();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchLogs]);

  // Get status badge for logs
  const getLogStatusBadge = (status: string) => {
    const config: Record<string, { className: string; icon: React.ReactNode; label: string }> = {
      completed: {
        className: "bg-emerald-50 border-emerald-200/80 text-emerald-700",
        icon: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
        label: "Answered",
      },
      ringing: {
        className: "bg-purple-50 border-purple-200/80 text-purple-700",
        icon: <Zap className="w-3 h-3 text-purple-600 animate-bounce" />,
        label: "Ringing",
      },
      "in-progress": {
        className: "bg-purple-50 border-purple-200/80 text-purple-700",
        icon: <Zap className="w-3 h-3 text-purple-600 animate-bounce" />,
        label: "In Progress",
      },
      failed: {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "Failed",
      },
      busy: {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "Busy",
      },
      "no-answer": {
        className: "bg-rose-50 border-rose-200/80 text-rose-700",
        icon: <AlertCircle className="w-3 h-3 text-rose-600" />,
        label: "No Answer",
      },
      queued: {
        className: "bg-slate-100 border-slate-200/80 text-slate-500",
        icon: <Loader2 className="w-3 h-3 text-slate-400 animate-spin" />,
        label: "Queued",
      },
    };
    return config[status] || { 
      className: "bg-slate-100 border-slate-200/80 text-slate-500", 
      icon: null, 
      label: status 
    };
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto bg-slate-50 min-h-screen p-4 md:p-6 text-slate-800">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white border border-slate-200 transition"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create Voice Campaign</h1>
            <p className="mt-1 text-sm text-slate-500">
              Launch a new bulk voice call campaign
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Campaign Creation Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Campaign Details
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Configure your bulk voice campaign
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-lg">
              {parsedNumberCount} Numbers Ready
            </span>
          </div>

          <form onSubmit={handleStartCampaign} className="space-y-5">
            {/* Campaign Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Campaign Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Eid Promo Broadcast 2026"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition"
              />
            </div>

            {/* Target Phone Numbers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Target Phone Numbers <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-slate-400">One number per line</span>
              </div>
              <textarea
                rows={6}
                required
                placeholder={`+8801700000000\n+8801800000000\n+8801900000000`}
                value={numbersInput}
                onChange={(e) => setNumbersInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition resize-none"
              />
              {parsedNumberCount > 0 && (
                <p className="mt-2 text-xs text-emerald-600 font-medium">
                  ✅ {parsedNumberCount} valid numbers detected
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Upload Voice Message (.mp3, .wav) <span className="text-rose-500">*</span>
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="voicemail-file"
                />
                <label
                  htmlFor="voicemail-file"
                  className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition ${
                    audioFile
                      ? "border-emerald-500/50 bg-emerald-50/50 text-emerald-700"
                      : "border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/40"
                  }`}
                >
                  {audioFile ? (
                    <div className="flex items-center space-x-3 text-emerald-700">
                      <FileAudio className="w-6 h-6 text-emerald-600" />
                      <span className="text-sm font-bold truncate max-w-xs">{audioFile.name}</span>
                      <span className="text-xs text-slate-400">
                        ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-2xs">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-slate-700 font-bold">
                        Click to upload voice clip
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        MP3 or WAV files up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Launch Button */}
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

        {/* Right Column: Live Call Logs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Live Call Logs</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Real-time status of outgoing calls
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => refetchLogs()}
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

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total</span>
              <p className="text-base font-black text-slate-700 mt-0.5">{summary.total || 0}</p>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Success</span>
              <p className="text-base font-black text-emerald-600 mt-0.5">{summary.success || 0}</p>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Failed</span>
              <p className="text-base font-black text-rose-600 mt-0.5">{summary.failed || 0}</p>
            </div>
          </div>

          {/* Logs List */}
          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-80 pr-1">
            {logsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Phone className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm font-medium text-slate-600">No call logs yet</p>
                <p className="text-xs text-slate-400">Launch a campaign to see live calls</p>
              </div>
            ) : (
              logs.map((log: any) => {
                const status = getLogStatusBadge(log.status);
                const StatusIcon = status.icon;

                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between hover:bg-slate-50/70 transition"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-mono font-bold text-slate-900">{log.phone}</p>
                      <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-semibold">
                        <span>{log.time}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">
                          {log.duration ? `${Math.floor(log.duration / 60)}:${String(log.duration % 60).padStart(2, '0')}` : '0:00'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className={`inline-flex items-center space-x-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.className}`}>
                        {StatusIcon}
                        <span>{status.label}</span>
                      </span>
                    </div>
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

// Phone icon for empty state
function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}