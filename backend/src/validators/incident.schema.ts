import { z } from 'zod';
import { Severity, Status } from '@prisma/client';

export const createIncidentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    service: z.string().min(1, "Service is required"),
    severity: z.nativeEnum(Severity),
    status: z.nativeEnum(Status),
    owner: z.string().optional().nullable(),
    summary: z.string().optional().nullable(),
});

export const updateIncidentSchema = z.object({
    title: z.string().optional(),
    service: z.string().optional(),
    severity: z.nativeEnum(Severity).optional(),
    status: z.nativeEnum(Status).optional(),
    owner: z.string().optional().nullable(),
    summary: z.string().optional().nullable(),
});

export const getIncidentsQuerySchema = z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    severity: z.nativeEnum(Severity).optional(),
    status: z.nativeEnum(Status).optional(),
    service: z.string().optional(),
    sortBy: z.enum(['createdAt', 'severity', 'status']).optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
