const express = require('express');
const dotenv = require('dotenv');

const env = process.argv[2] || "development";
dotenv.config({ path: `.env.${env}` });

const app = express();

function log(message) {
	const time = new Date().toISOString();
	console.log(`[${time}] [${env.toUpperCase()}] ${message}`);
}

const PORT = process.env.PORT;
const APP = process.env.APP;

app.get('/', (req, res) => {
	res.send('Hello World from ' + APP);
});

app.get('/health' , (req, res) => {
	log("Health check been called");
	res.status(200).json({
		status: "UP"
	});
});

app.post('/webhook', (req, res) => {
    console.log("Webhook received:");
    console.log(req.body);
    res.status(200).send("Received");
});

app.listen(PORT , () => {
	log("Server is running on port " + PORT);
});
