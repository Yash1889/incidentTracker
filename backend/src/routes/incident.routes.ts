import { Router } from 'express';
import { IncidentController } from '../controllers/incident.controller';

const router = Router();
const incidentController = new IncidentController();

router.post('/', incidentController.create.bind(incidentController));
router.get('/', incidentController.getAll.bind(incidentController));
router.get('/:id', incidentController.getById.bind(incidentController));
router.patch('/:id', incidentController.update.bind(incidentController));

export default router;
