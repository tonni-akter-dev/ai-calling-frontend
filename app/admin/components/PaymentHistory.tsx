import { CheckCircle2, CreditCard } from "lucide-react";

const payments = [
  {
    date: "01 Sep 2026",
    amount: "৳2,499",
    method: "bKash",
    transaction: "TXN123456",
  },
  {
    date: "01 Aug 2026",
    amount: "৳2,499",
    method: "bKash",
    transaction: "TXN982341",
  },
  {
    date: "01 Jul 2026",
    amount: "৳2,499",
    method: "Nagad",
    transaction: "TXN821452",
  },
];

export default function PaymentHistory() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <CreditCard className="h-4 w-4 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Payment History
            </h3>

            <p className="text-xs text-slate-500">
              Subscription payments
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {payments.map((payment) => (
          <div
            key={payment.transaction}
            className="flex items-center justify-between p-4"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {payment.amount}
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                {payment.date} · {payment.method}
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                {payment.transaction}
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Paid
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}