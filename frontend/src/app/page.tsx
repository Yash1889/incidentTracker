'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Plus, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { IncidentsResponse } from '@/types/incident';
import { useDebounce } from '@/hooks/useDebounce';
import { IncidentFilters } from '@/components/dashboard/IncidentFilters';
import { IncidentTable } from '@/components/dashboard/IncidentTable';
import { Pagination } from '@/components/ui/Pagination';

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, error } = useQuery<IncidentsResponse>({
    queryKey: ['incidents', page, debouncedSearch, severity, status, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sortOrder,
        sortBy,
      });

      if (debouncedSearch) params.append('search', debouncedSearch);
      if (severity) params.append('severity', severity);
      if (status) params.append('status', status);

      const response = await api.get<IncidentsResponse>(`/incidents?${params.toString()}`);
      return response.data;
    },
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new
  });

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // Default to desc for new field
    }
  };

  // Reset page when filters change
  const handleFilterChange = (setter: (val: any) => void) => (val: any) => {
    setter(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track system incidents</p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Incident
        </Link>
      </div>

      <IncidentFilters
        search={search}
        onSearchChange={handleFilterChange(setSearch)}
        severity={severity}
        onSeverityChange={handleFilterChange(setSeverity)}
        status={status}
        onStatusChange={handleFilterChange(setStatus)}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      /* The component expects simple string callback but we handle logic here. 
         Wait, IncidentFilters props need to be aligned.
         Checking IncidentFilters definition: onSortChange: (field: string) => void;
         So passing handleSortChange is correct. 
      */
      />

      {isError && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          Something went wrong: {(error as Error).message}
        </div>
      )}

      <IncidentTable
        incidents={data?.data || []}
        isLoading={isLoading}
      />

      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
