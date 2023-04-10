import app from './app';

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log('Now listening');
	console.log(`http://localhost:${port}`);
});
