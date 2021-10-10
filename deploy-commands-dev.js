/* 
Adding commands:

1. Add your testing server ID to config.json
2. Add commands and their descriptions to config.json
3. Run 'node deploy-commands-dev.js'
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, devServerId, token, commandList } = require('./config.json');

const commands = []

Object.entries(commandList).forEach(command => {
	commands.push(new SlashCommandBuilder().setName(command[0]).setDescription(command[1]));
});

commands.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, devServerId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);