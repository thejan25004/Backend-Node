import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/mongo"
import rootRoutes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import {errorHandler} from "./middlewares/errorHandler";
import nodeCron from "node-cron";
import {sendOverdueNotifications} from "./util/sendOverdueNotifications";

dotenv.config()
const app = express()

// handle cors
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeader: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/api", rootRoutes)
app.use(errorHandler)

nodeCron.schedule('0 0 */3 * *', async () => {
    console.log('⏰ Running scheduled job every 3 days: Sending overdue emails...');
    await sendOverdueNotifications();
});

const PORT = process.env.PORT

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})