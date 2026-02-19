'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Severity, Status } from '@/types/incident';

export default function CreateIncidentPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: '',
        service: '',
        severity: Severity.SEV4,
        status: Status.OPEN,
        owner: '',
        summary: '',
    });

    const mutation = useMutation({
        mutationFn: (newIncident: typeof formData) => {
            // Clean up empty strings for optional fields if needed, but schema allows optional strings.
            // However, backend Zod schema expects strings or nulls.
            return api.post('/incidents', newIncident);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidents'] });
            router.push('/');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Create New Incident</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        placeholder="e.g. Database connection timeout"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                        <input
                            type="text"
                            id="service"
                            name="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g. Auth Service"
                        />
                    </div>
                    <div>
                        <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner (Optional)</label>
                        <input
                            type="text"
                            id="owner"
                            name="owner"
                            value={formData.owner}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                            placeholder="e.g. John Doe"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
                        <select
                            id="severity"
                            name="severity"
                            value={formData.severity}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border bg-white"
                        >
                            {Object.values(Severity).map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border bg-white"
                        >
                            {Object.values(Status).map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
                    <textarea
                        id="summary"
                        name="summary"
                        rows={4}
                        value={formData.summary}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        placeholder="Describe the incident..."
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Saving...' : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Create Incident
                            </>
                        )}
                    </button>
                </div>
                {mutation.isError && (
                    <p className="text-red-600 text-sm mt-2">Error creating incident: {(mutation.error as Error).message}</p>
                )}
            </form>
        </div>
    );
}
