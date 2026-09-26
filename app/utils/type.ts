import { Contact } from "../redux/features/apis/contactApi";

// ============================================
// Contact Types
// ============================================
export type ContactStatus = "Active" | "Unsubscribed" | "Bounced";

export type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  group: string;
  status: ContactStatus;
};

export interface ContactMetrics {
  totalContacts: number;
  activeReachable: number;
  unsubscribed: number;
  bounced: number;
}

export interface ContactListResponse {
  contacts: Contact[];
  metrics: ContactMetrics;
}

// ============================================
// Voice File Types
// (AI Call BD + DB save)
// ============================================
export interface VoiceFile {
  id: string;              // cuid (DB primary key)
  userId: string;
  name: string;            // voice_name
  audioUrl: string;        // public audio URL
  campaignId: string;      // AI Call BD campaign_id (v14_xxxxx)
  format: string;          // MP3 / WAV / OGG / AUDIO
  createdAt: string;
  updatedAt: string;
}

export interface VoiceFileResponse {
  status: "success" | "error";
  data: VoiceFile[];
  message?: string;
}

export interface UploadVoiceFileResponse {
  status: "success" | "error";
  data?: VoiceFile;
  campaign_id?: string;    // AI Call BD থেকে পাওয়া
  message?: string;
}

export interface DeleteVoiceFileResponse {
  status: "success" | "error";
  message?: string;
}

export interface VoiceFileSearchParams {
  search?: string;
  format?: string;
  page?: number;
  per_page?: number;
}

// ============================================
// Subscription Types
// ============================================
export interface Subscription {
  id: number;
  company_id: number;
  plan_id: number;
  status: string;
  calls_used_this_period: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
  plan_name: string;
  price_bdt: number | string;
  monthly_call_limit: number;
  max_concurrent_calls: number;
  company_name: string;
  company_email: string;

  // 🆕 from API
  wallet_balance_bdt?: string | number;

  // 🆕 computed wallet block
  wallet?: {
    balance: number;
    total_added: number;
    total_used: number;
    currency: string;
  };

  users: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
  }>;
}

// ============================================
// Support Ticket Types
// ============================================
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketCategory = "Complaint" | "Request" | "Billing";

export interface ApiTicket {
  id: string;
  ticketId: number;
  companyId: number;
  companyName: string;
  companyEmail: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  category: TicketCategory;
  type: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  attachment: string | null;
  resolutionNote: string | null;
  messages: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// FAQ Types
// ============================================
export interface FaqItem {
  question: string;
  answer: string;
}