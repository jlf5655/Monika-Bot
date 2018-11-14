// Extra functions
Object.defineProperty(String.prototype, 'toProperCase', {
	value: function() {
		return this.replace(/([^\W_]+[^\s-]*)*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	}
});

process.on('uncaughtException', (err) =>{
	const msg = err.stack.repace(new RegExp(`${__dirname}/`, 'g'), './');
	console.log(`Uncaught Exception: ${msg}`);
});

process.on('unhandledRejection', (err) => {
	console.log(`Unhandled Rejection: ${err}`);
});