import 'dotenv/config';
import 'dotenv-expand/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { routeNotFound } from './middlewares/routeNotFound';
import { loggingMiddleware } from './middlewares/logging';
import { errorLoggingMiddleware } from './middlewares/error';
import { connectMongoDB } from './config/mongoose';
import { spec } from './config/swagger';
import { setupCloudinary } from './config/cloudinary';

const app = express();

connectMongoDB();
setupCloudinary();

// Body parser middleware for application/json
app.use(express.json());
app.use(cors());

app.use(loggingMiddleware);
// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/api/v1/', router);
app.use('/', swaggerUi.serve, swaggerUi.setup(spec));
app.use(errorLoggingMiddleware);
app.use(routeNotFound);

export default app;
