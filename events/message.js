module.exports = (client, message)=>{
	if(message.author.bot) return; // don't talk to bots ...yet
	const prefixMention = new RegExp(`^<@!?${client.user.id}> `); // regExp to find bot's username
	const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : '!';
	if(message.content.indexOf(prefix) !== 0) return; // avoid general messages
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase(); // format text to avoid errors
	
	const cmd = client.commands.get(command); // look for command from command files
	if(!cmd) return; // return silently if command isn't found
	cmd.run(client, message, args); // run the command
};