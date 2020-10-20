const schema = require('./schema');


const validateForm = (request,response,next) => {

    const { error } = schema.validate(request.body);

	if (!!error) {
		return response.status(422).send({
			success: false,
			message: 'Validation Failed.',
			error: error.details,
		});
    }

    next();
}

module.exports = {validateForm}