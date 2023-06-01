import express from "express"
import routes from "./routes/routes.js"
import db from './database/database.js'
import cors from "cors"

const app = express()

app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use(routes)

db.sync()
.then((console.log('Connexion à la bdd')))
.catch(error => console.log(error))

app.listen(5000, ()=> console.log("Port 5000"))