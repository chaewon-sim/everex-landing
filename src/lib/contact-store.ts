export interface ContactInquiry {
  id: number;
  name: string;
  company: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  privacyAgreed: boolean;
  createdAt: string;
  status: "pending" | "reviewed";
}

let inquiries: ContactInquiry[] = [];
let nextId = 1;

export function createInquiry(
  data: Omit<ContactInquiry, "id" | "createdAt" | "status">
): ContactInquiry {
  const inquiry: ContactInquiry = {
    id: nextId++,
    ...data,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  inquiries.push(inquiry);
  return inquiry;
}

export function getInquiries(): ContactInquiry[] {
  return [...inquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
