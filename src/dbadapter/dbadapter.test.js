const db = require('../dbadapter');

// dduang1999: 22-Oct-2020
// This global var might not be a good idea/I think mocking would be a way but i dont know how
let user = {};

beforeAll(() => {
	user.id = null;
});
	
/**
--- EXAMPLE success result ---
     {
      success: true,
      message: 'Data has been Submitted successfully',
      data: {
        id: 'f9d11807-d900-4132-8060-9e4901b40311',
        name: 'Duang D',
        email: 'dduang1999@aol.com',
        mobile: '+660XXXXXXX10',
        address: 'Bangkok, Thailand'
      }
    }
*/

describe('dbadapter json', () => {

	it('should pass environment variables to module', () => {
		expect(db.uri).toBeDefined();
	});

	it('should be able to create a document', async () => {
		const data = {
			name: 'Duang D',
			email: 'dduang1999@aol.com',
			mobile: '+660XXXXXXX10',
			address: 'Bangkok, Thailand',
		};
		const doc = await db.create(data);
		expect(doc).toBeDefined();
		expect(doc.success).toBeTruthy();
		expect(doc.data.email).toBe('dduang1999@aol.com');
		user = doc.data;


	});

	it('should be able to read all documents', async () => {
		const docs = await db.read();
		expect(docs).toBeDefined();
	});
	
	it('should be able to read one document by id', async () => {
		const doc = await db.read(user.id);
		expect(doc).toBeDefined();
		expect(doc.success).toBeTruthy();
		expect(doc.data.email).toBe('dduang1999@aol.com');
	});

	it('should be able to update document by id', async () => {
		const data = {
			email: "newemail@gmail.com"	
		};
		const doc = await db.update(user.id, data);
		expect(doc).toBeDefined();
		expect(doc.success).toBeTruthy();
		expect(doc.data.email).toBe('newemail@gmail.com');
	});

	it('should be able to delete by id', async () => {
		const doc = await db.delete(user.id);
		expect(doc).toBeDefined();
		expect(doc.success).toBeTruthy();
	});

});

