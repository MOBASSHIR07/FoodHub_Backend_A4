import express from 'express';
import { providerController } from './provider.Controller.js';


const router = express.Router();

router.get('/', providerController.getAllProviders);
// router.get('/get-with-menu/:id', providerController.getProviderProfileWithMenu);
router.get('/:id', providerController.getProviderById);

export const providerRoute = router;