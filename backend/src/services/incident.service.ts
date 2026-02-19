import prisma from '../prisma/index';
import { Prisma, Incident, Severity, Status } from '@prisma/client';

interface GetIncidentsParams {
    page: number;
    limit: number;
    search?: string;
    severity?: Severity;
    status?: Status;
    service?: string;
    sortBy: 'createdAt' | 'severity' | 'status';
    sortOrder: 'asc' | 'desc';
}

export class IncidentService {
    async createIncident(data: Prisma.IncidentCreateInput): Promise<Incident> {
        return prisma.incident.create({
            data,
        });
    }

    async getIncidents(params: GetIncidentsParams) {
        const { page, limit, search, severity, status, service, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;

        const where: Prisma.IncidentWhereInput = {
            AND: [],
        };

        if (search) {
            where.AND = [
                ...(where.AND as Prisma.IncidentWhereInput[]),
                {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { summary: { contains: search, mode: 'insensitive' } },
                    ],
                },
            ];
        }

        if (severity) {
            where.severity = severity;
        }

        if (status) {
            where.status = status;
        }

        if (service) {
            where.service = { contains: service, mode: 'insensitive' };
        }

        const [data, total] = await Promise.all([
            prisma.incident.findMany({
                where,
                take: limit,
                skip,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            }),
            prisma.incident.count({ where }),
        ]);

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit
        };
    }

    async getIncidentById(id: string): Promise<Incident | null> {
        return prisma.incident.findUnique({
            where: { id },
        });
    }

    async updateIncident(id: string, data: Prisma.IncidentUpdateInput): Promise<Incident> {
        return prisma.incident.update({
            where: { id },
            data,
        });
    }
}
