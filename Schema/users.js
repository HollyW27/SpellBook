const { Schema, model} = require('mongoose');
const usersSchema = new Schema({
    username: String,
    password: String,
    nonce: Number
});

module.exports = model("user", usersSchema, "users");