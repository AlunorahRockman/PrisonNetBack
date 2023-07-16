import express from "express"
import routes from "./routes/routes.js"
import db from './database/database.js'
import http from "http"

import {Server} from "socket.io"
import cors from "cors"
import Message from "./models/message.js"
import { Socket } from "dgram"

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})


io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected`)

    socket.on('message', (data) =>{
        console.log('Message receved:', data)

        try {
            const newMessage = Message.create({
                idSender: data.idSender,
                idRecever: data.idRecever,
                message: data.message,
                estVue: false
            });

            console.log('New message saved:', newMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }

        io.emit('message', data)
    })

    socket.on('disconnect', async () => {
        console.log(`user ${socket.id} is disconnected`);
    });
})

app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use(routes)
app.use('/images', express.static('images'));

db.sync()
.then((console.log('Connexion à la bdd')))
.catch(error => console.log(error))

server.listen(5000, ()=> console.log("Port 5000"))