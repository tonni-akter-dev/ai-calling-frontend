export const tags = {
  users: "Users",
  tickets: "Tickets",
  contacts: "Contacts",
  voiceFiles: "VoiceFiles",
  subscriptions: "Subscriptions",
  plans: "Plans",
  dashboard: "Dashboard",
  campaigns: "Campaigns",
  wallet: "Wallet",
  settings: "Settings",
  contactMessages: "ContactMessages",
} as const;

export type Tag = (typeof tags)[keyof typeof tags];

export const tagsArray: Tag[] = Object.values(tags);
