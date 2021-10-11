const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apexstats')
		.setDescription('Apex Legends stats viewer'),
	async execute(interaction) {
		await interaction.reply(getData());
	}
};

function getData() {
	return "Hello, world!";
}