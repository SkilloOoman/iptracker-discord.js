const get = require('get');
const discord = require('discord.js');
var client = new discord.Client()
var fs = require('fs');

client.on('ready', () => {
    console.log('ready as '  + client.user.tag);
    client.user.setUsername('Skillo B.O.T')
    client.user.setAvatar(fs.readFileSync('./stylo.jpg'))
});
client.on('message', message => {
    if(message.content === '/help'){
        message.channel.send('Forme du message :\n\`\`\`/trck "ip address"\`\`\`');
    }
    if(message.content.startsWith("/" + "trck")){
        var args = message.content.split(' ');
        var ip = args[1];
        if(!ip){
            message.reply('NO IP');
        }
        var dl = get({
            uri : `https://ipapi.co/${ip}/json`
        });
        dl.asString(function(err, mydata) {
            console.log(mydata)
            var data = JSON.parse(mydata)
            if(data.error === true){
                message.reply('Invalid IP Address');
            }else{
                var ip = data.ip, city = data.city, region = data.region, zip = data.postal, countryName = data.country_name, latitude = data.latitude, longitude = data.longitude, org = data.org;
                var embedReply = new discord.RichEmbed()
                .setAuthor(client.user.tag)
                .setTitle('Ip Tracker')
                .setColor('RANDOM')
                .setDescription('Voici les informations sur : **' + ip + "**")
                .addField('City :', city)
                .addField('Region : ', region)
                .addField('Zip : ', zip)
                .addField('CoutryName', countryName)
                .addField('Latitude : ', latitude)
                .addField('Longitude : ', longitude)
                .addField('Organisation :', org)
                .setThumbnail(message.author.avatarURL)
                message.channel.send(embedReply);
            }
        });
    }
});
client.login("NDYwNDcwMTYwNTE2NDQ4Mjc2.Di4LSg.nNkWovLWCALXNmhziMZwsJwINO4");
