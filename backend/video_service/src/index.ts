import express from 'express';
import cors from 'cors';

import envConfig from './config/env.config';
import videoRoutes from './routes/video.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', videoRoutes);

app.listen(envConfig.PORT, () => {
	console.log(
		`Server running in ${envConfig.NODE_ENV} mode on host ${envConfig.HOST} on port ${envConfig.PORT}`
	);
});