const { Sequelize, INTEGER } = require('sequelize');

const sequelize = new Sequelize('server', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './data/guildWords.sqlite',
})

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
  if(entry != null) {
    return true;
  } else {
    return false;
  }
}

/**
* Checks if a guild has an entry in the guild words database.
* @param id - The id of the guild to check for an entry for.
* @return {boolean} true if successful, false if not.
*/
async function setWord(id, word) {
  let guildPres = await guildPresent(id);
  if (guildPres) {
    try {
      await serverWords.update({ word: word}, { where: { guild_id: id }});
      return true;
    }
    catch(e) {
      return false;
    }
  } else {
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
* @param id - The id of the guild to check for an entry for.
* @return {String} the word, default is "blank".
*/
async function getWord(id) {
  let guildPres = await guildPresent(id);
  if (guildPres) {
    try {
      let entry = await serverWords.findOne({ where: { guild_id: id } });
      return entry.dataValues.word;
    }
    catch(e) {
      return "blank";
    }
  } else {
    return "blank";
  }
}

/**
* Deletes a guild entry from the guild words database.
* @param id - The id of the guild to check for an entry for.
*/
async function deleteGuildEntry(id) {
  let guildPres = await guildPresent(id);
  if (guildPres) {
    serverWords.destroy({
      where: { guild_id: id }
    });
  }
}

module.exports = {
  guildPresent, setWord, getWord, deleteGuildEntry
}