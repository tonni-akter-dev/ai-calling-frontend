import {
  PhoneCall,
  CheckCircle2,
  XCircle,
  Users,
  Megaphone,
  FileAudio,
} from "lucide-react";

const stats = [
  {
    title: "Total Calls",
    value: "2,480",
    icon: PhoneCall,
    className: "bg-blue-50 text-primary",
  },
  {
    title: "Successful Calls",
    value: "2,213",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Failed Calls",
    value: "267",
    icon: XCircle,
    className: "bg-red-50 text-red-600",
  },
  {
    title: "Contacts",
    value: "1,250",
    icon: Users,
    className: "bg-violet-50 text-violet-600",
  },
  {
    title: "Campaigns",
    value: "12",
    icon: Megaphone,
    className: "bg-orange-50 text-orange-600",
  },
  {
    title: "Voice Files",
    value: "8",
    icon: FileAudio,
    className: "bg-cyan-50 text-cyan-600",
  },
];

export default function UsageStats() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="font-semibold text-slate-900">
          Account Usage
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Communication activity for this subscriber.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.className}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {item.title}
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Success Rate */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">
              Call Success Rate
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              89.2%
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Good performance
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[89.2%] rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}