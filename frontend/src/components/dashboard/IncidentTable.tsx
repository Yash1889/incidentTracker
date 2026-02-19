import Link from "next/link";
import { format } from "date-fns";
import { Incident } from "@/types/incident";
import { SeverityBadge } from "@/components/ui/SeverityBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface IncidentTableProps {
    incidents: Incident[];
    isLoading: boolean;
}

export function IncidentTable({ incidents, isLoading }: IncidentTableProps) {
    if (isLoading) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />
                ))}
            </div>
        );
    }

    if (incidents.length === 0) {
        return (
            <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                <h3 className="text-lg font-medium text-gray-900">No incidents found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Severity</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {incidents.map((incident) => (
                            <tr
                                key={incident.id}
                                className="hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/incidents/${incident.id}`} className="block">
                                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{incident.title}</span>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <SeverityBadge severity={incident.severity} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={incident.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {incident.owner || <span className="text-gray-300 italic">Unassigned</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {format(new Date(incident.createdAt), 'MMM d, yyyy HH:mm')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
