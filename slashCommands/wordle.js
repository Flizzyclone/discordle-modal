const Discord = require('discord.js');
const DBFunction = require('../database');

module.exports = {
	name: 'wordle',
	async respond(interaction) {
        await interaction.deferReply({ ephemeral: true });
        let word = await DBFunction.getWord(interaction.guildId);
        let msgContent = `Wordle - Length: ${word.length} - 6/6 tries remaining\n\n` + "​";
        for(i=0; i < word.length; i++) {
            msgContent+="⬛";
        }
        msgContent+="\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word."
        let components = new Discord.ActionRowBuilder()
        .addComponents([
            new Discord.ButtonBuilder()
            .setEmoji("❓")
            .setStyle("Primary")
            .setLabel("Make a guess")
            .setCustomId(`guess_${word}_6`)
        ])
        interaction.editReply({content: msgContent, components:[components], ephemeral:true});
    },
}