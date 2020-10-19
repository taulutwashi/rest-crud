const route = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const {
    readFileData,
    writeFileData
} = require('./helpers/util');

const schema = require('./helpers/schema');



route.get('/', (req,res,next) => {

    readFileData()
        .then(response => {
            res.status(200).send({
                success: true,
                message: "Data found",
                data: response
            })
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "Something went wrong.",
                erros: err
            })
        });

});

route.post('/', async (req,res,next) => {

    const { error } = schema.validate(req.body);

    if(error) {
        res.status(422).send({
            success: false,
            message: "Validation Failed.",
            erros: error.details
        })
        return;
    }

    try{
        const result = await readFileData();
        req.body.id = uuidv4();
        result.push(req.body);
        await writeFileData(result)

        res.status(201).send({
            success: true,
            message: "Data has been Submitted successfully",
            data: req.body
        });

    }catch(err){
        res.status(500).send({
            success: false,
            message: "Internal server error",
            erros: err
        });
    }

    return;

});

route.get('/:id',async (req,res,next) => {
    readFileData()
        .then(response => {

            const result = response.find(item => item.id==req.params.id);

            if(!result) {
                res.status(404).send({
                    success: false,
                    message: "Data not found.",
                    data: result
                })
            }else {
                res.status(200).send({
                    success: true,
                    message: "Data found",
                    data: result
                })
            }

        })
        .catch(error => {
            res.status(500).send({
                success: false,
                message: "Something went wrong.",
                erros: error
            })
        })

});

route.put("/:id",async (req,res,next) => {

    try{
        const data = await readFileData();

        const result = data.map(item => {

            if(item.id == req.params.id) {
                return {
                    ...item,
                    ...req.body
                }
            }else{
                return item;
            }

        });

        await writeFileData(result)

        res.status(200).send({
            success: true,
            message: "Data Updated successfully.",
            data: result.find(item => item.id == req.params.id)
        });

    }catch(err) {
        res.status(500).send({
            success: false,
            message: "Something went wrong.",
            erros: err
        })
    }
});

route.delete("/:id", async (req,res,next) => {

    try{

        const data = await readFileData();

        const result = data.filter(item => item.id != req.params.id);

        await writeFileData(result)

        res.status(200).send({
            success: true,
            message: "Data Deleted Successfully."
        });

    }catch(err) {
        throw err;
    }

})

module.exports = route;