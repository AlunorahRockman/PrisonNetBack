import {Router} from "express"
import { loginUser, createOneUser, validateUser, verifierEmail, modifierMotdepasse} from "../controllers/usersController.js"
import { createOnePersonnel } from "../controllers/personnelsController.js"
import { createOneVisiteur } from "../controllers/visiteursController.js"
import { createOneAdmin } from "../controllers/adminsController.js"
import { createOneCellule } from "../controllers/cellulesController.js"
import { createCode, verifierCode } from "../controllers/codesController.js"
import { createCodeOublie, verifierCodeOublie } from "../controllers/codesOublieController.js"
import { createOneMessage } from "../controllers/messagesController.js"
import { createOneDetenus } from "../controllers/detenusController.js"
import { createOneVisite } from "../controllers/visiteController.js"
import { createOneConge } from "../controllers/congeController.js"
import { createOneIncident } from "../controllers/incidentsController.js"
import { createOneVisiteurDetenus } from "../controllers/visiteurDetenusCotroller.js"
import { createOneCelluleDetenus } from "../controllers/celluleDetenusController.js"

const router = Router()

router.post('/createOneUser', createOneUser)
router.post('/loginUser', loginUser)
router.post('/createOnePersonnel', createOnePersonnel)
router.post('/createOneVisiteur', createOneVisiteur)
router.post('/createOneAdmin', createOneAdmin)
router.post('/createOneCellule', createOneCellule)
router.post('/createOneMessage', createOneMessage)
router.post('/createOneVisite', createOneVisite)
router.post('/createOneConge', createOneConge)
router.post('/createOneDetenus', createOneDetenus)
router.post('/createOneIncident', createOneIncident)
router.post('/createOneVisiteurDetenus', createOneVisiteurDetenus)
router.post('/createOneCelluleDetenus', createOneCelluleDetenus)
router.post('/verifierCode', verifierCode)
router.post('/verifierCodeOublie', verifierCodeOublie)
router.post('/verifierEmail', verifierEmail)
router.post('/modifierMotdepasse', modifierMotdepasse)
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

router.get('/createCodeOublie/:idUser', async (req, res) => {
    const { idUser } = req.params;
    
    try {
        const newCode = await createCodeOublie(idUser)
        res.json(newCode)
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du code' });
    }
})

export default router