const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const InvıteCreateDB = mongoose.models["InvıteCreateDB"] || model("InvıteCreateDB", new Schema({
    code: String,
    uses: String,
    inviter: String,
}));

module.exports = InvıteCreateDB;