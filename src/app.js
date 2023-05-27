import express from "express";
import __dirname from './utils.js';
import sessionsRouter from './routes/sessions.router.js'
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import Handlebars from 'express-handlebars';
import session from "express-session";

const app = express();

try {
    await mongoose.connect('mongodb+srv://fabianparentelli007code:MU8O6JWQtjzskwZE@clusterfabian.kpwq3c1.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('Conected DB');
} catch (error) {
    console.error(error);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', Handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'coder39760',
    resave: true,
    saveUninitialized: true
}));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewRouter);

app.listen(8080, () => console.log('Server runing in port 8080'));