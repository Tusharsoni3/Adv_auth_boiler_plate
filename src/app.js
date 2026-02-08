import express from 'express'
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoute from "./routes/auth.routes.js"
import './db/index.js';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,               
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/',(req,res) => {
    res.send("Server is running at port ");
})
app.use("/api/auth/",authRoute)

export default app;
