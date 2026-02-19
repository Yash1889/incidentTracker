import { Severity } from "@/types/incident";
import { cn } from "@/lib/utils";

const severityConfig = {
    [Severity.SEV1]: { label: 'SEV1', className: 'bg-red-100 text-red-800 border-red-200' },
    [Severity.SEV2]: { label: 'SEV2', className: 'bg-orange-100 text-orange-800 border-orange-200' },
    [Severity.SEV3]: { label: 'SEV3', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    [Severity.SEV4]: { label: 'SEV4', className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export function SeverityBadge({ severity }: { severity: Severity }) {
    const config = severityConfig[severity];
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", config.className)}>
            {config.label}
        </span>
    );
}
