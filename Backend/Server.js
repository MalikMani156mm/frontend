import express from 'express';
import FIRRoutes from "./routes/FIRroute.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { connectDB , cloudinaryConfig } from "./config/config.js";
import { errors } from './middleware/errors.js';
import cors from "cors";
import 'dotenv/config'
const app = express();
connectDB();
cloudinaryConfig();

app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors());

app.use('/api', FIRRoutes, AuthRoutes)

app.use(errors)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`App is listening`)
})
