import app from './app';
import { connectDatabase } from './db/DBConnector';

const port = process.env.PORT || 8080;

app.listen(port, async () => {
	console.log('Now listening');
	console.log(`http://localhost:${port}`);
	await connectDatabase();
	console.log('Connected DB');
});
