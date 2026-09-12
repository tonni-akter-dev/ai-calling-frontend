"use client";

import React, { useState } from "react";
import {
  Settings,
  Globe,
  PhoneCall,
  CreditCard,
  Bell,
  ShieldCheck,
  Database,
  Save,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertTriangle,
  Lock,
  Mail,
  Smartphone,
  Clock,
  Zap,
  Wallet,
  KeyRound,
  RefreshCw,
} from "lucide-react";

import PageHeader from "../components/PageHeader";

type SettingsSection =
  | "general"
  | "calls"
  | "payments"
  | "notifications"
  | "security"
  | "system";

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Settings"
        description="Manage platform configuration, calls, payments, notifications and security."
      />

      {/* Save notification */}
      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-5 w-5" />
          Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onChange={setActiveSection}
        />

        {/* Content */}
        <div className="min-w-0">
          {activeSection === "general" && (
            <GeneralSettings onSave={handleSave} />
          )}

          {activeSection === "calls" && (
            <CallSettings onSave={handleSave} />
          )}

          {activeSection === "payments" && (
            <PaymentSettings onSave={handleSave} />
          )}

    

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS SIDEBAR
========================================================= */

function SettingsSidebar({
  activeSection,
  onChange,
}: {
  activeSection: SettingsSection;
  onChange: (section: SettingsSection) => void;
}) {
  const items: {
    id: SettingsSection;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "general",
      label: "General",
      description: "Platform information",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: "calls",
      label: "Call Settings",
      description: "Voice call configuration",
      icon: <PhoneCall className="h-4 w-4" />,
    },
    {
      id: "payments",
      label: "Payments",
      description: "Wallet & bKash",
      icon: <CreditCard className="h-4 w-4" />,
    },

  ];

  return (
    <div className="h-fit rounded-2xl border border-slate-200 bg-white p-2">
      <div className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Settings className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Settings
            </p>
            <p className="text-xs text-slate-400">
              Platform configuration
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {items.map((item) => {
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  active
                    ? "bg-white/10 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {item.icon}
              </div>

              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold ${
                    active ? "text-white" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </p>

                <p
                  className={`mt-0.5 truncate text-xs ${
                    active ? "text-slate-300" : "text-slate-400"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   GENERAL SETTINGS
========================================================= */

function GeneralSettings({
  onSave,
}: {
  onSave: () => void;
}) {
  const [siteName, setSiteName] = useState("VoiceCall BD");
  const [siteUrl, setSiteUrl] = useState("https://voicecallbd.com");
  const [supportEmail, setSupportEmail] =
    useState("support@voicecallbd.com");
  const [supportPhone, setSupportPhone] =
    useState("01700000000");
  const [timezone, setTimezone] =
    useState("Asia/Dhaka");

  return (
    <SettingsCard
      title="General Settings"
      description="Configure basic information about your platform."
      icon={<Globe className="h-5 w-5" />}
      onSave={onSave}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField
          label="Platform Name"
          value={siteName}
          onChange={setSiteName}
          placeholder="Enter platform name"
        />

        <InputField
          label="Platform URL"
          value={siteUrl}
          onChange={setSiteUrl}
          placeholder="https://example.com"
        />

        <InputField
          label="Support Email"
          value={supportEmail}
          onChange={setSupportEmail}
          placeholder="support@example.com"
          icon={<Mail className="h-4 w-4" />}
        />

        <InputField
          label="Support Phone"
          value={supportPhone}
          onChange={setSupportPhone}
          placeholder="01XXXXXXXXX"
          icon={<Smartphone className="h-4 w-4" />}
        />

    

      </div>


    </SettingsCard>
  );
}

/* =========================================================
   CALL SETTINGS
========================================================= */

function CallSettings({
  onSave,
}: {
  onSave: () => void;
}) {
  const [maxCalls, setMaxCalls] = useState("100");
  const [callTimeout, setCallTimeout] = useState("30");
  const [retryAttempts, setRetryAttempts] = useState("2");

  return (
    <SettingsCard
      title="Call Settings"
      description="Configure bulk voice calling behavior and limits."
      icon={<PhoneCall className="h-5 w-5" />}
      onSave={onSave}
    >
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 text-primary">
            <Zap className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-blue-900">
              Voice Call Configuration
            </h3>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              These settings control how bulk campaigns are processed
              across the platform.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField
          label="Maximum Numbers Per Campaign"
          value={maxCalls}
          onChange={setMaxCalls}
          type="number"
          icon={<PhoneCall className="h-4 w-4" />}
        />

        <InputField
          label="Call Timeout (Seconds)"
          value={callTimeout}
          onChange={setCallTimeout}
          type="number"
          icon={<Clock className="h-4 w-4" />}
        />

        <InputField
          label="Retry Attempts"
          value={retryAttempts}
          onChange={setRetryAttempts}
          type="number"
          icon={<RefreshCw className="h-4 w-4" />}
        />

        <SelectField
          label="Call Queue Mode"
          value="Sequential"
          onChange={() => {}}
          options={[
            "Sequential",
            "Parallel",
            "Auto",
          ]}
        />
      </div>

      <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
        <ToggleCard
          title="Allow Bulk Calling"
          description="Allow customers to start bulk voice campaigns."
          defaultChecked
        />

        <ToggleCard
          title="Automatic Retry"
          description="Retry calls that fail or are temporarily unavailable."
          defaultChecked
        />

        <ToggleCard
          title="Call Recording"
          description="Enable recording where supported and legally permitted."
          defaultChecked
        />

        <ToggleCard
          title="Prevent Duplicate Numbers"
          description="Automatically remove duplicate numbers from campaigns."
          defaultChecked
        />
      </div>
    </SettingsCard>
  );
}

/* =========================================================
   PAYMENT SETTINGS
========================================================= */

function PaymentSettings({
  onSave,
}: {
  onSave: () => void;
}) {
  const [bkashNumber, setBkashNumber] =
    useState("01700000000");

  const [minimumPayment, setMinimumPayment] =
    useState("100");

  const [creditRate, setCreditRate] =
    useState("1");

  return (
    <SettingsCard
      title="Payment & Wallet Settings"
      description="Configure bKash payments, credits and platform wallet."
      icon={<CreditCard className="h-5 w-5" />}
      onSave={onSave}
    >
      <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
            <Wallet className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-emerald-900">
              Platform Wallet
            </h3>

            <p className="mt-1 text-xs leading-5 text-emerald-700">
              Customer payments are added to the platform wallet.
              Only Super Admin can withdraw platform funds.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InputField
          label="bKash Merchant / Payment Number"
          value={bkashNumber}
          onChange={setBkashNumber}
          placeholder="01XXXXXXXXX"
          icon={<Smartphone className="h-4 w-4" />}
        />

        <InputField
          label="Minimum Payment"
          value={minimumPayment}
          onChange={setMinimumPayment}
          type="number"
          icon={<CreditCard className="h-4 w-4" />}
        />

        <InputField
          label="Credits Per BDT"
          value={creditRate}
          onChange={setCreditRate}
          type="number"
          icon={<Wallet className="h-4 w-4" />}
        />

        <SelectField
          label="Currency"
          value="BDT"
          onChange={() => {}}
          options={[
            "BDT",
            "USD",
          ]}
        />
      </div>

      <div className="mt-6 border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Payment Methods
        </h3>

        <div className="mt-4 space-y-4">
          <ToggleCard
            title="bKash"
            description="Allow customers to add credits using bKash."
            defaultChecked
          />

          <ToggleCard
            title="Manual Payment"
            description="Allow admin-approved manual payment requests."
            defaultChecked
          />

          <ToggleCard
            title="Automatic Payment Verification"
            description="Automatically verify supported payment transactions."
            defaultChecked
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />

          <div>
            <p className="text-sm font-semibold text-amber-900">
              Withdrawal Permission
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-700">
              Platform wallet withdrawal must remain restricted to
              Super Admin accounts.
            </p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

function SettingsCard({
  title,
  description,
  icon,
  children,
  onSave,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onSave: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            {icon}
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>
        </div>

        <button
          onClick={onSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-11 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function ToggleCard({
  title,
  description,
  defaultChecked = false,
  danger = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
  danger?: boolean;
}) {
  const [checked, setChecked] =
    useState(defaultChecked);

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
        danger
          ? "border-red-200 bg-red-50/40"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="min-w-0">
        <p
          className={`text-sm font-semibold ${
            danger ? "text-red-800" : "text-slate-800"
          }`}
        >
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setChecked(!checked)}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? danger
              ? "bg-red-600"
              : "bg-slate-900"
            : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* =========================================================
   SYSTEM STAT
========================================================= */

function SystemStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
          {icon}
        </div>

        <span className="text-xs font-medium text-emerald-600">
          Healthy
        </span>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}