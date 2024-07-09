import express from 'express';
import cors from 'cors';

import envConfig from './config/env.config';
import userRoutes from './routes/user.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', userRoutes);

app.listen(envConfig.PORT, () => {
	console.log(
		`Server running in ${envConfig.NODE_ENV} mode on host ${envConfig.HOST} on port ${envConfig.PORT}`
	);
});
