import express from "express";
import routes from "./routes/routes.js";
import db from './database/database.js';
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Message from "./models/message.js";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

const connectedUsers = new Map()

const connectedUsersNotif = new Map()

io.on('connection', (socket) => {
    console.log(`L'utilisateur ${socket.id} est connecté`);


    socket.on('join-chat', (data)=>{
        connectedUsers.set(data.me, socket.id)
    })

    socket.on('join-notification', (data)=>{
        connectedUsersNotif.set(data.me, socket.id)
    })

    // const YOUR_DOMAIN = 'http://localhost:5000';

    // app.post('/create-checkout-session', async (req, res) => {
    // try {
    //     const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //         {
    //         price: 'PRIX_ID_STRIPE', 
    //         quantity: 1,
    //         },
    //     ],
    //     mode: 'payment',
    //     success_url: `${YOUR_DOMAIN}/success.html`,
    //     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    //     });

    //     res.redirect(303, session.url);
    // } catch (error) {
    //     console.error('Erreur lors de la création de la session de paiement :', error);
    //     res.status(500).json({ error: 'Une erreur est survenue lors du paiement.' });
    // }
    // });


    socket.on("send_message", async (data) => {
        try {
        
            const newMessage = await Message.create({
                message: data.content.message,
                estVue: false,
                idSender: data.content.idSender,
                idRecever: data.content.idRecever
            });
    
            const messageFromDatabase = await Message.findOne({
                where: { id: newMessage.id },
                include: [
                    {
                        model: User,
                        as: 'sender',
                        attributes: ['nom', 'email', 'image']
                    },
                    {
                        model: User,
                        as: 'receiver',
                        attributes: ['nom', 'email', 'image']
                    }
                ]  
            });
    
            const receiverSocket = connectedUsers.get(data.content.idRecever);
            const senderSocket = connectedUsers.get(data.content.idSender);
            io.to(receiverSocket).to(senderSocket).emit('new-message', {
                ...messageFromDatabase.dataValues 
            });
    
            console.log("Message ajouté à la base de données et émis aux sockets connectées.");
        } catch (error) {
            console.error("Erreur lors de l'ajout et de l'émission du message :", error);
        }
    });

    socket.on("send_notification", async (data) => {
        try {

            console.log(data)
        
            const newNotification = await Notification.create({
                senderId: data.content.senderId,
                receverId: data.content.receverId,
                link: data.content.link,
                message: data.content.message,
                isRead: data.content.isRead
            });
    
            const notificationFormData = await Notification.findOne({
                where: { id: newNotification.id },
                include: [
                    {
                        model: User,
                        as: 'senderNotif',
                        attributes: ['nom', 'email', 'image']
                    },
                    {
                        model: User,
                        as: 'receiverNotif',
                        attributes: ['nom', 'email', 'image']
                    }
                ]
            });
    
            const receiverSocket = connectedUsersNotif.get(data.content.receverId);
            io.to(receiverSocket).emit('new-notification', {
                ...notificationFormData.dataValues 
            });

        } catch (error) {
            console.error("Erreur lors de l'ajout et de l'émission du message :", error);
        }
    });
    

    socket.on('disconnect', async () => {
        console.log(`L'utilisateur ${socket.id} est déconnecté`);
    });
});

// ! *****************

app.use(cors({
    origin:'*'
}));

app.use(express.json());
app.use(routes);
app.use('/images', express.static('images'));

db.sync()
    .then(() => console.log('Connexion à la base de données réussie'))
    .catch(error => console.log(error));

server.listen(5000, () => console.log("Port 5000"));
