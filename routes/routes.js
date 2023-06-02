import {Router} from "express"
import { loginUser, createOneUser, validateUser} from "../controllers/usersController.js"
import { createOnePersonnel } from "../controllers/personnelsController.js"
import { createOneVisiteur } from "../controllers/visiteursController.js"
import { createCode, verifierCode } from "../controllers/codesController.js"

const router = Router()

router.post('/createOneUser', createOneUser)
router.post('/loginUser', loginUser)
router.post('/createOnePersonnel', createOnePersonnel)
router.post('/createOneVisiteur', createOneVisiteur)
router.post('/verifierCode', verifierCode)
router.put('/validateUser/:idUser', validateUser)

router.get('/createCode/:idUser', async (req, res) => {
    const { idUser } = req.params;
    
    try {
        const newCode = await createCode(idUser)
        res.json(newCode)
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du code' });
    }
})

export default router