import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { dbConnect } from './lib/db.lib.js';
import searchRouter from './routes/search.route.js';
import userRouter from './routes/user.route.js';
import videoRouter from './routes/video.route.js';

dbConnect();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: [`http://localhost:5173`],
    method: ['GET','POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/api/auth',userRouter);
app.use('/api/video', videoRouter);
app.use('/api/search', searchRouter);

app.get('/', (req, res) =>{
    res.send("Welcome to Vidora");
});

app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
});