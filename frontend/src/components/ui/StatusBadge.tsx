import { Status } from "@/types/incident";
import { cn } from "@/lib/utils";

const statusConfig = {
    [Status.OPEN]: { label: 'Open', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    [Status.MITIGATED]: { label: 'Mitigated', className: 'bg-orange-100 text-orange-800 border-orange-200' },
    [Status.RESOLVED]: { label: 'Resolved', className: 'bg-green-100 text-green-800 border-green-200' },
};

export function StatusBadge({ status }: { status: Status }) {
    const config = statusConfig[status];
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", config.className)}>
            {config.label}
        </span>
    );
}
