import {Router} from "express"
import { loginUser, createOneUser, validateUser, verifierEmail, modifierMotdepasse, 
    getAllUser, updateUser, uploadImage, setImage, getOneUsers, modifierMotdepasseCompte, bloqueUser} from "../controllers/usersController.js"
import { createOnePersonnel, getAllPersonnelsCount, getAllPersonnelsSix, 
    getAllPersonnelsUser, getIdPersByUser, getIdPersonnelByUser, getOnePersonnels, getPersonnelByOneUser, 
    getPersonnelCongeByUser, updatePersonnel } from "../controllers/personnelsController.js"
import { createOneVisiteur, getAllVisiteur, getAllVisiteurCount } from "../controllers/visiteursController.js"
import { createOneAdmin, getAllAdmin } from "../controllers/adminsController.js"
import { createOneCellule, deleteCellule, getAllCellule, getAllCelluleCount, 
    updateCellule } from "../controllers/cellulesController.js"
import { createCode, getPersonnelWithConges, verifierCode } from "../controllers/codesController.js"
import { createCodeOublie, verifierCodeOublie } from "../controllers/codesOublieController.js"
import { createOneMessage, getAllMessagesBetweenTwoUsers } from "../controllers/messagesController.js"
import { createOneDetenus, getAllDetenus, getAllDetenusCount, getOneDetenus, setImageDetenus, 
    updateDetenus } from "../controllers/detenusController.js"
import { createOneVisite, deleteVisite, getAllVisite, getMonVisite, getOneVisite, getVisiteByOneUser, 
    updateVisite, updateVisiteStatus, updateVisiteStatusReff } from "../controllers/visiteController.js"
import { congeEnCoursCount, createOneConge, deleteConge, getAllConge, getCongeByOneUser, 
    getOneConge, updateConge, updateCongeStatus, 
    updateCongeStatusReff } from "../controllers/congeController.js"
import { createOneIncident, deleteIncident, getAllIncident, getIncidentByOneUser, 
    getOneIncident, updateIncident } from "../controllers/incidentsController.js"
import { createOneVisiteurDetenus, getDetenusByOneUser, getIdVisiteurByUser, getMonDetenus, 
    getOneVisiteurs } from "../controllers/visiteurDetenusCotroller.js"
import { createOneCelluleDetenus, deleteDetenusCellule, getDetenusByOneCellule } from "../controllers/celluleDetenusController.js"
import { createOneNotification, getNotificationByOneUser } from "../controllers/notificationController.js"

const router = Router()

router.post('/createOneUser', createOneUser)
router.post('/loginUser', loginUser)
router.post('/createOnePersonnel', createOnePersonnel)
router.post('/createOneVisiteur', createOneVisiteur)
router.post('/createOneAdmin', createOneAdmin)


router.post('/createOneNotification', createOneNotification)
router.get('/getNotification/:idUser', getNotificationByOneUser)

router.post('/createOneMessage', createOneMessage)
router.get('/messages/:idRecever/:idSender', getAllMessagesBetweenTwoUsers);


router.post('/createOneCellule', createOneCellule)
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
router.post('/modifierMotdepasseCompte', modifierMotdepasseCompte)
router.put('/validateUser/:idUser', validateUser)
router.get('/personnels', getAllPersonnelsUser)
router.get('/personnelsSix', getAllPersonnelsSix)
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
router.get('/getDetenusByOneCellule/:idCellule', getDetenusByOneCellule)
router.get('/getOneUsers/:idUser', getOneUsers)
router.get('/getOneVisite/:idUser', getOneVisite)
router.delete('/deleteVisite/:id', deleteVisite)
router.delete('/deleteConge/:id', deleteConge)
router.delete('/deleteIncident/:id', deleteIncident)
router.delete('/deleteDetenusCellule/:id', deleteDetenusCellule)
router.get('/getOnePersonnels/:idUser', getOnePersonnels)
router.get('/getMonDetenus/:idUser', getMonDetenus)
router.get('/getMonVisite/:idUser', getMonVisite)
router.get('/getPersonnelCongeByUser/:idUser', getPersonnelCongeByUser)
router.get('/getIdPersonnel/:idUser', getIdPersonnelByUser)
router.get('/getIdPers/:idUser', getIdPersByUser)
router.get('/getIdVisiteur/:idUser', getIdVisiteurByUser)
router.get('/getPersonnelsByOneUser/:idUser', getPersonnelByOneUser)
router.put('/updatePersonnel/:id', updatePersonnel)
router.put('/updateDetenus/:id', updateDetenus)

router.post('/bloque/:idUser', bloqueUser)

router.put('/updateCellule/:id', updateCellule)
router.get('/getOneDetenus/:id', getOneDetenus)
router.delete('/deleteCellule/:id', deleteCellule)
router.get('/getOneVisiteurs/:id', getOneVisiteurs)
router.put('/setStatutConge/:idConge', updateCongeStatus)
router.put('/setStatutCongeReff/:idConge', updateCongeStatusReff)
router.put('/setStatutVisite/:idVisite', updateVisiteStatus)
router.put('/setStatutVisiteReff/:idVisite', updateVisiteStatusReff)
router.post('/upload/:nom', uploadImage);
router.put('/setImage/:idUser/:image', setImage)
router.put('/setImageDetenus/:idDetenus/:image', setImageDetenus)
router.get('/getPersonnelConge/:personnelId', getPersonnelWithConges);



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