import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const transactions = [
  {
    date: "05 Sep 2026",
    description: "Voice Call Usage",
    amount: "-৳500",
    type: "debit",
  },
  {
    date: "04 Sep 2026",
    description: "Wallet Recharge",
    amount: "+৳2,000",
    type: "credit",
  },
  {
    date: "03 Sep 2026",
    description: "Voice Call Usage",
    amount: "-৳350",
    type: "debit",
  },
];

export default function CreditHistory() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5">
        <h3 className="font-semibold text-slate-900">
          Credit History
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Wallet transactions
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  transaction.type === "credit"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {transaction.type === "credit" ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  {transaction.description}
                </p>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  {transaction.date}
                </p>
              </div>
            </div>

            <span
              className={`text-sm font-bold ${
                transaction.type === "credit"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}