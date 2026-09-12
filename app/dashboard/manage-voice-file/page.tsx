/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";

import {
  Mic,
  Upload,
  Search,
  Filter,
  Play,
  Trash2,
  X,
  FileAudio,
} from "lucide-react";

import {
  useGetVoiceFilesQuery,
  useUploadVoiceFileMutation,
  useDeleteVoiceFileMutation,
} from "@/app/redux/features/apis/voiceFileApi";

import { toast } from "sonner";

export default function ManageVoiceFilesPage() {
  // ============================================
  // MODAL
  // ============================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ============================================
  // SEARCH & FILTER
  // ============================================

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  // ============================================
  // UPLOAD FORM
  // ============================================

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ============================================
  // GET VOICE FILES
  // ============================================

  const {
    data: voiceFilesResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetVoiceFilesQuery({});

  const voiceFiles = voiceFilesResponse?.data ?? [];

  // ============================================
  // FRONTEND SEARCH + FILTER
  // ============================================

  const filteredVoiceFiles = useMemo(() => {
    return voiceFiles.filter((file: any) => {
      const fileNameText = String(file?.name || "").toLowerCase();

      const matchesSearch = fileNameText.includes(search.toLowerCase());

      const matchesFilter =
        !filter ||
        String(file?.format || "").toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [voiceFiles, search, filter]);

  // ============================================
  // UPLOAD MUTATION
  // ============================================

  const [uploadVoiceFile, { isLoading: isUploading }] =
    useUploadVoiceFileMutation();

  // ============================================
  // DELETE MUTATION
  // ============================================

  const [deleteVoiceFile, { isLoading: isDeleting }] =
    useDeleteVoiceFileMutation();

  // ============================================
  // FILE SELECT
  // ============================================

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // File extension
    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    // Allowed formats
    if (!["mp3", "wav"].includes(extension || "")) {
      toast.error("Only MP3 and WAV files are allowed.");

      e.target.value = "";
      setSelectedFile(null);

      return;
    }

    // Maximum 15 MB
    const maxSize = 15 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("File size cannot exceed 15 MB.");

      e.target.value = "";
      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);
  };

  // ============================================
  // UPLOAD VOICE FILE
  // ============================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!fileName.trim()) {
      toast.error("Please enter a file name.");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select an audio file.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("fileName", fileName.trim());
      formData.append("file", selectedFile);

      await uploadVoiceFile(formData).unwrap();

      toast.success("Voice file uploaded successfully!");

      // Reset form
      setFileName("");
      setSelectedFile(null);

      // Close modal
      setIsModalOpen(false);

      // Refresh voice files
      refetch();
    } catch (error: any) {
      console.error("Voice file upload error:", error);

      const message =
        error?.data?.error ||
        error?.data?.message ||
        error?.error ||
        "Failed to upload voice file.";

      toast.error(message);
    }
  };

  // ============================================
  // DELETE VOICE FILE
  // ============================================

  const handleDelete = async (id: number) => {
    if (!id) {
      toast.error("Invalid voice file ID.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this voice file?",
    );

    if (!confirmed) return;

    try {
      await deleteVoiceFile(id).unwrap();

      toast.success("Voice file deleted successfully!");

      // Refresh list
      refetch();
    } catch (error: any) {
      console.error("Delete voice file error:", error);

      const message =
        error?.data?.error ||
        error?.data?.message ||
        error?.error ||
        "Failed to delete voice file.";

      toast.error(message);
    }
  };

  // ============================================
  // PREVIEW AUDIO
  // ============================================

  const handlePreview = (url: string) => {
    if (!url) {
      toast.error("Audio URL is not available.");
      return;
    }

    try {
      const audio = new Audio(url);

      audio.play().catch((error) => {
        console.error("Audio preview error:", error);

        toast.error("Unable to play this audio file.");
      });
    } catch (error) {
      console.error("Audio creation error:", error);

      toast.error("Unable to load this audio file.");
    }
  };

  // ============================================
  // CLOSE MODAL
  // ============================================

  const handleCloseModal = () => {
    if (isUploading) return;

    setIsModalOpen(false);
    setFileName("");
    setSelectedFile(null);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 text-slate-800 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-primary">
              <Mic className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Manage Voice Files
              </h1>

              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Upload, preview, and organize your voice broadcast clips.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700"
            >
              <Upload className="h-4 w-4" />
              Upload File
            </button>
          </div>
        </div>

        {/* ============================================
            TABLE CARD
        ============================================ */}

        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">

          {/* ============================================
              SEARCH & FILTER
          ============================================ */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-bold tracking-wide text-slate-900">
                Audio Files List
              </h2>

              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Total {filteredVoiceFiles.length} files available
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* SEARCH */}

              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white sm:w-65"
                />
              </div>

              {/* FILTER */}

              <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs font-bold text-slate-700 outline-none hover:bg-slate-50 focus:border-primary"
                >
                  <option value="">All Formats</option>

                  <option value="mp3">
                    MP3
                  </option>

                  <option value="wav">
                    WAV
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* ============================================
              DESKTOP TABLE
          ============================================ */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-collapse text-left text-xs">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 font-bold uppercase tracking-wider text-slate-400">

                  <th className="w-16 px-6 py-3.5 text-center">
                    S.N.
                  </th>

                  <th className="px-6 py-3.5">
                    NAME
                  </th>

                  <th className="px-6 py-3.5">
                    CAMPAIGN NAME
                  </th>

                  <th className="px-6 py-3.5">
                    FORMAT & SIZE
                  </th>

                  <th className="px-6 py-3.5 text-right">
                    ACTION
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700">

                {/* LOADING */}

                {isLoading || isFetching ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex min-h-62.5 items-center justify-center">
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">

                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />

                          Loading voice files...

                        </div>
                      </div>
                    </td>
                  </tr>

                ) : isError ? (

                  /* ERROR */

                  <tr>
                    <td colSpan={5}>
                      <div className="flex min-h-62.5 flex-col items-center justify-center p-8 text-center">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                          <FileAudio className="h-6 w-6" />
                        </div>

                        <h3 className="mt-3 text-sm font-bold text-slate-700">
                          Failed to load voice files
                        </h3>

                        <p className="mt-1 max-w-sm text-xs text-slate-500">
                          Something went wrong while loading your audio files.
                        </p>

                        <button
                          onClick={() => refetch()}
                          className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                        >
                          Try Again
                        </button>

                      </div>
                    </td>
                  </tr>

                ) : filteredVoiceFiles.length > 0 ? (

                  /* FILES */

                  filteredVoiceFiles.map(
                    (file: any, idx: number) => (
                      <tr
                        key={file.id}
                        className="transition duration-150 hover:bg-slate-50/70"
                      >

                        {/* S.N. */}

                        <td className="px-6 py-4 text-center font-mono font-bold text-slate-500">
                          {idx + 1}
                        </td>

                        {/* NAME */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
                              <FileAudio className="h-4 w-4" />
                            </div>

                            <span className="font-bold text-slate-900">
                              {file.name}
                            </span>

                          </div>
                        </td>

                        {/* CAMPAIGN */}

                        <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-600">
                          {file.campaignName || "N/A"}
                        </td>

                        {/* FORMAT */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">

                            <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                              {file.format}
                            </span>

                            <span className="text-[11px] font-medium text-slate-400">
                              {file.size}
                            </span>

                          </div>
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center justify-end gap-2">

                            {/* PREVIEW */}

                            <button
                              onClick={() =>
                                handlePreview(file.url)
                              }
                              disabled={!file.url}
                              className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              Preview
                            </button>

                            {/* DELETE */}

                            <button
                              onClick={() =>
                                handleDelete(file.id)
                              }
                              disabled={isDeleting}
                              className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    ),
                  )

                ) : (

                  /* EMPTY */

                  <tr>
                    <td colSpan={5}>
                      <div className="flex min-h-62.5 flex-col items-center justify-center p-8 text-center">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <FileAudio className="h-6 w-6" />
                        </div>

                        <h3 className="mt-3 text-sm font-bold text-slate-700">
                          No voice files found
                        </h3>

                        <p className="mt-1 max-w-sm text-xs font-medium text-slate-500">
                          Upload audio files to configure bulk calling campaigns.
                        </p>

                      </div>
                    </td>
                  </tr>

                )}

              </tbody>
            </table>
          </div>

          {/* ============================================
              MOBILE VIEW
          ============================================ */}

          <div className="space-y-3 p-4 md:hidden">

            {isLoading || isFetching ? (

              <div className="flex min-h-50 items-center justify-center">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">

                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />

                  Loading...

                </div>
              </div>

            ) : isError ? (

              <div className="flex min-h-50 flex-col items-center justify-center text-center">

                <FileAudio className="h-8 w-8 text-rose-400" />

                <p className="mt-2 text-sm font-bold text-slate-700">
                  Failed to load files
                </p>

                <button
                  onClick={() => refetch()}
                  className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white"
                >
                  Try Again
                </button>

              </div>

            ) : filteredVoiceFiles.length > 0 ? (

              filteredVoiceFiles.map(
                (file: any, idx: number) => (

                  <div
                    key={file.id}
                    className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs"
                  >

                    {/* TOP */}

                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-2.5">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
                          <FileAudio className="h-4 w-4" />
                        </div>

                        <div>

                          <h3 className="text-xs font-bold text-slate-900">
                            {file.name}
                          </h3>

                          <p className="font-mono text-[11px] text-slate-500">
                            {file.campaignName || "N/A"}
                          </p>

                        </div>

                      </div>

                      <span className="font-mono text-xs font-bold text-slate-400">
                        #{idx + 1}
                      </span>

                    </div>

                    {/* BOTTOM */}

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">

                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {file.format} • {file.size}
                      </span>

                      <div className="flex items-center gap-2">

                        {/* PREVIEW */}

                        <button
                          onClick={() =>
                            handlePreview(file.url)
                          }
                          disabled={!file.url}
                          className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-primary disabled:opacity-50"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          Preview
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(file.id)
                          }
                          disabled={isDeleting}
                          className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 disabled:opacity-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>

                      </div>
                    </div>

                  </div>
                ),
              )

            ) : (

              <div className="flex min-h-50 flex-col items-center justify-center text-center">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <FileAudio className="h-6 w-6" />
                </div>

                <h3 className="mt-3 text-sm font-bold text-slate-700">
                  No voice files found
                </h3>

                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  Upload audio files to configure bulk calling campaigns.
                </p>

              </div>

            )}

          </div>
        </div>

        {/* ============================================
            UPLOAD MODAL
        ============================================ */}

        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">

            <div className="w-full max-w-125 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

                <div>
                  <h2 className="text-base font-extrabold tracking-tight text-slate-900">
                    Upload Voice File
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    Add a new audio clip to your repository.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isUploading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6"
              >

                {/* FILE NAME */}

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    File Name{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <input
                    required
                    type="text"
                    value={fileName}
                    onChange={(e) =>
                      setFileName(e.target.value)
                    }
                    placeholder="Enter file name"
                    disabled={isUploading}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

                {/* AUDIO FILE */}

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Select Voice File{" "}
                    <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">

                    <input
                      required
                      type="file"
                      accept=".mp3,.wav,audio/mpeg,audio/wav"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                      id="modal-voice-input"
                    />

                    <label
                      htmlFor="modal-voice-input"
                      className={`flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 transition ${
                        isUploading
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer hover:bg-slate-100/60"
                      }`}
                    >

                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-2xs">
                        Choose File
                      </span>

                      <span className="max-w-55 truncate text-xs font-medium text-slate-500">
                        {selectedFile
                          ? selectedFile.name
                          : "no file selected"}
                      </span>

                    </label>

                  </div>

                  <p className="mt-2 text-[11px] font-medium text-slate-400">
                    Supported formats:{" "}
                    <span className="font-bold text-slate-600">
                      MP3, WAV
                    </span>{" "}
                    • Maximum 15 MB
                  </p>

                </div>

                {/* UPLOAD BUTTON */}

                <div className="pt-2">

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {isUploading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload
                      </>
                    )}

                  </button>

                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}