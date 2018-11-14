const perm = {
	permLevels: [
		{
			level: 0,
			name: 'User',
			check: () => true
		},
		{
			level: 2,
			name: 'Developer',
			check: () => true
		}
	]	
};

module.exports = perm;