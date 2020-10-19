const {loadFile, writeFileData} = require('./server');

describe('Should check File', () => {

    it('return file data',async () => {

        const checkFile = await loadFile();

        expect(checkFile).toEqual({
            name: 'Taulut Hossain',
            email: 'washi@gmail.com',
            mobile: '01716098676',
            address: 'Dhaka, Bangladesh.'
          }
        )

    });

    it("it write data",async() =>{
        const res = await writeFileData();
        expect(res).toEqual(true)
    })

});
