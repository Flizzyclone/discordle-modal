const Discord = require("discord.js");
const emojis = require("../emotes.json");

module.exports = {
	name: 'guess',
	async respond(interaction) {
        let tries = interaction.customId.replace("guess_","");
        let word = tries.substring(0,tries.indexOf('_'));
        tries = Number(tries.replace(`${word}_`,""))

        const submission = interaction.fields.getTextInputValue(interaction.components[0].components[0].customId);
        if (submission == word) {
            let msgContent = interaction.message.content;
            msgContent = msgContent.replace(`- ${tries}/6 tries remaining`,`- ${tries-1}/6 tries remaining`)

            let wordLetters = word.split("");
            for (i=0; i < wordLetters.length; i++) {
                if (i+1 < wordLetters.length) {
                    msgContent = msgContent.replace("⬛",emojis.blue[wordLetters[i]] + "​");
                } else {
                    msgContent = msgContent.replace("⬛",emojis.blue[wordLetters[i]] + "​" + " 🥳");
                }
            }

            let components = new Discord.ActionRowBuilder()
            .addComponents([
                new Discord.ButtonBuilder()
                .setEmoji("📣")
                .setStyle("Primary")
                .setLabel("Share in Channel")
                .setCustomId(`share_${word}_${7-tries}`)
            ]);
            interaction.update({content: msgContent, components:[components]});
        } else {
            if (tries == 1) {
                let msgContent = interaction.message.content;
                msgContent = msgContent.replace(`- ${tries}/6 tries remaining`,`- ${tries-1}/6 tries remaining`)
                msgContent = msgContent.replace("\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.","");

                let wordLetters = word.split("");
                let submissionLetters = submission.split("");
                for (i=0; i < wordLetters.length; i++) {
                    if (submissionLetters[i] == wordLetters[i]) {
                        msgContent = msgContent.replace("⬛",emojis.blue[submissionLetters[i]] + "​");
                    } else if (wordLetters.indexOf(submissionLetters[i]) != -1) {
                        msgContent = msgContent.replace("⬛",emojis.orange[submissionLetters[i]] + "​");
                    } else {
                        msgContent = msgContent.replace("⬛",emojis.black[submissionLetters[i]] + "​");
                    }
                }
                msgContent += `\n\nThe wordle was ${word}. Better luck next time!`;

                msgContent+="\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.";
                let components = new Discord.ActionRowBuilder()
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setEmoji("📣")
                    .setStyle("Primary")
                    .setLabel("Share in Channel")
                    .setCustomId(`share_${word}_X`)
                ]);
                interaction.update({content: msgContent, components:[components]});
            } else {
                let msgContent = interaction.message.content;
                msgContent = msgContent.replace(`- ${tries}/6 tries remaining`,`- ${tries-1}/6 tries remaining`)
                msgContent = msgContent.replace("\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.","");

                let wordLetters = word.split("");
                let submissionLetters = submission.split("");
                for (i=0; i < wordLetters.length; i++) {
                    if (submissionLetters[i] == wordLetters[i]) {
                        msgContent = msgContent.replace("⬛",emojis.blue[submissionLetters[i]] + "​");
                    } else if (wordLetters.indexOf(submissionLetters[i]) != -1) {
                        msgContent = msgContent.replace("⬛",emojis.orange[submissionLetters[i]] + "​");
                    } else {
                        msgContent = msgContent.replace("⬛",emojis.black[submissionLetters[i]] + "​");
                    }
                }
                msgContent += "\n​";
                for (i=0; i < wordLetters.length; i++) {
                    msgContent += "⬛"
                }
                msgContent+="\n\n🟦 = Letter in word in correct spot.\n🟧 = Letter in word in a different spot.\n⬛ = Letter not in word.";
                let components = new Discord.ActionRowBuilder()
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setEmoji("❓")
                    .setStyle("Primary")
                    .setLabel("Make a guess")
                    .setCustomId(`guess_${word}_${tries-1}`)
                ])
                interaction.update({content: msgContent, components:[components]});
            }
        }
    }
}