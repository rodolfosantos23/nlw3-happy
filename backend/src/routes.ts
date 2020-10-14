import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';

const route = Router();
const upload = multer(uploadConfig);

// Orphanage
route.get('/orphanages', OrphanagesController.index);
route.get('/orphanages/:id', OrphanagesController.show);
route.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default route;