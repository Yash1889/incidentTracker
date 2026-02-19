'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Trash2 } from 'lucide-react'; // Added Trash2 just in case, though delete is not in requirements
import Link from 'next/link';
import { api } from '@/lib/api';
import { Incident, Severity, Status } from '@/types/incident';
import { SeverityBadge } from '@/components/ui/SeverityBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function IncidentDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Incident>>({});

    const { data: incident, isLoading, isError } = useQuery<Incident>({
        queryKey: ['incident', id],
        queryFn: async () => {
            const response = await api.get<Incident>(`/incidents/${id}`);
            return response.data;
        },
    });

    useEffect(() => {
        if (incident) {
            setFormData(incident);
        }
    }, [incident]);

    const mutation = useMutation({
        mutationFn: (data: Partial<Incident>) => {
            // Exclude fields that shouldn't be sent if they haven't changed or are read-only
            const { id: _, createdAt: __, updatedAt: ___, ...updateData } = data;
            return api.patch(`/incidents/${id}`, updateData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incident', id] });
            queryClient.invalidateQueries({ queryKey: ['incidents'] });
            setIsEditing(false);
        },
    });

    if (isLoading) return <div className="p-8"><div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div></div>;
    if (isError || !incident) return <div className="p-8 text-red-600">Incident not found or error loading.</div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Incident' : incident.title}
                    </h1>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                    >
                        Edit Incident
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-100 p-6 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                            <input type="text" id="service" name="service" value={formData.service || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" />
                        </div>
                        <div>
                            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
                            <input type="text" id="owner" name="owner" value={formData.owner || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
                            <select id="severity" name="severity" value={formData.severity} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border bg-white">
                                {Object.values(Severity).map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border bg-white">
                                {Object.values(Status).map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
                        <textarea id="summary" name="summary" rows={6} value={formData.summary || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white">
                            Cancel
                        </button>
                        <button type="submit" disabled={mutation.isPending} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                            {mutation.isPending ? 'Saving...' : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="flex items-center space-x-3">
                                <h2 className="text-xl font-medium text-gray-900">{incident.title}</h2>
                                <StatusBadge status={incident.status} />
                            </div>
                            <p className="text-sm text-gray-500">Service: <span className="font-medium text-gray-900">{incident.service}</span></p>
                        </div>
                        <SeverityBadge severity={incident.severity} />
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-gray-900 whitespace-pre-wrap">{incident.summary || 'No description provided.'}</p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Owner</h3>
                                <p className="text-gray-900">{incident.owner || 'Unassigned'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Created At</h3>
                                <p className="text-gray-900">{new Date(incident.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Last Updated</h3>
                                <p className="text-gray-900">{new Date(incident.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
