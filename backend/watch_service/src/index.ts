import express from 'express';
import cors from 'cors';

import watchRoutes from './routes/watch.route';
import envConfig from './config/env.config';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', watchRoutes);

app.listen(envConfig.PORT, () => {
	console.log(
		`Server running in ${envConfig.NODE_ENV} mode on host ${envConfig.HOST} on port ${envConfig.PORT}`
	);
});
