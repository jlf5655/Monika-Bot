/*
https://github.com/AnIdiotsGuide/guidebot/blob/master/commands/help.js
A really nice implementation that I wish I could have thought of myself
*/
exports.run = (client, message, args, level) =>{ //defaulting to 'User' level until I get permission levels working correctly
	// either show all commands or the specified command
	if(!args[0]){
		// command permission levels
		const myCmds = message.guild ? client.commands.filter(
			cmd => client.levelCache[cmd.conf.permLevel] <= level
			) : client.commands.filter(
				cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);
		
		const cmdNames = myCmds.keyArray();
		const longest = cmdNames.reduce((long, str) => Math.max(long, str.length), 0);
		
		let currentCat = '';
		let output = `= Command List = \n\n[Use help <commandName> for details]\n`;
		const sorted = myCmds.array().sort((p, c) => p.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);
		
		sorted.forEach(c => {
			const cat = c.help.category.toProperCase();
			if(currentCat !== cat){
				output += `\u200b\n== ${cat} ==\n`;
				currentCat = cat;
			}
			output += `${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
		});
		message.channel.send(output, {code : 'asciidoc', split: {char: '\u200b'}}).catch(console.error);
	}
	else{
		// show specified command
		let cmd = args[0];
		if(client.commands.has(cmd)){
			cmd = client.commands.get(cmd);
			if(level < client.levelCache[cmd.conf.permLevel])
				return;
			message.channel.send(`= ${cmd.help.name} = \n${cmd.help.description}\nusage:: ${cmd.help.usage}\naliases:: ${cmd.conf.aliases.join(', ')}\n= ${cmd.help.name} =`, {code: 'asciidoc'});
		}
	}
};

exports.conf = {
	enabled: true,
	guldOnly: false,
	aliases: ['h', 'halp', 'hlp', 'plz'],
	permLevel: 'User'
};

exports.help = {
	name: 'help',
	category: 'System',
	description: 'Displays all the available commands for your permission level.',
	usage: 'help [command]'
};