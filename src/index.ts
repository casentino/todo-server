import { createServer } from './server';

async function main() {
	const server = await createServer();
	const port = process.env.PORT || 8080;
	server.listen(port, () => {
		console.log('Now listening');
		console.log(`http://localhost:${port}`);
	});
}

main();
