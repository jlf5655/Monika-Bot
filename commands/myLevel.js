exports.run = async (client, message, args, level) => {
		message.channel.send(`Your permission level is: ${level} - ${client.perm.permLevels.find(l => l.level === level).name}`);
};

exports.conf = {
	enabled: true,
	guildOnly: true, // should be guild only
	aliases: ['level'],
	permLevel: 'User'
};

exports.help = {
	name: 'mylevel',
	category: 'Other',
	description: 'Tells you your permission level for bot commands',
	usage: 'myLevel'
};