const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { apiKeys } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apexstats')
		.setDescription('Apex Legends statistics')
		.addStringOption(option =>
			option.setName('player')
				.setDescription('The player to search')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('platform')
				.setDescription('The platform the account is on (PC, PS4, Xbox)')
				.setRequired(false)
				.addChoice('PC', 'PC')
				.addChoice('PS4', 'PS4')
				.addChoice('Xbox', 'X1')),
	async execute(interaction) {
		let platform = interaction.options.getString('platform')
		if(platform == null) { platform = 'PC' }
		const player = interaction.options.getString('player');
		const url = `https://api.mozambiquehe.re/bridge?version=5&platform=${platform}&player=${player}&auth=${apiKeys.apexlegends}`
		try {
			await interaction.deferReply();
			const raw = await axios.get(url, {
				headers: { 'Content-Type': 'application/json' }
			  }
			).then(response => response);
			const embed = await parseData(raw, platform);
			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			if (error.message == 'Request failed with status code 404') {
				await interaction.editReply({content: `That player exists, but hasn't played Apex Legends on that platform (${platform})!`, ephemeral: true});
			} else if (error.message == 'Cannot read properties of undefined (reading \'name\')') {
				await interaction.editReply({content: `That player does not exist! Maybe you made a typo?`, ephemeral: true});
			} else {
				await interaction.editReply({content: `An unknown error occured! Please try again, and if the issue persists, please report it at https://github.com/maxwellward/Borealis/issues`, ephemeral: true});
			}
			return;
		}
	}
};

const colours = ['#B93038', '#A4373D', '#F97B2E', '#E3DFD6'];
function parseData(raw, platform) {
	const data = raw.data;
	const global = data.global;
	const embed = new MessageEmbed()
	.setColor(colours[Math.floor(Math.random() * colours.length)])
	.setTitle(global.name)
	.setURL(`https://www.origin.com/can/en-us/search?searchString=${global.name}`)
	.setDescription(`Apex Legends (${platform})`)
	.setThumbnail(global.rank.rankImg)
	.addFields(
		{ name: 'Status', value: `${data.realtime.currentStateAsText}`},
		{ name: 'Level', value: `${global.level} (${global.toNextLevelPercent}%)` },
		{ name: 'Competitive Rank', value: `${global.rank.rankName} ${global.rank.rankDiv}` },
		{ name: 'Total Kills', value: `${data.total.kills.value} (${data.total.kd.value}k/d)` },
		{ name: 'Active Legend', value: `${data.realtime.selectedLegend}` }
	)
	.setTimestamp()
	.setFooter('Made with love by BananaFalls');
	return embed;
}
	
