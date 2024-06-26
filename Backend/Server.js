import express from 'express';
import FIRRoutes from "./routes/FIRroute.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import CCRoutes from "./routes/CCroute.js";
import VVRoutes from "./routes/VVroutes.js";
import PoliceStationRoutes from "./routes/PoliceStationRoutes.js"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { connectDB , cloudinaryConfig } from "./config/config.js";
import { errors } from './middleware/errors.js';
import cors from "cors";
import 'dotenv/config'
const app = express();
connectDB();
cloudinaryConfig();

app.use(bodyParser.json({limit:'50mb'}))
app.use(cookieParser())

app.use(cors('http://localhost:3000'));

app.use('/api', FIRRoutes, AuthRoutes, CCRoutes, VVRoutes, PoliceStationRoutes)

app.use(errors)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`App is listening`)
})
