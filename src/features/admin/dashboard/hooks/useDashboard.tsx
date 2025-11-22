import { useQuery } from '@tanstack/react-query';
import { fetchDashboard, type DashboardResponse } from '../api/dashboard.api';

export const Dashboard_QK = ['dashboard'] as const;

export function useDashboardQuery() {
    return useQuery<DashboardResponse>({
        queryKey: Dashboard_QK,
        queryFn: fetchDashboard,
        staleTime: 300_000, // cache for 5 minutes
        // staleTime: 30_000, // cache for 30 seconds
        refetchOnWindowFocus: false,
    });
}
