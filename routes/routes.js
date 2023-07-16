import {Router} from "express"
import { loginUser, createOneUser, validateUser, verifierEmail, modifierMotdepasse, getAllUser, updateUser} from "../controllers/usersController.js"
import { createOnePersonnel, getAllPersonnelsCount, getAllPersonnelsUser, getOnePersonnels, getPersonnelByOneUser, updatePersonnel } from "../controllers/personnelsController.js"
import { createOneVisiteur, getAllVisiteur, getAllVisiteurCount } from "../controllers/visiteursController.js"
import { createOneAdmin, getAllAdmin } from "../controllers/adminsController.js"
import { createOneCellule, getAllCellule, getAllCelluleCount } from "../controllers/cellulesController.js"
import { createCode, verifierCode } from "../controllers/codesController.js"
import { createCodeOublie, verifierCodeOublie } from "../controllers/codesOublieController.js"
import { createOneMessage, getMessages } from "../controllers/messagesController.js"
import { createOneDetenus, getAllDetenus, getAllDetenusCount, getOneDetenus, updateDetenus } from "../controllers/detenusController.js"
import { createOneVisite, deleteVisite, getAllVisite, getOneVisite, getVisiteByOneUser, updateVisite } from "../controllers/visiteController.js"
import { congeEnCoursCount, createOneConge, deleteConge, getAllConge, getCongeByOneUser, getOneConge, updateConge } from "../controllers/congeController.js"
import { createOneIncident, deleteIncident, getAllIncident, getIncidentByOneUser, getOneIncident, updateIncident } from "../controllers/incidentsController.js"
import { createOneVisiteurDetenus, getDetenusByOneUser } from "../controllers/visiteurDetenusCotroller.js"
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
router.get('/personnels', getAllPersonnelsUser)
router.get('/detenus', getAllDetenus)
router.get('/cellules', getAllCellule)
router.get('/visiteurs', getAllVisiteur)
router.get('/admins', getAllAdmin)
router.get('/getVisiteurCount', getAllVisiteurCount)
router.get('/getPersonnelsCount', getAllPersonnelsCount)
router.get('/congeEnCoursCount', congeEnCoursCount)
router.get('/getDetenusCount', getAllDetenusCount)
router.get('/getCelluleCount', getAllCelluleCount)
router.get('/getAllConge', getAllConge)
router.get('/getAllVisite', getAllVisite)
router.get('/getAllIncident', getAllIncident)
router.get('/messages/:idRecever/:idSender', getMessages);
router.get('/getIncidentByOneUser/:idUser', getIncidentByOneUser)
router.get('/getCongeByOneUser/:idUser', getCongeByOneUser)
router.put('/updateUser/:userId', updateUser);
router.put('/updateIncident/:idUser', updateIncident);
router.put('/updateConge/:idUser', updateConge);
router.put('/updateVisite/:idUser', updateVisite);
router.get('/users/:excludedId', getAllUser)
router.get('/getVisiteByOneUser/:idUser', getVisiteByOneUser)
router.get('/getDetenusByOneUser/:id', getDetenusByOneUser)
router.get('/getOneIncident/:idUser', getOneIncident)
router.get('/getOneConge/:idUser', getOneConge)
router.get('/getOneVisite/:idUser', getOneVisite)
router.delete('/deleteVisite/:id', deleteVisite)
router.delete('/deleteConge/:id', deleteConge)
router.delete('/deleteIncident/:id', deleteIncident)
router.get('/getOnePersonnels/:idUser', getOnePersonnels)
router.get('/getPersonnelsByOneUser/:idUser', getPersonnelByOneUser)
router.put('/updatePersonnel/:id', updatePersonnel);
router.put('/updateDetenus/:id', updateDetenus);
router.get('/getOneDetenus/:id', getOneDetenus)



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