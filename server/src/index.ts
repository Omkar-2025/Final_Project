import express from 'express';
import 'reflect-metadata';
import userRouter from './routes/user.routes';
import AccountRouter from './routes/Account.routes';
import { AppDataSource } from './config/db';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import billsRouter from './routes/bills.routes';
import supportRouter from './routes/support.routes';
import { verifyJwt } from './middlewares/verifyJwt';
import adminRouter from './routes/admin.routes'; 
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
app.use(cookieParser());

app.use('/api/user',userRouter);

app.use('/api/account',AccountRouter);
app.use(verifyJwt);
app.use('/api/bills',billsRouter);
app.use('/api/support',supportRouter);
app.use('/api/admin',adminRouter)


AppDataSource.initialize().then(()=>{
    app.listen(4000,()=>{
        console.log(`server started at http://localhost:4000`);
        console.log('Database connected');   
    })
}).catch((err)=>{
    console.log(err);
})