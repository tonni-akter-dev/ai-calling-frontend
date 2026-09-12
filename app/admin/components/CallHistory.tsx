import {
  PhoneCall,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const calls = [
  {
    number: "017XXXXXXXX",
    campaign: "Monthly Promotion",
    duration: "00:42",
    status: "Success",
    date: "05 Sep, 10:42 AM",
  },
  {
    number: "018XXXXXXXX",
    campaign: "Monthly Promotion",
    duration: "00:31",
    status: "Success",
    date: "05 Sep, 10:41 AM",
  },
  {
    number: "019XXXXXXXX",
    campaign: "Payment Reminder",
    duration: "00:00",
    status: "Failed",
    date: "05 Sep, 10:38 AM",
  },
  {
    number: "016XXXXXXXX",
    campaign: "Monthly Promotion",
    duration: "01:02",
    status: "Success",
    date: "05 Sep, 10:35 AM",
  },
];

export default function CallHistory() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h3 className="font-semibold text-slate-900">
            Recent Calls
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest communication activity
          </p>
        </div>

        <button className="text-xs font-semibold text-primary hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Phone Number
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Campaign
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Duration
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Date
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {calls.map((call, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-primary" />

                    <span className="text-sm font-medium text-slate-700">
                      {call.number}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {call.campaign}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {call.duration}
                </td>

                <td className="px-5 py-4 text-xs text-slate-400">
                  {call.date}
                </td>

                <td className="px-5 py-4">
                  {call.status === "Success" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500">
                      <XCircle className="h-3.5 w-3.5" />
                      Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}