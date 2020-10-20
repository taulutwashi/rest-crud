const route = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const { readFileData, writeFileData } = require('./helpers/util');

const schema = require('./helpers/schema');

route.get('/', async (request,response) => {

    try {
            const data = await readFileData();

            response.status(200).send({
                success: true,
                message: "Data Found.",
                data
            })
    } catch (error) {
            response.status(500).send({
                success: false,
                message: "Something went wrong.",
                erros
            })
    }

});

route.post('/', async (request,response) => {

    const { error } = schema.validate(request.body);

    if(!!error) {
        return response.status(422).send({
            success: false,
            message: "Validation Failed.",
            erros: error.details
        })
    }

    try{

        const data = await readFileData();

        const newItem = {
            id:uuidv4(),
            ...request.body
        }

        data.push(newItem);

        await writeFileData(data);

        response.status(201).send({
            success: true,
            message: "Data has been Submitted successfully",
            data: newItem
        });

    }catch(error){
            response.status(500).send({
                success: false,
                message: "Internal server error",
                error
            });
    }

});

route.get('/:id',async (request,response) => {

    try {

        const data = await readFileData();

        const item = data.find(item => item.id === request.params.id);

        if(!item) {
           return response.status(404).send({
                success: false,
                message: "Data not found."
            })
        }

        response.status(200).send({
            success: true,
            message: "Data found",
            data: item
        })

    } catch (error) {
        response.status(500).send({
            success: false,
            message: "Something went wrong.",
            error
        })
    }

});

route.put("/:id",async (request,response) => {

    try{
        const data = await readFileData();

        const index = data.findIndex(item => item.id === request.params.id);

        if(!index) {
            return response.status(404).send({
				success: false,
				message: 'Data not found.',
			});
        }

        const item = data[index];

        const updatedItem = {...item,...request.body}

        data[index] = updatedItem;

        await writeFileData(data)

        res.status(200).send({
            success: true,
            message: "Data Updated successfully.",
            data: updatedItem
        });

    }catch(error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong.",
            error
        })
    }
});

route.delete("/:id", async (req,res,next) => {

    const data = await readFileData();

    const result = data.filter(item => item.id !== req.params.id);

    await writeFileData(result)

    res.status(200).send({
        success: true,
        message: "Data Deleted Successfully."
    });

})

module.exports = route;