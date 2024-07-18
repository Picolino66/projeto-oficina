
import "express-async-errors";
import express from 'express';
import { routes } from './routes';
import dotenv from 'dotenv';
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
});

app.listen(3000, () => console.log('Server is running on port 3000'));