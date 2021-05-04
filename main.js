require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

//import the _code command
const code = require('./code')

client.on('ready', async () => {
    console.log(`Running ${client.user.username}!`)
    code(client, process.env, 'code')
});

client.login(process.env.token)