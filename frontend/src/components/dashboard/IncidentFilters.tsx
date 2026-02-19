import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Severity, Status } from "@/types/incident";

interface FiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    severity: string;
    onSeverityChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onSortChange: (field: string) => void;
}

export function IncidentFilters({
    search,
    onSearchChange,
    severity,
    onSeverityChange,
    status,
    onStatusChange,
    sortBy,
    sortOrder,
    onSortChange,
}: FiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search incidents..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
                <select
                    value={severity}
                    onChange={(e) => onSeverityChange(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Severities</option>
                    {Object.values(Severity).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <select
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Statuses</option>
                    {Object.values(Status).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="createdAt">Date</option>
                    <option value="severity">Severity</option>
                    <option value="status">Status</option>
                </select>
                <button
                    onClick={() => onSortChange(sortBy)}
                    /* This logic in parent should toggle order if same field click, but here we just show state */
                    className="p-2 border rounded-md hover:bg-gray-50"
                    title={sortOrder === 'asc' ? "Ascending" : "Descending"}
                >
                    <ArrowUpDown className={`h-4 w-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                </button>
            </div>
        </div>
    );
}
