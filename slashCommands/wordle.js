const Discord = require('discord.js');
const DBFunction = require('../database');

module.exports = {
	name: 'wordle',
	async respond(interaction) { //Called when user runs /wordle command as defined by name prop
        await interaction.deferReply({ ephemeral: true }); //Sets the message to be only viewable by the player

        //Builds message content
        let word = await DBFunction.getWord(interaction.guildId);
        let msgContent = `Wordle - Length: ${word.length} - 6/6 tries remaining\n\n` + "​";
        for(i=0; i < word.length; i++) { //Adds in a single row of black squares so player can see length of the correct word
            msgContent+="⬛";
        }
        msgContent+="\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word."
        let components = new Discord.ActionRowBuilder()
        .addComponents([
            new Discord.ButtonBuilder()
            .setEmoji("❓")
            .setStyle("Primary")
            .setLabel("Make a guess")
            .setCustomId(`guess_${word}_6`) //customId for 'Guess' button follows the format "guess_[the correct word]_[the number of tries the player has left]"
        ])
        interaction.editReply({content: msgContent, components:[components], ephemeral:true}); //Responds with a message containing the game message content and 'Guess' button. Only viewable by player
    },
}