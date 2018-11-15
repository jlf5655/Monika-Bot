exports.run = async (client, message, args) =>{
	if(!args || args.length < 1)
		return message.channel.send('You must provide a command to reload').catch(console.error);
	const cmdName = args[0]; // get the command to reset, only one at a time
	if(!client.commands.has(cmdName))
		return message.channel.send('That command does not exist').catch(console.error);
	delete require.cache[require.resolve(`./${cmdName}.js`)];
	client.commands.delete(cmdName); // remove from enmap
	const cmd = require(`./${cmdName}.js`);
	client.commands.set(cmdName, cmd);
	console.log(`Reloading command ${cmdName} to cache`);
	message.channel.send(`The command ${cmdName} has been reloaded`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['r'],
	permLevel: 'User'
};

exports.help = {
	name: 'reload',
	category: 'System',
	description: 'Reloads a command to the cache',
	usage: 'reload [command]'
};

