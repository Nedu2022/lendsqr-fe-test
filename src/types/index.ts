
export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

export interface ExtendedUser {
  id: string;
  organisation?: string;
  orgName?: string;
  organization?: string;
  name?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  status?: string;
  createdAt?: string;
  date_joined?: string;
  accountBalance?: string;
  educationLevel?: string;
  sector?: string;
  employmentDuration?: string;
  personal_info?: {
    full_name?: string;
    email?: string;
    phone?: string;
  };
  profile?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
  };
}
