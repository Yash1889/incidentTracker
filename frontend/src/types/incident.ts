export enum Severity {
    SEV1 = 'SEV1',
    SEV2 = 'SEV2',
    SEV3 = 'SEV3',
    SEV4 = 'SEV4',
}

export enum Status {
    OPEN = 'OPEN',
    MITIGATED = 'MITIGATED',
    RESOLVED = 'RESOLVED',
}

export interface Incident {
    id: string;
    title: string;
    service: string;
    severity: Severity;
    status: Status;
    owner?: string | null;
    summary?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IncidentsResponse {
    data: Incident[];
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}
