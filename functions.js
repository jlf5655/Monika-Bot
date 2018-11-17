// Extra functions
module.exports = (client) => {
	
	client.permLevel = message => {
		let permlvl = 0;
		const permOrder = client.perm.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
		while(permOrder.length){
			const currentLevel = permOrder.shift();
			if(message.guild && currentLevel.guildOnly)
				continue;
			if(currentLevel.check(message)){
				permlvl = currentLevel.level; // if permission level is equal to or higher than required
				break;
			}
		}
		return permlvl;
	};
	
	Object.defineProperty(String.prototype, 'toProperCase', {
		value: function() {
			return this.replace(/([^\W_]+[^\s-]*)*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
		}
	});

	process.on('uncaughtException', (err) =>{
		const msg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
		console.log(`Uncaught Exception: ${msg}`);
	});

	/*process.on('unhandledRejection', (err) => {
		console.log(`Unhandled Rejection: ${err}`);
	});*/
};