const personName = "Sarthak";
const personAge = 12;
const personSchool = "DPS Patna"
const gamesPlayed = ["Minecraft", "Valorant", "EA FC Mobile"]

//Setting global module exports object
module.exports = {personName, personAge, personSchool, gamesPlayed};

//Another way of adding items/ data points to module.exports is :-
module.exports.items = ['item1', 'item2', 'item3'];
