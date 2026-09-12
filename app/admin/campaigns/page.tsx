    "use client";

    import React, { useMemo, useState } from "react";
    import Link from "next/link";
    import {
    Search,
    Filter,
    Eye,
    PhoneCall,
    Users,
    CheckCircle2,
    XCircle,
    Clock3,
    MoreHorizontal,
    CalendarDays,
    ChevronDown,
    } from "lucide-react";

    import PageHeader from "../components/PageHeader";

    type CampaignStatus = "Running" | "Completed" | "Scheduled" | "Failed";

    interface Campaign {
    id: string;
    name: string;
    user: string;
    email: string;
    phone: string;
    totalContacts: number;
    completed: number;
    success: number;
    failed: number;
    duration: string;
    credits: number;
    status: CampaignStatus;
    date: string;
    }

    const campaigns: Campaign[] = [
    {
        id: "CMP-1001",
        name: "Monthly Promotion",
        user: "Rahim Ahmed",
        email: "rahim@example.com",
        phone: "01712345678",
        totalContacts: 8450,
        completed: 5746,
        success: 5210,
        failed: 536,
        duration: "02:45:32",
        credits: 3378,
        status: "Running",
        date: "Sep 06, 2026",
    },
    {
        id: "CMP-1002",
        name: "Eid Offer Campaign",
        user: "Nusrat Jahan",
        email: "nusrat@example.com",
        phone: "01812345678",
        totalContacts: 5200,
        completed: 5200,
        success: 4810,
        failed: 390,
        duration: "01:52:18",
        credits: 2080,
        status: "Completed",
        date: "Sep 05, 2026",
    },
    {
        id: "CMP-1003",
        name: "Customer Reminder",
        user: "Karim Hasan",
        email: "karim@example.com",
        phone: "01912345678",
        totalContacts: 3200,
        completed: 0,
        success: 0,
        failed: 0,
        duration: "—",
        credits: 1280,
        status: "Scheduled",
        date: "Sep 07, 2026",
    },
    {
        id: "CMP-1004",
        name: "New Product Announcement",
        user: "Sadia Islam",
        email: "sadia@example.com",
        phone: "01612345678",
        totalContacts: 6800,
        completed: 6800,
        success: 6125,
        failed: 675,
        duration: "02:14:42",
        credits: 2720,
        status: "Completed",
        date: "Sep 04, 2026",
    },
    {
        id: "CMP-1005",
        name: "Payment Reminder",
        user: "Tanvir Hossain",
        email: "tanvir@example.com",
        phone: "01512345678",
        totalContacts: 1800,
        completed: 980,
        success: 912,
        failed: 68,
        duration: "00:42:15",
        credits: 720,
        status: "Running",
        date: "Sep 06, 2026",
    },
    {
        id: "CMP-1006",
        name: "Service Feedback",
        user: "Mim Akter",
        email: "mim@example.com",
        phone: "01312345678",
        totalContacts: 2400,
        completed: 2400,
        success: 2215,
        failed: 185,
        duration: "00:58:44",
        credits: 960,
        status: "Completed",
        date: "Sep 03, 2026",
    },
    {
        id: "CMP-1007",
        name: "Weekend Campaign",
        user: "Arif Khan",
        email: "arif@example.com",
        phone: "01412345678",
        totalContacts: 4100,
        completed: 0,
        success: 0,
        failed: 0,
        duration: "—",
        credits: 1640,
        status: "Scheduled",
        date: "Sep 08, 2026",
    },
    {
        id: "CMP-1008",
        name: "Failed Test Campaign",
        user: "Jannat Ara",
        email: "jannat@example.com",
        phone: "01798765432",
        totalContacts: 950,
        completed: 950,
        success: 120,
        failed: 830,
        duration: "00:21:10",
        credits: 380,
        status: "Failed",
        date: "Sep 02, 2026",
    },
    ];

    const statusStyles: Record<CampaignStatus, string> = {
    Running:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
    Completed:
        "bg-blue-50 text-blue-700 border-blue-200",
    Scheduled:
        "bg-amber-50 text-amber-700 border-amber-200",
    Failed:
        "bg-red-50 text-red-700 border-red-200",
    };

    export default function CampaignsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"All" | CampaignStatus>("All");

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter((campaign) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            campaign.name.toLowerCase().includes(searchText) ||
            campaign.id.toLowerCase().includes(searchText) ||
            campaign.user.toLowerCase().includes(searchText) ||
            campaign.email.toLowerCase().includes(searchText);

        const matchesStatus =
            status === "All" || campaign.status === status;

        return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    const totalCampaigns = campaigns.length;

    const runningCampaigns = campaigns.filter(
        (item) => item.status === "Running"
    ).length;

    const completedCampaigns = campaigns.filter(
        (item) => item.status === "Completed"
    ).length;

    const totalContacts = campaigns.reduce(
        (sum, item) => sum + item.totalContacts,
        0
    );

    const totalCredits = campaigns.reduce(
        (sum, item) => sum + item.credits,
        0
    );

    return (
        <div className="space-y-6">
        {/* Header */}
        <PageHeader
            title="Campaigns"
            description="Monitor and manage campaigns from all subscribed users."
        />

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
            title="Total Campaigns"
            value={totalCampaigns.toLocaleString()}
            icon={<PhoneCall className="h-5 w-5" />}
            iconClass="bg-blue-50 text-primary"
            />

            <SummaryCard
            title="Running Campaigns"
            value={runningCampaigns.toLocaleString()}
            icon={<Clock3 className="h-5 w-5" />}
            iconClass="bg-emerald-50 text-emerald-600"
            />

            <SummaryCard
            title="Total Contacts"
            value={totalContacts.toLocaleString()}
            icon={<Users className="h-5 w-5" />}
            iconClass="bg-violet-50 text-violet-600"
            />

            <SummaryCard
            title="Credits Used"
            value={totalCredits.toLocaleString()}
            icon={<CheckCircle2 className="h-5 w-5" />}
            iconClass="bg-orange-50 text-orange-600"
            />
        </div>

        {/* Main Table Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
                <h2 className="text-base font-semibold text-slate-900">
                All Campaigns
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                View campaigns created by all users.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}
                <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search campaign or user..."
                    className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                />
                </div>

                {/* Status Filter */}
                <div className="relative">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                    value={status}
                    onChange={(e) =>
                    setStatus(e.target.value as "All" | CampaignStatus)
                    }
                    className="h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="All">All Status</option>
                    <option value="Running">Running</option>
                    <option value="Completed">Completed</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Failed">Failed</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
            </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
                <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                    <TableHead>Campaign</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Contacts</TableHead>
                    <TableHead>Success</TableHead>
                    <TableHead>Failed</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead align="right">Action</TableHead>
                </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign) => (
                    <CampaignRow
                        key={campaign.id}
                        campaign={campaign}
                    />
                    ))
                ) : (
                    <tr>
                    <td
                        colSpan={9}
                        className="px-6 py-16 text-center"
                    >
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Search className="h-5 w-5 text-slate-400" />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-slate-900">
                        No campaigns found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filter.
                        </p>
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                {filteredCampaigns.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                {campaigns.length}
                </span>{" "}
                campaigns
            </p>

            <div className="text-xs text-slate-400">
                Super Admin View
            </div>
            </div>
        </div>
        </div>
    );
    }

    /* --------------------------------
    Summary Card
    -------------------------------- */

    function SummaryCard({
    title,
    value,
    icon,
    iconClass,
    }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconClass: string;
    }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-sm font-medium text-slate-500">
                {title}
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {value}
            </h3>
            </div>

            <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
            >
            {icon}
            </div>
        </div>
        </div>
    );
    }

    /* --------------------------------
    Table Head
    -------------------------------- */

    function TableHead({
    children,
    align = "left",
    }: {
    children: React.ReactNode;
    align?: "left" | "right";
    }) {
    return (
        <th
        className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 ${
            align === "right" ? "text-right" : "text-left"
        }`}
        >
        {children}
        </th>
    );
    }

    /* --------------------------------
    Campaign Row
    -------------------------------- */

    function CampaignRow({
    campaign,
    }: {
    campaign: Campaign;
    }) {
    const successRate =
        campaign.completed > 0
        ? Math.round(
            (campaign.success / campaign.completed) * 100
            )
        : 0;

    return (
        <tr className="group transition hover:bg-slate-50/70">
        {/* Campaign */}
        <td className="px-5 py-4">
            <div>
            <p className="font-semibold text-slate-900">
                {campaign.name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
                {campaign.id}
            </p>
            </div>
        </td>

        {/* User */}
        <td className="px-5 py-4">
            <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-primary">
                {campaign.user
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
                <p className="text-sm font-medium text-slate-800">
                {campaign.user}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                {campaign.email}
                </p>
            </div>
            </div>
        </td>

        {/* Contacts */}
        <td className="px-5 py-4">
            <p className="text-sm font-semibold text-slate-800">
            {campaign.totalContacts.toLocaleString()}
            </p>

            <p className="mt-1 text-xs text-slate-400">
            {campaign.completed.toLocaleString()} completed
            </p>
        </td>

        {/* Success */}
        <td className="px-5 py-4">
            <div>
            <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                <span className="text-sm font-semibold text-slate-800">
                {campaign.success.toLocaleString()}
                </span>
            </div>

            <p className="mt-1 text-xs text-emerald-600">
                {successRate}% success
            </p>
            </div>
        </td>

        {/* Failed */}
        <td className="px-5 py-4">
            <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />

            <span className="text-sm font-semibold text-slate-800">
                {campaign.failed.toLocaleString()}
            </span>
            </div>
        </td>

        {/* Credits */}
        <td className="px-5 py-4">
            <span className="text-sm font-semibold text-slate-800">
            {campaign.credits.toLocaleString()}
            </span>

            <p className="mt-1 text-xs text-slate-400">
            credits
            </p>
        </td>

        {/* Status */}
        <td className="px-5 py-4">
            <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[campaign.status]}`}
            >
            {campaign.status === "Running" && (
                <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            )}

            {campaign.status}
            </span>
        </td>

        {/* Date */}
        <td className="px-5 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays className="h-4 w-4 text-slate-400" />

            {campaign.date}
            </div>
        </td>

        {/* Action */}
        <td className="px-5 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
            <Link
                href={`/admin/campaigns/${campaign.id}`}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
            >
                <Eye className="h-4 w-4" />
                View
            </Link>

            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            >
                <MoreHorizontal className="h-4 w-4" />
            </button>
            </div>
        </td>
        </tr>
    );
    }