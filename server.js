import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const { PORT } = process.env;
const database_ip = process.env.IP;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Home route
app.get('/', (req, res) => {
    return res.status(200).send({
      status: 200,
      message: 'warming up at Port 5000'
    });
});

// wrong route
app.use((req, res) => res.status(405).send({
    'status': 405,
    'error': 'This URL does not exist'
}));

// server down
app.use((req, res) => res.status(500).send({
    'status': 500,
    'error': 'Oops! The problem is not on your side. Hang on, we will fix this soon'
}));

// current process environment
app.listen(PORT || 3000,
        console.log(`App listening on port ${PORT}!`),
        database_ip
    );

export default app;
