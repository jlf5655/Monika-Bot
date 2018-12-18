module.exports = (client, member)=>{
		const channel = member.guild.channels.find(c=>c.name === 'general');
		channel.send(`Welcome to club, ${member}! My name is Monika. If you want to know what I can do for you, just mention me with the command help`);
}