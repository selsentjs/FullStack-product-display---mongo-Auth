require('dotenv').config('');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
// router
const authRouter = require('./Routes/authRoute')
const userRouter = require('./Routes/userRoute')
const productRouter = require('./Routes/productRoute');
// database
require('./Databases/conn');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Update this to match your Vite frontend port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req,res) => {
    res.status(200).json("Welcome to my project")
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product',productRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})