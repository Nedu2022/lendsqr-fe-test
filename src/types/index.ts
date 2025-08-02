
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
  createdAt: string;
  date_joined: any;
  phoneNumber: any;
  personal_info: any;
  profile: any;
  id: string;
  name: string;
  username: string;
  email: string;
  phone: number;
  bvn: number;
  gender: string;
  maritalStatus: string;
  children: string;
  residence: string;

  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: number[];
  loanRepayment: number;

  twitter: string;
  facebook: string;
  instagram: string;

  accountNumber: number;
  accountBalance: string;
  bankName: string;

  status: string;
  dateJoined: string;
  organization: string;
  tier: number;

  guarantor: {
    fullName: string;
    phone: number;
    phoneNumber?: number; 
    email: string;
    relationship: string;
  };
}


