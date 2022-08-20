const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('server', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './data/guildWords.sqlite',
})

//Initalizes serverWords table in the database contained in at './data/guildWords.sqlite'. See initialization for field information.
const serverWords = sequelize.define('serverWords', {
    guild_id: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    word: {
      type: Sequelize.STRING,
      unique: false,
      defaultValue: 0,
      allowNull: false
    },
    tries: {
      type:Sequelize.INTEGER,
      unique: false,
      defaultValue: 6,
      allowNull: false
    }
},{
    freezeTableName: true
});

serverWords.sync();

/**
* Checks if a guild has an entry in the guild words database.
* @param id - The id of the guild to check for an entry for.
* @return {boolean} true if a guild has an entry in the database, false if it does not.
*/
async function guildPresent(id) {
  let entry = await serverWords.findOne({ where: { guild_id: id } });
  if(entry != null) { //Sequelize returns null if no entry exists
    return true;
  } else {
    return false;
  }
}

/**
* Sets the word for a guild in the serverWords database table.
* @param id - The id of the guild to set the word for.
* @return {boolean} true if successful, false if not.
*/
async function setWord(id, word) {
  let guildPres = await guildPresent(id);
  if (guildPres) { //Entry for guild exists
    try {
      await serverWords.update({ word: word}, { where: { guild_id: id }});
      return true;
    }
    catch(e) {
      return false;
    }
  } else { //Entry for guild does not exist (here if bot uptime != 100%)
    try {
      await serverWords.create({
        guild_id: id,
        word: word
      });
      return true;
    }
    catch(e) {
      return false;
    }
  }
}

/**
* Gets a word from the guild entry database.
* @param id - The id of the guild to get the word for.
* @return {String} the word, default is "blank".
*/
async function getWord(id) {
  let guildPres = await guildPresent(id);
  if (guildPres) { //Entry for guild exists
    try {
      let entry = await serverWords.findOne({ where: { guild_id: id } });
      return entry.dataValues.word;
    }
    catch(e) {
      return "blank";
    }
  } else { //Entry for guild does not exist (here if bot uptime != 100%)
    return "blank";
  }
}

/**
* Deletes a guild entry from the guild words database.
* @param id - The id of the guild to delete the entry for.
*/
async function deleteGuildEntry(id) {
  let guildPres = await guildPresent(id);
  if (guildPres) { //Entry for guild exists
    serverWords.destroy({
      where: { guild_id: id }
    });
  }
}

module.exports = {
  guildPresent, setWord, getWord, deleteGuildEntry
}