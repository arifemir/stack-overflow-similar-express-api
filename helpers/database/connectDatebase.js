const mongoose = require('mongoose')
const chalk = require('chalk')

const connectDatabase = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log(chalk.green.bold('connect mongodb succsess'))
		})
		.catch((err) => {
			console.log(chalk.red.bold(err))
		})
}

module.exports = connectDatabase
