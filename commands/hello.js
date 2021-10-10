const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Hey what\'s up?'),
	async execute(interaction) {
		await interaction.reply('Why hello there!');
	},
};