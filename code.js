module.exports = (client, env, triggerText) => {
    const Discord = require('discord.js')
    const prefix = env.prefix

    client.on('message', async msg => {
        let channel = msg.channel

        if(msg.content.startsWith(`${prefix}${triggerText}`)){
            let language = getLanguage(msg)
            if(isValidLanguage(language)){
                let previousMessage = await getPreviousMessage(channel)
                let formatedMessage = formatMessage(previousMessage.content, language)
                await previousMessage.delete()
                channel.send(formatedMessage)
            }else{
                const failureEmbed = new Discord.MessageEmbed()
                    .setColor('#95ff00')
                    .setTitle('Ops, não entendi!')
                    .setDescription('Para funcionar, escreva "**_code -{extensão_escolhida}**" com uma das extensões abaixo: ')
                    .addFields(langs)
                    .setFooter('Escolha uma das extensões acima')
                    .setTimestamp(new Date())
                    channel.send(failureEmbed)
            }
        }
    })

    function getLanguage(msg){
        return msg.content.split("-")[1]
    }

    function isValidLanguage(lang){
        return langs.find(x => x.value == lang) != undefined
    }    

    async function getPreviousMessage(channel){
        return channel.messages.fetch({ limit: 2 }).then(async messages => { return messages.array()[1]})
    } 
    
    function formatMessage(text, language){
        let package = "```"
        return `${package}${language}\n${text}${package}`
    }

    const langs = [
        {name: "ASCII", value:"ascii", inline: true},
        {name: "Autohotkey", value:"autohotkey", inline: true},
        {name: "Bash", value:"bash", inline: true},
        {name: "Coffeescript", value:"coffeescript", inline: true},
        {name: "C++", value:"cpp", inline: true},
        {name: "C#", value:"cs", inline: true},
        {name: "CSS", value:"css", inline: true},
        {name: "Diff", value:"diff", inline: true},
        {name: "Fix", value:"fix", inline: true},
        {name: "Glsl", value:"glsl", inline: true},
        {name: "Ini", value:"ini", inline: true},
        {name: "Markdown", value:"md", inline: true},
        {name: "Ml", value:"ml", inline: true},
        {name: "Prolog", value:"prolog", inline: true},
        {name: "Python", value:"py", inline: true},
        {name: "Tex", value:"tex", inline: true},
        {name: "Xl", value:"xl", inline: true},
        {name: "Xml", value:"xml", inline: true},
        {name: "JavaScript", value:"js", inline: true},
        {name: "Json", value:"json", inline: true},
        {name: "Kotlin", value:"kt", inline: true},
        {name: "PHP", value:"php", inline: true},
        {name: "GO", value:"go", inline: true},
        {name: "Dart", value:"dart", inline: true},
        {name: "SQL", value:"sql", inline: true},
        {name: "TypeScript", value:"ts", inline: true}
    ]
}
