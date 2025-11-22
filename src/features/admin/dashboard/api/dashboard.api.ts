import http from '@/lib/axios';

export interface DashboardResponse {
  revenueLast30Days: number;
  bookingsLast30Days: number;
  tripsVsPackages: { _id: string; count: number }[];
  bookingsPerCity: { _id: string; count: number }[];
  newUsersLast30Days: number;
  paymentStatusStats: { _id: string; count: number }[];
  paymentTypeStats: { _id: string; count: number }[];
}

export interface DashboardApiResponse {
  status: 'success' | 'error';
  data: DashboardResponse;
}

// ---------------------------------------------------------
// GET dashboard stats
// ---------------------------------------------------------
export const fetchDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await http.get<DashboardApiResponse>('/dashboard'); // adjust path if needed
  if (data.status !== 'success') {
    throw new Error('Failed to fetch dashboard data');
  }
  return data.data;
};
