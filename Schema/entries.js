const { Schema, model} = require('mongoose');
const entrySchema = new Schema({
    day: Number,
    month: Number,
    year: Number,
    entry: String,
    unix: Number,
    username: String
});

module.exports = model("entry", entrySchema, "entries");