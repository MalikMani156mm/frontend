import express from 'express';
import FIRRoutes from "./routes/FIRroute.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import OffenceRoutes from "./routes/OffenceRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js"
import CCRoutes from "./routes/CCroute.js";
import VVRoutes from "./routes/VVroutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import PoliceStationRoutes from "./routes/PoliceStationRoutes.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { connectDB , cloudinaryConfig } from "./config/config.js";
import { errors } from './middleware/errors.js';
import cors from "cors";
import 'dotenv/config'
import {app, server} from "./socket/socket.js";
connectDB();
cloudinaryConfig();

app.use(bodyParser.json({limit:'50mb'}))
app.use(cookieParser())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api', FIRRoutes, AuthRoutes, CCRoutes, VVRoutes, PoliceStationRoutes, AdminRoutes, OffenceRoutes, CategoryRoutes, messageRoutes )

app.use(errors)

server.listen(process.env.SERVER_PORT, () => {
    console.log(`App is listening`)
})
