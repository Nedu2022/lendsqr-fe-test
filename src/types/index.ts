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
