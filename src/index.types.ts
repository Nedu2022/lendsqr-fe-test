// // Improved API Service with better data handling
// class UserApiService {
//   private baseUrl = 'http://localhost:4000';

//   // Transform API user data to ExtendedUser format with better null handling
//   transformApiUserToExtended(apiUser: ApiUser): ExtendedUser {
//     return {
//       id: apiUser.id || '',
//       organization: apiUser.organization || '',
//       username: apiUser.username || '',
//       email: apiUser.email || '',
//       phoneNumber: apiUser.phoneNumber || '',
//       dateJoined: apiUser.dateJoined || '',
//       status: (apiUser.status as 'Active' | 'Inactive' | 'Pending' | 'Blacklisted') || 'Inactive',
      
//       // Personal Information - with better fallbacks
//       bvn: apiUser.bvn || undefined,
//       gender: apiUser.gender || undefined,
//       maritalStatus: apiUser.maritalStatus || undefined,
//       children: apiUser.children || undefined,
//       residence: apiUser.residence || undefined,
      
//       // Education and Employment - with safe property access
//       educationLevel: apiUser.education?.level || undefined,
//       employmentStatus: apiUser.education?.status || undefined,
//       sector: apiUser.education?.sector || undefined,
//       employmentDuration: apiUser.education?.duration || undefined,
//       officeEmail: apiUser.education?.officeEmail || undefined,
//       monthlyIncome: apiUser.education?.income || undefined,
//       loanRepayment: apiUser.education?.repayment || undefined,
      
//       // Socials - with safe property access
//       twitter: apiUser.socials?.twitter || undefined,
//       facebook: apiUser.socials?.facebook || undefined,
//       instagram: apiUser.socials?.instagram || undefined,
      
//       // Account Details
//       accountNumber: apiUser.accountNumber || undefined,
//       accountBalance: apiUser.amount ? `₦${parseFloat(apiUser.amount).toLocaleString()}` : undefined,
//       bankName: apiUser.bank || undefined,
      
//       // Guarantor (taking the first one) - with safe array access
//       guarantor: (apiUser.guarantors && apiUser.guarantors.length > 0) ? {
//         fullName: apiUser.guarantors[0]?.name || undefined,
//         phoneNumber: apiUser.guarantors[0]?.phoneNumber || undefined,
//         email: apiUser.guarantors[0]?.email || undefined,
//         relationship: apiUser.guarantors[0]?.relationship || undefined
//       } : undefined
//     };
//   }

//   // Add a debug method to log the raw API response
//   async getUserByIdWithDebug(userId: string): Promise<ApiUser> {
//     try {
//       const response = await fetch(`${this.baseUrl}/users/${userId}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       // Debug: Log the raw API response
//       console.log('Raw API Response:', JSON.stringify(data, null, 2));
      
//       return data;
//     } catch (error) {
//       // Fallback to getting all users
//       try {
//         const allUsers = await this.getAllUsers();
//         const user = allUsers.find(u => u.id === userId);
//         if (!user) {
//           throw new Error('User not found');
//         }
        
//         // Debug: Log the user data from all users
//         console.log('User from all users:', JSON.stringify(user, null, 2));
        
//         return user;
//       } catch (fallbackError) {
//         throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
//       }
//     }
//   }

//   // Rest of your methods remain the same...
//   async getAllUsers(): Promise<ApiUser[]> {
//     try {
//       const response = await fetch(`${this.baseUrl}/users`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
      
//       // Debug: Log the first user to see the structure
//       if (data.length > 0) {
//         console.log('Sample user structure:', JSON.stringify(data[0], null, 2));
//       }
      
//       return data;
//     } catch (error) {
//       throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     }
//   }

//   async getUserById(userId: string): Promise<ApiUser> {
//     return this.getUserByIdWithDebug(userId);
//   }

//   // ... rest of your existing methods
// }