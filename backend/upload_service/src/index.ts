import express from 'express';
import cors from 'cors';

import envConfig from './config/env.config';
import uploadRoutes from './routes/upload.route';
import errorHandler from './middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

app.listen(envConfig.PORT, () => {
	console.log(
		`Server running in ${envConfig.NODE_ENV} mode on host ${envConfig.HOST} on port ${envConfig.PORT}`
	);
});
