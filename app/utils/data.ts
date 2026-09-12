import { CheckCircle2, Clock, CreditCard, InfinityIcon, LayoutDashboard, Megaphone, PhoneCall, Receipt, Settings, Ticket, Users, Volume2 } from "lucide-react";

export const GROUPS = [
  "VIP Customers",
  "Promo Subscribers",
  "Inactive Users",
];


export const menu = [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Subscriptions",
        href: "/admin/subscriptions",
        icon: CreditCard,
      },
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "Campaigns",
        href: "/admin/campaigns",
        icon: Megaphone,
      },
      {
        label: "Payments",
        href: "/admin/payments",
        icon: Receipt,
      },
      {
        label: "Support Tickets",
        href: "/admin/tickets",
        icon: Ticket,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
  
];


export const features = [
  {
    icon: "৳",
    isText: true,
    title: "Call Rate: 40 Paisa + 15% VAT",
    description:
      "One of the most competitive call rates in Bangladesh with transparent billing.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    icon: InfinityIcon,
    title: "No Recharge Expiry",
    description:
      "Your balance never expires. Use it whenever you need — no pressure, no waste.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    hoverBg: "group-hover:bg-orange-500",
  },
  {
    icon: Clock,
    title: "Per Second Pulse",
    description:
      "Pay only for the exact seconds you talk. No rounding up, no extra charges.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBg: "group-hover:bg-emerald-600",
  },
  {
    icon: PhoneCall,
    title: "Free IP-to-IP Calls",
    description:
      "Calls between IP Numbers and Extensions are completely free of charge.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBg: "group-hover:bg-blue-600",
  },
  {
    icon: CheckCircle2,
    title: "Free Incoming Calls",
    description:
      "Receive unlimited incoming calls without any charges.",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    hoverBg: "group-hover:bg-pink-600",
  },
  {
    icon: Volume2,
    title: "Promotional SMS & Voice",
    description:
      "Send promotional SMS and voice messages directly from your IP number.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    hoverBg: "group-hover:bg-amber-500",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}
export const faqs: FAQItem[] = [
  {
    question: "What is aicall.bd?",
    answer:
      "aicall.bd is a business communication platform designed to help businesses manage Cloud PBX, business IP numbers, customer calls, voice campaigns, call recordings, contacts, billing, and communication activity.",
  },
  {
    question: "Who can use aicall.bd?",
    answer:
      "E-commerce businesses, corporate offices, call centers, real estate companies, clinics and healthcare businesses, educational organizations, courier and delivery businesses, agencies, and other customer-facing organizations can use supported solutions.",
  },
  {
    question: "What is Cloud PBX?",
    answer:
      "Cloud PBX is a cloud-based business phone system that can provide a business number, extensions, IVR, call routing, call transfer, call forwarding, call history, and other supported calling functions.",
  },
  {
    question: "Can one business number be used by multiple employees?",
    answer:
      "Yes. A Cloud PBX setup can connect multiple employees or departments through individual extensions under one official business number.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. The platform should be designed for easy management, and the aicall.bd team can assist with supported setup and configuration.",
  },
  {
    question: "Can I use a mobile phone or computer?",
    answer:
      "Supported SIP and softphone applications can be used on compatible devices. Exact compatibility should be confirmed during setup.",
  },
  {
    question: "Can I record calls?",
    answer:
      "Supported calls can be recorded through the available recording service and settings.",
  },
  {
    question: "What is Bulk Voice Call?",
    answer:
      "Bulk Voice Call allows businesses to send automated voice messages to large customer groups for supported campaigns.",
  },
  {
    question: "Can Bulk Voice connect to my software?",
    answer:
      "API integration can be offered for supported Bulk Voice workflows. Technical requirements should be confirmed before implementation.",
  },
  {
    question: "What can I use Bulk Voice for?",
    answer:
      "Promotions, payment reminders, order notifications, appointment reminders, event announcements, customer feedback, and awareness campaigns.",
  },
  {
    question: "What is a corporate IP number?",
    answer:
      "It is a business-facing number designed to work with internet-based voice communication and Cloud PBX systems.",
  },
  {
    question: "Can I use a caller tune for my business?",
    answer:
      "Yes. aicall.bd can provide custom voice greetings for welcome messages, IVR, promotional announcements, and after-hours messages.",
  },
  {
    question: "How do I recharge?",
    answer:
      "Users can recharge through the supported payment and wallet flow inside the application.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, subject to available packages and service terms.",
  },
  {
    question: "Do you support larger businesses?",
    answer:
      "Yes. Businesses with larger teams or custom routing, integrations, or capacity requirements can request a custom plan.",
  },
  {
    question: "How do I get a demo?",
    answer:
      'Click "Start Free Demo" or "Request a Demo" and submit your business details. The sales/support team can then guide you through the platform.',
  },
  {
    question: "How do I contact support?",
    answer:
      "Use the Contact page, phone, WhatsApp, email, or the support channel provided inside the application.",
  },
];


export interface BlogSection {
  type: "paragraph" | "heading" | "list" | "table" | "quote";
  content?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "cloud-pbx-bangladesh-complete-guide",
    title: "Cloud PBX in Bangladesh: Complete Guide for Businesses",
    category: "Cloud PBX",
    date: "June 15, 2025",
    readTime: "8 min read",
    excerpt:
      "Everything you need to know about Cloud PBX in Bangladesh — features, benefits, setup, and how it can transform your business communication.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Cloud PBX has become the standard for modern business communication in Bangladesh. Unlike traditional on-premise phone systems, Cloud PBX runs on the internet — giving businesses the flexibility, scalability, and cost savings they need to grow.",
      },
      {
        type: "heading",
        content: "What is Cloud PBX?",
      },
      {
        type: "paragraph",
        content:
          "Cloud PBX (Private Branch Exchange) is a cloud-hosted business phone system that manages extensions, IVR, call routing, call transfer, and call recording — all without any physical hardware in your office. Your team simply uses a softphone, mobile app, or IP desk phone to make and receive calls.",
      },
      {
        type: "heading",
        content: "Key Benefits for Bangladeshi Businesses",
      },
      {
        type: "list",
        items: [
          "Lower upfront investment — no physical PBX hardware required",
          "Scales easily as your team grows",
          "Centralized management from one dashboard",
          "Extensions and IVR for professional call handling",
          "Call recording for quality and training",
          "Integrates with CRM and other business tools",
        ],
      },
      {
        type: "heading",
        content: "How Cloud PBX Compares",
      },
      {
        type: "table",
        headers: ["Feature", "Traditional PBX", "Cloud PBX"],
        rows: [
          ["Setup Cost", "High (hardware)", "Low (cloud-based)"],
          ["Scalability", "Limited", "Unlimited"],
          ["Maintenance", "On-site team", "Managed by provider"],
          ["Remote Access", "Difficult", "Built-in"],
          ["Recording", "Extra hardware", "Included options"],
        ],
      },
      {
        type: "heading",
        content: "Getting Started with aicall.bd",
      },
      {
        type: "paragraph",
        content:
          "aicall.bd makes it easy for businesses across Bangladesh to set up Cloud PBX in just a few steps. You get a corporate IP number, extensions for your team, IVR, and centralized management — all from one platform.",
      },
    ],
  },
  {
    id: 2,
    slug: "how-to-get-corporate-ip-number-bangladesh",
    title: "How to Get a Corporate IP Number in Bangladesh",
    category: "IP Calling",
    date: "June 12, 2025",
    readTime: "6 min read",
    excerpt:
      "A step-by-step guide on how to get a corporate IP number in Bangladesh, including requirements, setup process, and what to expect.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "A corporate IP number gives your business one official number that customers can call. It works with internet-based voice communication and connects to your Cloud PBX system.",
      },
      {
        type: "heading",
        content: "Why Your Business Needs an IP Number",
      },
      {
        type: "list",
        items: [
          "One consistent customer-facing number",
          "Works with extensions for your entire team",
          "Supports IVR and call routing",
          "Compatible with SIP and softphone applications",
          "Centralized call management and reporting",
        ],
      },
      {
        type: "heading",
        content: "Steps to Get Your IP Number",
      },
      {
        type: "list",
        items: [
          "Share your business name, preferred use, and number of extensions",
          "Check availability of supported business numbers",
          "Complete the PBX / SIP setup with our team",
          "Add extensions, devices, or softphones for your team",
          "Go live and start receiving business calls",
        ],
      },
      {
        type: "quote",
        content:
          "One business number. One communication system. Complete control.",
      },
    ],
  },
  {
    id: 3,
    slug: "ip-calling-vs-traditional-business-phone-systems",
    title: "IP Calling vs Traditional Business Phone Systems",
    category: "IP Calling",
    date: "June 10, 2025",
    readTime: "7 min read",
    excerpt:
      "Compare IP calling and traditional phone systems — cost, features, scalability, and which one is right for your business.",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Choosing between IP calling and traditional business phone systems can significantly impact your business. Here's a complete comparison to help you decide.",
      },
      {
        type: "heading",
        content: "Feature Comparison",
      },
      {
        type: "table",
        headers: ["Feature", "Traditional", "IP Calling"],
        rows: [
          ["Setup Cost", "High", "Low"],
          ["Billing", "Per minute", "Flexible"],
          ["Internal Calls", "Charged", "Often free"],
          ["Setup", "Hardware needed", "Cloud-based"],
          ["Scalability", "Limited", "Unlimited"],
          ["Remote Access", "Difficult", "Built-in"],
        ],
      },
      {
        type: "heading",
        content: "Which Should You Choose?",
      },
      {
        type: "paragraph",
        content:
          "If you're a growing business that needs flexibility, easy scaling, and lower costs — IP calling with Cloud PBX is the clear winner. For very small setups with minimal calling needs, traditional systems might still work, but IP calling is the future.",
      },
    ],
  },
  {
    id: 4,
    slug: "cloud-pbx-cost-bangladesh",
    title: "How Much Does Cloud PBX Cost in Bangladesh?",
    category: "Pricing & Cost Guides",
    date: "June 8, 2025",
    readTime: "5 min read",
    excerpt:
      "Understand Cloud PBX pricing in Bangladesh — monthly fees, setup costs, calling charges, and how to budget for your business.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Understanding Cloud PBX cost is important when planning your business communication budget. Here's what you need to know.",
      },
      {
        type: "heading",
        content: "Typical Cost Components",
      },
      {
        type: "list",
        items: [
          "Monthly platform fee (based on extensions and channels)",
          "Calling charges (per-minute, separate from platform fee)",
          "Setup fees (if applicable)",
          "Optional add-ons like call recording",
          "VAT and taxes",
        ],
      },
      {
        type: "paragraph",
        content:
          "aicall.bd keeps pricing transparent. Monthly platform fees are shown separately from usage-based calling charges and optional services.",
      },
    ],
  },
  {
    id: 5,
    slug: "how-to-set-up-ivr-for-business",
    title: "How to Set Up an IVR for Your Business",
    category: "Tutorials",
    date: "June 5, 2025",
    readTime: "6 min read",
    excerpt:
      "Learn how to set up an IVR (Interactive Voice Response) system for your business to route calls and improve customer experience.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "An IVR (Interactive Voice Response) system helps route incoming calls to the right department or person automatically. Here's how to set it up for your business.",
      },
      {
        type: "heading",
        content: "What You'll Need",
      },
      {
        type: "list",
        items: [
          "A Cloud PBX system with IVR support",
          "A list of your departments or team members",
          "A welcome greeting script",
          "Menu options (e.g., Press 1 for Sales, Press 2 for Support)",
        ],
      },
      {
        type: "heading",
        content: "Steps to Set Up IVR",
      },
      {
        type: "list",
        items: [
          "Plan your call flow and menu structure",
          "Record or generate voice greetings",
          "Configure IVR in your Cloud PBX dashboard",
          "Assign extensions to each menu option",
          "Test the flow and go live",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "business-call-recording-improves-customer-service",
    title: "How Business Call Recording Improves Customer Service",
    category: "Customer Service",
    date: "June 3, 2025",
    readTime: "6 min read",
    excerpt:
      "Discover how call recording helps businesses improve customer service quality, train teams, and resolve disputes effectively.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Call recording is one of the most practical tools a business can use to improve customer service. Here's why it matters and how to use it effectively.",
      },
      {
        type: "heading",
        content: "Key Benefits of Call Recording",
      },
      {
        type: "list",
        items: [
          "Quality monitoring — review real conversations",
          "Customer support improvement — identify pain points",
          "Staff training — use real examples for coaching",
          "Sales review — understand what works",
          "Dispute resolution — verify details",
          "Record keeping — maintain compliance records",
        ],
      },
      {
        type: "paragraph",
        content:
          "aicall.bd supports call recording so your business can review conversations, improve service quality, support training, and maintain useful business records.",
      },
    ],
  },
  {
    id: 7,
    slug: "bulk-voice-call-business-use-cases",
    title: "Bulk Voice Call: 10 Practical Business Use Cases",
    category: "Business Communication",
    date: "May 30, 2025",
    readTime: "7 min read",
    excerpt:
      "Explore 10 practical use cases of bulk voice calls — from order confirmations to payment reminders and event announcements.",
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Bulk Voice Call lets your business reach thousands of customers with automated voice messages. Here are 10 practical use cases that deliver real business value.",
      },
      {
        type: "heading",
        content: "10 Use Cases",
      },
      {
        type: "list",
        items: [
          "Order confirmation calls for e-commerce",
          "Payment reminder calls",
          "Appointment reminders for clinics",
          "Promotional announcements",
          "Event invitations and reminders",
          "Customer feedback collection",
          "Awareness campaigns",
          "Delivery notifications",
          "Subscription renewal reminders",
          "Holiday greetings and offers",
        ],
      },
    ],
  },
  {
    id: 8,
    slug: "how-to-send-automated-voice-campaigns",
    title: "How to Send Automated Voice Campaigns",
    category: "Tutorials",
    date: "May 28, 2025",
    readTime: "6 min read",
    excerpt:
      "A complete tutorial on creating and sending automated voice campaigns to reach thousands of customers instantly.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Automated voice campaigns let you reach large customer groups without calling one by one. Here's how to set one up.",
      },
      {
        type: "heading",
        content: "Steps to Create a Campaign",
      },
      {
        type: "list",
        items: [
          "Upload your contact list",
          "Create or upload your voice message",
          "Schedule the campaign",
          "Monitor delivery and status",
          "Review campaign reports",
        ],
      },
    ],
  },
  {
    id: 9,
    slug: "business-communication-setup-ecommerce",
    title: "Best Business Communication Setup for E-commerce",
    category: "Industry Solutions",
    date: "May 25, 2025",
    readTime: "6 min read",
    excerpt:
      "Discover the ideal communication setup for e-commerce businesses — order confirmations, delivery alerts, and customer follow-ups.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "E-commerce businesses depend on reliable, scalable communication. Here's the ideal setup for online stores in Bangladesh.",
      },
      {
        type: "heading",
        content: "Recommended Setup",
      },
      {
        type: "list",
        items: [
          "Cloud PBX with corporate IP number",
          "Bulk voice campaigns for order confirmations",
          "Call recording for customer disputes",
          "Contact management for customer follow-ups",
          "Reports for call and campaign analytics",
        ],
      },
    ],
  },
  {
    id: 10,
    slug: "real-estate-teams-cloud-calling",
    title: "How Real Estate Teams Can Manage Leads With Cloud Calling",
    category: "Industry Solutions",
    date: "May 22, 2025",
    readTime: "5 min read",
    excerpt:
      "Learn how real estate teams can use Cloud PBX and cloud calling to manage leads, follow up faster, and close more deals.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Real estate is a relationship-driven business. Faster follow-up means more deals. Cloud calling helps real estate teams manage leads efficiently.",
      },
      {
        type: "heading",
        content: "How Cloud Calling Helps",
      },
      {
        type: "list",
        items: [
          "One official number for all agents",
          "Extensions for each team member",
          "Call recording for training and review",
          "Contact groups for lead management",
          "Reports to track follow-up activity",
        ],
      },
    ],
  },
  {
    id: 11,
    slug: "clinics-appointment-reminder-calls",
    title: "How Clinics Can Use Appointment Reminder Calls",
    category: "Industry Solutions",
    date: "May 20, 2025",
    readTime: "5 min read",
    excerpt:
      "Reduce no-shows and improve patient experience using automated appointment reminder calls for your clinic or healthcare business.",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Missed appointments cost clinics time and money. Automated reminder calls help reduce no-shows and improve patient experience.",
      },
      {
        type: "heading",
        content: "Benefits for Clinics",
      },
      {
        type: "list",
        items: [
          "Automated appointment reminders",
          "Reduce no-shows significantly",
          "Improve patient experience",
          "Free up receptionist time",
          "Simple reporting on reminder effectiveness",
        ],
      },
    ],
  },
  {
    id: 12,
    slug: "cloud-pbx-for-call-centers",
    title: "Cloud PBX for Call Centers: What to Look For",
    category: "Call Center",
    date: "May 18, 2025",
    readTime: "7 min read",
    excerpt:
      "Key features and considerations when choosing a Cloud PBX solution for your call center operations in Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Call centers have unique requirements. Here's what to look for in a Cloud PBX solution built for call center operations.",
      },
      {
        type: "heading",
        content: "Must-Have Features",
      },
      {
        type: "list",
        items: [
          "Agent extensions and team management",
          "Call routing and IVR",
          "Call recording with storage",
          "Real-time and historical reports",
          "Call disposition and outcome tagging",
          "Role-based staff access",
        ],
      },
    ],
  },
  {
    id: 13,
    slug: "reduce-manual-customer-calling",
    title: "How to Reduce Manual Customer Calling",
    category: "Business Communication",
    date: "May 15, 2025",
    readTime: "5 min read",
    excerpt:
      "Learn how businesses can reduce manual and repetitive calling with automation, bulk voice, and smart call management.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Manual calling is time-consuming and expensive. Here's how automation can help your team focus on higher-value work.",
      },
      {
        type: "heading",
        content: "Automation Strategies",
      },
      {
        type: "list",
        items: [
          "Use Bulk Voice Campaigns for repetitive messages",
          "Schedule automated reminders",
          "Set up call routing to reduce transfers",
          "Use contact groups for organized follow-ups",
          "Track activity with reports instead of manual logs",
        ],
      },
    ],
  },
  {
    id: 14,
    slug: "ip-phone-vs-softphone",
    title: "IP Phone vs Softphone: Which Is Better for Your Team?",
    category: "IP Calling",
    date: "May 12, 2025",
    readTime: "6 min read",
    excerpt:
      "Compare IP desk phones and softphone applications — features, cost, mobility, and which one fits your team's workflow.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Both IP desk phones and softphones can be used with Cloud PBX. Which one is right depends on your team's workflow.",
      },
      {
        type: "table",
        headers: ["Factor", "IP Phone", "Softphone"],
        rows: [
          ["Mobility", "Fixed desk", "Anywhere with internet"],
          ["Cost", "Higher upfront", "Lower"],
          ["Setup", "Hardware setup", "App download"],
          ["Best For", "Fixed desks", "Remote / mobile teams"],
        ],
      },
    ],
  },
  {
    id: 15,
    slug: "zoiper-sip-softphones-business-calling",
    title: "How to Use Zoiper or SIP Softphones for Business Calling",
    category: "Tutorials",
    date: "May 10, 2025",
    readTime: "6 min read",
    excerpt:
      "Step-by-step guide on configuring Zoiper and other SIP softphones for your business calling setup.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "SIP softphones like Zoiper let you make and receive business calls from your phone or computer. Here's how to set one up.",
      },
      {
        type: "heading",
        content: "Setup Steps",
      },
      {
        type: "list",
        items: [
          "Download and install Zoiper or another SIP softphone",
          "Enter the SIP credentials provided by your provider",
          "Test the connection with a test call",
          "Configure caller ID and audio settings",
          "Start making and receiving business calls",
        ],
      },
    ],
  },
  {
    id: 16,
    slug: "professional-business-call-flow",
    title: "How to Build a Professional Business Call Flow",
    category: "Tutorials",
    date: "May 8, 2025",
    readTime: "7 min read",
    excerpt:
      "Design a professional call flow for your business — greetings, IVR menus, routing, and escalation paths.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "A well-designed call flow makes your business look professional and reduces caller frustration. Here's how to build one.",
      },
      {
        type: "heading",
        content: "Key Components",
      },
      {
        type: "list",
        items: [
          "Welcome greeting with your business name",
          "IVR menu with clear options",
          "Routing to correct department or agent",
          "Escalation path to a human",
          "After-hours message and voicemail",
        ],
      },
    ],
  },
  {
    id: 17,
    slug: "call-recording-policy-businesses",
    title: "Call Recording Policy: What Businesses Should Consider",
    category: "Customer Service",
    date: "May 5, 2025",
    readTime: "6 min read",
    excerpt:
      "Learn about the key considerations for a call recording policy — consent, storage, access, and compliance in Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Call recording offers major benefits — but it also requires responsible handling. Here's what businesses should consider.",
      },
      {
        type: "heading",
        content: "Key Considerations",
      },
      {
        type: "list",
        items: [
          "Inform customers that calls may be recorded",
          "Define who can access recordings",
          "Set retention and storage duration",
          "Train staff on appropriate use",
          "Follow applicable laws and regulations",
        ],
      },
    ],
  },
  {
    id: 18,
    slug: "calculate-business-calling-costs",
    title: "How to Calculate Business Calling Costs",
    category: "Pricing & Cost Guides",
    date: "May 3, 2025",
    readTime: "5 min read",
    excerpt:
      "Understand how to calculate your business calling costs — monthly fees, per-minute rates, and how to optimize spending.",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Understanding your calling costs helps you budget and optimize. Here's a simple framework to calculate them.",
      },
      {
        type: "heading",
        content: "Cost Components",
      },
      {
        type: "list",
        items: [
          "Monthly platform fee",
          "Per-minute calling charges",
          "Optional add-ons (recording, extra channels)",
          "VAT and taxes",
        ],
      },
      {
        type: "paragraph",
        content:
          "Track usage regularly to spot patterns and reduce unnecessary spending.",
      },
    ],
  },
  {
    id: 19,
    slug: "business-communication-checklist-new-companies",
    title: "Business Communication Checklist for New Companies",
    category: "Business Communication",
    date: "May 1, 2025",
    readTime: "6 min read",
    excerpt:
      "A practical checklist for new companies to set up their business communication — numbers, extensions, IVR, and more.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Starting a new company? Here's a practical checklist for setting up your business communication the right way.",
      },
      {
        type: "heading",
        content: "Checklist",
      },
      {
        type: "list",
        items: [
          "Get a corporate IP number",
          "Set up Cloud PBX with extensions",
          "Configure IVR for incoming calls",
          "Establish call recording policy",
          "Add contacts and organize by groups",
          "Set up reports and monitoring",
        ],
      },
    ],
  },
  {
    id: 20,
    slug: "choose-right-cloud-pbx-plan",
    title: "How to Choose the Right Cloud PBX Plan",
    category: "Cloud PBX",
    date: "April 28, 2025",
    readTime: "6 min read",
    excerpt:
      "Learn how to choose the right Cloud PBX plan based on your team size, call volume, and communication requirements.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
    author: "aicall.bd Team",
    authorRole: "Business Communication Experts",
    sections: [
      {
        type: "paragraph",
        content:
          "Choosing the right Cloud PBX plan means matching features to your actual needs. Here's how to decide.",
      },
      {
        type: "heading",
        content: "Factors to Consider",
      },
      {
        type: "list",
        items: [
          "Team size — number of extensions needed",
          "Call volume — concurrent channels required",
          "Features — IVR, recording, forwarding",
          "Growth plans — future scalability",
          "Budget — monthly platform fee and usage",
        ],
      },
    ],
  },
];


export const blogCategories = [
  "All",
  "IP Calling",
  "Cloud PBX",
  "Business Communication",
  "Call Center",
  "Customer Service",
  "Tutorials",
  "Industry Solutions",
  "Pricing & Cost Guides",
  "API & Automation",
];
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getRelatedPosts = (
  currentSlug: string,
  category: string,
  limit = 3
): BlogPost[] => {
  return blogPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
};