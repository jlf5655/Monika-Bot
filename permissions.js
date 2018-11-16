const perm = {
	permLevels: [
		{
			level: 0,
			name: 'User',
			check: () => true
		},
		{
			level: 9,
			name: 'Developer',
			check: (message) => client.config.devs.includes(message.author.id)
		},
		{
			level: 10,
			name: 'Bot Owner',
			check: (message) => message.author.id === message.client.config.owner
		}
	]	
};

module.exports = perm;