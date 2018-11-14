exports.run = async (client, message, args, level) => {
		const word = client.perm.permLevels.find(l => l.level === level).name;
		message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['level'],
	permLevel: 'User'
};

exports.help = {
	name: 'myLevel',
	category: 'Other',
	description: 'Tells you your permission level for bot commands',
	usage: 'myLevel'
};