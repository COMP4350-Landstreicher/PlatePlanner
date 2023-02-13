
const errorHandler = (err, req, res, next) => {
	const responseCode = res.statusCode ? res.statusCode : 500
	console.log(err.message);
	console.log(err.stack);
	res.status(responseCode)
	res.json({message: err.message})
}

module.exports = { errorHandler }
