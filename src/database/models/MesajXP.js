const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const MesajXPDB = mongoose.models["MesajXP"] || model("MesajXP", new Schema({ author: String, xp: String, messageCount: String, channels: [{ channelId: String, channelName: String, messageCount: Number }]
}));

module.exports = MesajXPDB;