const { readFileData, writeFileData } = require('./util');

describe('Test read and write File Data', () => {
    it('Should read and write file data', async () => {

        const data = {
			name: 'Taulut Hossain',
			email: 'washi@gmail.com',
			mobile: '01716098676',
			address: 'Dhaka, Bangladesh.',
        };

        await writeFileData(data);

        const checkFile = await readFileData();

        expect(data).toEqual(checkFile)
        
    });

});
