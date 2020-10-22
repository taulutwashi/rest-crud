const { v4: uuidv4 } = require('uuid');

const { readFileData, writeFileData } = require('../helpers/util');

module.exports = (dburi) => {
	const dbadapter = {};
	dbadapter.uri = dburi;

	dbadapter.create = async (doc) => {
		try {
			let data = await readFileData();
			
// --------------------------------------------------------------
// We can remove this after refactor utils.test.js
// Due to it overrides test.json by writing object into json file instead of array

			if (!data) data = [];
			if (!Array.isArray(data)) data = [data];
// --------------------------------------------------------------
			
			const newItem = {
				id: uuidv4(),
				...doc,
			};

			data.push(newItem);
	
			await writeFileData(data);
	
			return {
				success: true,
				message: 'Data has been Submitted successfully',
				data: newItem,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Internal server error',
				error,
			};
		}
	}
	
	dbadapter.read = async (id) => {
		try {
			const data = await readFileData();
	
			if (id) {
				
				const item = data.find(item => item.id === id);
				
				if (!item) {
					return {
						success: false,
						message: 'Data not found.',
					};
				}
				return {
					success: true,
					message: 'Data found',
					data: item,
				};
	
			} else {
				return {
					success: true,
					message: 'Data found',
					data
				};
			}
		} catch (error) {
			return {
				success: false,
				message: 'Something went wrong.',
				error,
			};
		}
	}

	dbadapter.update = async (id, doc) => {
		try {
			const data = await readFileData();
	
			const index = data.findIndex(item => item.id === id);
	
			if (!index) {
				return {
					success: false,
					message: 'Data not found.',
				};
			}
	
			const item = data[index];
	
			const updatedItem = { ...item, ...doc };
	
			data[index] = updatedItem;
	
			await writeFileData(data);
	
			return {
				success: true,
				message: 'Data Updated successfully.',
				data: updatedItem,
			};
		} catch (error) {
			return {
				success: false,
				message: 'Something went wrong.',
				error,
			};
		}
	}

	dbadapter.delete = async (id) => {
		const data = await readFileData();

		const result = data.filter(item => item.id !== id);

		await writeFileData(result);

		return {
			success: true,
			message: 'Data Deleted Successfully.',
		};
	}

	return dbadapter;
};
