import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <div className="text-sm text-gray-500">
                Page <span className="font-medium text-gray-900">{page}</span> of{" "}
                <span className="font-medium text-gray-900">{totalPages}</span>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                </button>
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>
        </div>
    );
}
