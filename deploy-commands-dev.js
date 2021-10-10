/* 
Adding commands:

1. Add your testing server ID to config.json ("devServerId")
2. Add a new command in /commands/
3. Run 'node deploy-commands-dev.js'
*/

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, devServerId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, devServerId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);