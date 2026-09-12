import { Contact } from "../redux/features/apis/contactApi";

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

export interface VoiceFile {
  id: number;
  sn: number;
  name: string;
  campaignName: string;
  format: string;
  size: string;
  url: string;
}

export interface VoiceFileResponse {
  success: boolean;
  total: number;
  data: VoiceFile[];
}

export interface UploadVoiceFileResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    format: string;
    size: string;
    url: string;
  };
}

export interface DeleteVoiceFileResponse {
  success: boolean;
  message: string;
}

export interface VoiceFileSearchParams {
  search?: string;
  filter?: string;
}
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
  price_bdt: number;
  monthly_call_limit: number;
  max_concurrent_calls: number;
  company_name: string;
  company_email: string;
  users: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
  }>;
}

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

export interface FaqItem {
  question: string;
  answer: string;
}
