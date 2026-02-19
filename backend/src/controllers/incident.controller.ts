import { Request, Response, NextFunction } from 'express';
import { IncidentService } from '../services/incident.service';
import { createIncidentSchema, getIncidentsQuerySchema, updateIncidentSchema } from '../validators/incident.schema';

const incidentService = new IncidentService();

export class IncidentController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = createIncidentSchema.parse(req.body);
            const incident = await incidentService.createIncident(data);
            res.status(201).json(incident);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const query = getIncidentsQuerySchema.parse(req.query);
            const result = await incidentService.getIncidents(query);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const incident = await incidentService.getIncidentById(id as string);
            if (!incident) {
                return res.status(404).json({ error: 'Incident not found' });
            }
            res.json(incident);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = updateIncidentSchema.parse(req.body);
            const incident = await incidentService.updateIncident(id as string, data);
            res.json(incident);
        } catch (error) {
            next(error);
        }
    }
}
