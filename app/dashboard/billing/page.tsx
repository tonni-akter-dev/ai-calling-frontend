/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import {
  FileText,
  CreditCard,
  Printer,
  Download,
  XCircle,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  CheckCircle2,
  Clock,
  Building2,
} from "lucide-react";

// Types
interface InvoiceItem {
  description: string;
  details?: string[];
  vat: string;
  unitCost: number;
  qty: number;
  total: number;
}

interface Invoice {
  id: string;
  status: "UNPAID" | "PAID" | "CANCELLED";
  total: number;
  invoiceDate: string;
  dueDate: string;
  datePaid: string;
  items: InvoiceItem[];
  subtotal: number;
  previousDues: number;
  credit: number;
  vatRate: number;
  vatAmount: number;
}

export default function BillingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Mock Invoice Data
  const invoices: Invoice[] = [
    {
      id: "36543",
      status: "UNPAID",
      total: 1050.0,
      invoiceDate: "29 Aug 2026",
      dueDate: "02 Jul 2026",
      datePaid: "—",
      subtotal: 500.0,
      previousDues: 500.0,
      credit: 0.0,
      vatRate: 5,
      vatAmount: 50.0,
      items: [
        {
          description: "Cloud IP PBX - Previous Outstanding Dues",
          details: ["(02 Jul 2026 - 02 Aug 2026)"],
          vat: "",
          unitCost: 500.0,
          qty: 1,
          total: 500.0,
        },
        {
          description: "Cloud IP PBX - 1 Month Package",
          details: [
            "* Call Recording: Yes",
            "* Voice SMS: Yes",
            "* Call Forwarding: Yes",
            "* Call Conference: Yes",
            "* Call Monitoring: Yes",
            "(02 Aug 2026 - 02 Sep 2026)",
          ],
          vat: "Yes",
          unitCost: 500.0,
          qty: 1,
          total: 500.0,
        },
      ],
    },
    {
      id: "36454",
      status: "CANCELLED",
      total: 1050.0,
      invoiceDate: "12 Aug 2026",
      dueDate: "02 Jul 2026",
      datePaid: "—",
      subtotal: 500.0,
      previousDues: 500.0,
      credit: 0.0,
      vatRate: 5,
      vatAmount: 50.0,
      items: [],
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "UNPAID":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 print:border-none print:p-0 print:text-rose-600 print:bg-transparent">
            <Clock className="w-3 h-3 print:hidden" />
            <span>Unpaid</span>
          </span>
        );
      case "PAID":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200 print:border-none print:p-0 print:text-emerald-600 print:bg-transparent">
            <CheckCircle2 className="w-3 h-3 print:hidden" />
            <span>Paid</span>
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 print:border-none print:p-0 print:text-slate-600 print:bg-transparent">
            <XCircle className="w-3 h-3 print:hidden" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-8xl mx-auto space-y-6 min-h-screen p-4 md:p-6 text-slate-800">
      {/* ------------------------------------------------------------- */}
      {/* VIEW 1: INVOICE LIST & SUMMARY DASHBOARD                     */}
      {/* ------------------------------------------------------------- */}
      {!selectedInvoice ? (
        <div className="print:hidden space-y-6">
          {/* Header Summary Banner */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-wide">
                Billing Overview
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Current status of your invoices, outstanding balance, and payments.
              </p>
            </div>

            <div className="flex items-center divide-x divide-slate-200 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="px-4 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Invoices Due
                </span>
                <p className="text-lg font-black text-rose-600 font-mono">
                  BDT 1,050.00 TK
                </p>
              </div>
              <div className="px-4 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Total Paid
                </span>
                <p className="text-lg font-black text-emerald-600 font-mono">
                  BDT 0.00 TK
                </p>
              </div>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-primary border border-blue-100">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-wide">
                  Invoices
                </h3>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-primary text-white font-bold tracking-wider uppercase border-b border-blue-500">
                    <th className="py-3.5 px-4">Invoice #</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Total</th>
                    <th className="py-3.5 px-4">Invoice Date</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Date Paid</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-50 transition duration-150"
                    >
                      <td className="py-4 px-4 font-bold text-primary font-mono">
                        #{inv.id}
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(inv.status)}</td>
                      <td className="py-4 px-4 font-bold text-slate-900 font-mono">
                        BDT {inv.total.toFixed(2)} TK
                      </td>
                      <td className="py-4 px-4">{inv.invoiceDate}</td>
                      <td className="py-4 px-4">{inv.dueDate}</td>
                      <td className="py-4 px-4 text-slate-400">{inv.datePaid}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-blue-50 text-primary hover:bg-primary hover:text-white transition border border-blue-200"
                          title="View Details"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* VIEW 2: INVOICE DETAIL & MUSHAK 6.3 PRINTABLE VIEW           */
        /* ------------------------------------------------------------- */
        <div className="space-y-6">
          {/* Top Control Bar - Hidden when printing */}
          <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to invoices</span>
            </button>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition flex items-center space-x-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay with Credit</span>
              </button>
              <button className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-blue-500 transition shadow-md shadow-primary/10 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Pay Now!</span>
              </button>
              
              {/* Connected Print Button */}
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition flex items-center space-x-1.5 shadow-sm">
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white transition flex items-center space-x-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel Invoice</span>
              </button>
            </div>
          </div>

          {/* Printable Mushak 6.3 Document */}
          <div className="printable-document bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-md text-slate-800 text-xs print:p-0 print:border-none print:shadow-none print:rounded-none">
            {/* National Header */}
            <div className="text-center space-y-0.5 mb-8">
              <p className="font-bold text-slate-900 text-sm">
                The Government of the People's Republic of Bangladesh
              </p>
              <p className="text-xs text-slate-700">
                National Board of Revenue
              </p>
              <p className="font-bold text-slate-900 text-xs">Mushak:6.3</p>
            </div>

            {/* Invoice Header Details Grid */}
            <div className="grid grid-cols-12 gap-4 mb-8">
              {/* Brand & Client Info */}
              <div className="col-span-12 md:col-span-5 print:col-span-5 space-y-4">
                <div className="flex items-center space-x-2 text-primary font-black text-xl">
                  <Building2 className="w-6 h-6" />
                  <span className="tracking-tight">AI CALL BD</span>
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">To:</span>
                  <p className="font-bold text-slate-900">ai call bd</p>
                  <p className="text-slate-700">nahl</p>
                  <p className="text-slate-700">kajol.arishiaan@gmail.com</p>
                  <p className="text-slate-700">01786907129</p>
                </div>
              </div>

              {/* Vendor Info */}
              <div className="col-span-12 md:col-span-4 print:col-span-4 space-y-0.5 pt-0 md:pt-10 print:pt-10">
                <span className="font-bold text-slate-900">From:</span>
                <p className="font-bold text-slate-900">AI Call BD</p>
                <p className="text-slate-700">House No. 409/1 (1st Floor)</p>
                <p className="text-slate-700">South Monipur, Kazipara</p>
                <p className="text-slate-700">Mirpur-12, Dhaka-1216, Bangladesh</p>
                <p className="text-slate-700">BIN-0021637020101</p>
              </div>

              {/* Invoice Meta */}
              <div className="col-span-12 md:col-span-3 print:col-span-3 text-left md:text-right print:text-right space-y-1">
                <p className="font-bold text-slate-900">
                  Invoice <span className="font-mono">{selectedInvoice.id}</span>
                </p>
                <p className="text-slate-700">
                  Date of Invoice{" "}
                  <span className="font-bold">{selectedInvoice.invoiceDate}</span>
                </p>
                <p className="text-slate-700">
                  Due Date{" "}
                  <span className="font-bold">{selectedInvoice.dueDate}</span>
                </p>
                <div className="pt-1 font-bold text-slate-900">
                  Status: {getStatusBadge(selectedInvoice.status)}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr className="border-b border-t border-slate-300 text-slate-900 font-bold bg-slate-50 print:bg-transparent">
                  <th className="py-2.5 px-2">Description</th>
                  <th className="py-2.5 px-2 text-center">VAT</th>
                  <th className="py-2.5 px-2 text-right">Unit cost</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {selectedInvoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-2 space-y-0.5">
                      <p className="font-bold text-slate-900">
                        {item.description}
                      </p>
                      {item.details && (
                        <div className="text-[11px] text-slate-700 space-y-0.5">
                          {item.details.map((d, i) => (
                            <p key={i}>{d}</p>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center align-middle">
                      {item.vat}
                    </td>
                    <td className="py-3 px-2 text-right align-middle font-mono">
                      BDT {item.unitCost.toFixed(2)} TK
                    </td>
                    <td className="py-3 px-2 text-center align-middle font-mono">
                      {item.qty}
                    </td>
                    <td className="py-3 px-2 text-right align-middle font-mono font-semibold">
                      BDT {item.total.toFixed(2)} TK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div className="flex justify-end pt-2 border-t border-slate-300 mb-16">
              <div className="w-full md:w-80 print:w-80 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Subtotal:</span>
                  <span className="font-mono">
                    BDT {selectedInvoice.subtotal.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Previous Dues:</span>
                  <span className="font-mono">
                    BDT {selectedInvoice.previousDues.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Credit:</span>
                  <span className="font-mono">
                    BDT {selectedInvoice.credit.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>VAT ({selectedInvoice.vatRate}.00%):</span>
                  <span className="font-mono">
                    BDT {selectedInvoice.vatAmount.toFixed(2)} TK
                  </span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-2 border-t border-slate-300">
                  <span>Total:</span>
                  <span className="font-mono text-base">
                    BDT {selectedInvoice.total.toLocaleString("en-US", { minimumFractionDigits: 2 })} TK
                  </span>
                </div>
              </div>
            </div>

            {/* Legal / Footer Note */}
            <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-600 space-y-0.5">
              <p>Price excluding all taxes. We are ITES entity.</p>
              <p>Manual signature is not required for system generated invoice.</p>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS Overrides for Crisp Paper Printing */}
      <style jsx global>{`
        @media print {
          /* Hide non-printable UI elements */
          body * {
            visibility: hidden;
            background: transparent !important;
          }
          
          /* Show only the invoice sheet */
          .printable-document,
          .printable-document * {
            visibility: visible;
            color: #000000 !important;
          }

          /* Force exact positioning and paper width */
          .printable-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  );
}