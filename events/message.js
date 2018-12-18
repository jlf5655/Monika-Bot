module.exports = async (client, message)=>{
	if(message.author.bot) return; // don't talk to bots ...yet
	const prefixMention = new RegExp(`^<@!?${client.user.id}> `); // regExp to find bot's username
	const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : '!';
	if(message.content.indexOf(prefix) !== 0) return; // avoid general messages
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase(); // format text to avoid errors
	// Get permission level of message sender
	const level = client.permLevel(message);
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)); // look for command from command files
	if(!cmd) return; // return silently if command isn't found
	// check to make sure command isn't available in direct message
	if(cmd && !message.guild && cmd.conf.guildOnly)
		return message.channel.send('This command is not available in private messages.');
	if(level < client.levelCache[cmd.conf.permLevel]){
		return message.channel.send(`You do not have permission to use this command. Your permission level is ${level} (${client.perm.permLevels.find(el => el.level === level).name}) This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
	}
	message.author.permLevel = level;
		
	message.flags = [];
	while(args[0] && args[0][0] === '-'){
		message.flags.push(args.shift().slice(1));
	}
	
	client.logger.cmd(`[CMD]${client.perm.permLevels.find(l=>l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
	cmd.run(client, message, args, level); // run the command
};