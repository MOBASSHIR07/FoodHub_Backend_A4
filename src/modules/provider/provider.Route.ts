import express from 'express';
import { providerController } from './provider.Controller.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', providerController.getAllProviders);
// router.get('/get-with-menu/:id', providerController.getProviderProfileWithMenu);
router.put('/update-profile', authMiddleware("PROVIDER"), providerController.updateProviderProfile)
router.get('/:id', providerController.getProviderById);

export const providerRoute = router;