import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectToDB from './config/database.js';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/products.js'

import cors from 'cors';
// import path from 'path';


//configure env
dotenv.config();

//database
connectToDB();

//rest object
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname,'./client/build')))

// routes
app.use('/api/v1/auth', authRoutes);

// category
app.use('/api/v1/category', categoryRoutes);

//products
app.use('/api/v1/product', productRoutes);

// rest api
app.get('/', (req,res) => {
    res.send("<h1> Wellcome to ecommerce mern stack app </h1>");
})
// app.use('*', function(req,res){
//     res.sendFile(path.join(__dirname,'./client/build/index.html'));
// });

//PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () =>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})