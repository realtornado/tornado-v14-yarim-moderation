const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const voiceXPSchema = new Schema({
    guildID: { type: String, required: true },
    userID: { type: String, required: true },
    channelName: { type: String, required: true },
    timestamp: { type: Number, default: 0 } // Veriyi dakika cinsinden saklayacağımızı varsayalım
});

const VoiceXP = mongoose.models.VoiceXP || model("VoiceXP", voiceXPSchema);

module.exports = VoiceXP;
