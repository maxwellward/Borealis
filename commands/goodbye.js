const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goodbye')
		.setDescription('Oh, goodbye :('),
	async execute(interaction) {
		await interaction.reply('See you later!');
	},
};