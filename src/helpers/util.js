const path = require('path');
const fs = require('fs');

const databaseFileName = process.env.DATABASE || 'db.json';
const filePath = path.join(__dirname, '..', 'db', databaseFileName);

const readFileData = () => new Promise((resolve, reject) =>
	fs.readFile(filePath, 'utf8', (error, data) => {
		if (!!error) reject(error);
		resolve(JSON.parse(data));
	}));

const writeFileData = data => new Promise((resolve, reject) =>
	fs.writeFile(filePath, JSON.stringify(data), (error) => {
		if (!!error) reject(error);
		resolve();
	}));

module.exports = {
	readFileData,
	writeFileData,
};
