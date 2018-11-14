exports.run = (client, message, args) => {
	message.channel.send('pong!').catch(console.error);
}

exports.conf = {
	enabled: true,
	guldOnly: false,
	aliases: ['p'],
	permLevel: 'User'
};

exports.help = {
	name: 'ping',
	category: 'System',
	description: 'Returns "pong!" to the channel chat',
	usage: 'ping'
};