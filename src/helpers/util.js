const path   = require('path');
const fs     = require('fs');

const filePath = path.join(__dirname,'..','db','db.json');

const readFileData = () => {

    return new Promise((resolve,reject) => {

        fs.readFile(filePath,'utf8',(err, data) => {

            if (err) reject(err)

            resolve(JSON.parse(data))

        });

    })

}

const writeFileData = data => {

    return new Promise((resolve, reject) => {

        fs.writeFile(filePath,JSON.stringify(data),(err,res) => {

            if(err) reject(err);

            return resolve(res);
            
        })

    })

}

module.exports = {
    readFileData,
    writeFileData
}