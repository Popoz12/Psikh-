
///invitation : https://discordapp.com/oauth2/authorize?client_id=443071609385910272&scope=bot&permissions=2146958591

const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");


client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`>help
  Sur ${client.guilds.size} serveurs, au service de ${client.users.size} utilisateurs!`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`>help
  Sur ${client.guilds.size} serveurs, au service de ${client.users.size} utilisateurs! `);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`>help
  Sur ${client.guilds.size} serveurs, au service de ${client.users.size} utilisateurs!`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms. API: ${Math.round(client.ping)}ms`);
  }

  if(command === "help") {
    message.react("👌");
    message.author.send({embed: {
        color: 5635584,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Psikhì Help",
        description: "Liste des différentes commandes:",
        fields: [{
            name: ">ping",
            value: "Pong!"
          },
          {
            name: ">dit [texte]",
            value: "Fait dire le texte au bot. *Idéal pour parler en toute discretion...*"
          },
          {
            name: ">coucou [@user]",
            value: "Notifie un utilisateur. *coucou <3*"
          },
          {
            name: ">choose [élément1] [élément2] ... [élément∞]",
            value: "Fait les choix difficiles de la vie à votre place."
          },

          {
            name: ">sondage [texte]",
            value: "Vous permet de créer un *magnifique* sondage de type oui/non."
          },

          {
            name: ">pp",
            value: "Vous montre votre magnifique image de profil."
          },
          {
            name: ">invite",
            value: "Vous permet d'afficher le lien pour inviter le bot. [L'inviter dès maintenant](https://discordapp.com/oauth2/authorize?client_id=443071609385910272&scope=bot&permissions=2146958591)"
          },

          {
            name: ">pfc [👊/✋/✌]",
            value: "Jouer à pierre(:punch:) feuille(:raised_hand:) ciseaux(:v:) avec le bot!"
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Bot créé par @popoz12#6505"
        }

      }
    })
    console.log(message.author.username+" a demandé de l'aide");
  }
  
  if(command === "dit") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
    //message.channel.send("popoz est mon créateur, c'est incontestable")
    console.log(message.author.username+" dans le serveur "+message.guild.name+": "+sayMessage);
  }

  if(command === "coucou") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
        member = ""
    const sayMessage = member+", coucou!";
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
    console.log(message.author.username+" a mentionné "+member.username+" dans le serveur "+message.guild.name)
  }

  if(command === "pp") {
    message.reply(message.author.avatarURL);
  }

  if(command === "invite") {
    message.reply("invite moi sur ton/tes serveurs avec ce lien! https://discordapp.com/oauth2/authorize?client_id=443071609385910272&scope=bot&permissions=2146958591");
  }

  if(command === "choose") {
    min = 0;
    max = Math.floor(args.length-1);
    random(min, max);
    message.channel.send("Je choisis "+ args[randnum]);
    console.log(message.author.username + " dans le serveur "+message.guild.name+" je choisis "+randnum+" sur "+max+" éléments")
  }

  if(command === "sondage"){
    message.delete().catch(O_o=>{});
    const sondage = args.join(" ");
    var embed = new Discord.RichEmbed()
      .setDescription("Sondage de "+message.author.username)
      .addField(sondage, "Répondre avec :white_check_mark: ou :x:")
      .setColor(5635584)
      .setTimestamp()
    message.channel.send(embed)
    .then(function (message) {
      message.react("✅")
      message.react("❌");
    })
  }

  if(command === "pfc") {
    min = 0
    max = 2
    random(min, max)
    if(randnum == 0){
      message.channel.send(":punch:");
      if(args[0] === "👊"){
        return message.channel.send("**EGALITE**")
      }
      if(args[0] === "✋"){
        return message.channel.send(message.author.username+" a gagné! Le perdant est "+client.user.username)
      }
      if(args[0] === "✌"){
        return message.channel.send(client.user.username+" a gagné! Le perdant est "+message.author.username)
      }
      message.channel.send("Merci de jouer avec :punch: :raised_hand: :v: !")
    }
    if(randnum == 1){
      message.channel.send(":raised_hand:");
      if(args[0] === "✋"){
        return message.channel.send("EGALITE")
      }
      if(args[0] === "✌"){
        return message.channel.send(message.author.username+" a gagné! Le perdant est "+client.user.username)
      }
      if(args[0] === "👊"){
        return  message.channel.send(client.user.username+" a gagné! Le perdant est "+message.author.username)
      }
      message.channel.send("Merci de jouer avec :punch: :raised_hand: :v: !")
    }
    if(randnum == 2){
      message.channel.send(":v:");
      if(args[0] === "✌"){
        return message.channel.send("EGALITE")
      }
      if(args[0] === "👊"){
        return message.channel.send(message.author.username+" a gagné! Le perdant est "+client.user.username)
      }
      if(args[0] === "✋"){
        return message.channel.send(client.user.username+" a gagné! Le perdant est "+message.author.username)
      }
      message.channel.send("Merci de jouer avec :punch: :raised_hand: :v: !")
    }
    console.log(args[0])
  }

});
client.on('message', message => {
    if (message.content === 'STANDA POWAR!') {
        // Send "pong" to the same channel
        message.channel.send('**YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA YA!!!**');
    }

    /*if (message.content === 'x)') {
        // Send "pong" to the same channel
        message.channel.send('*non*, non, NON, **NOOOOOOOON**!!!!!');
    }*/

    if(message.content === "x)") {
      message.react("🚫");
    }

    if(message.mentions.everyone) {
      message.react("🔫");
      message.react("👿");
      console.log(message.author.username + " a fait un @everyone dans le serveur "+message.guild.name)
    }

    if(message.content === "Présentez") {
      message.channel.send("ARMES!");
    }

    if(message.content === ">") {
      message.channel.send("Finis ta commande mec");
    }

    if(message.content === "Yoyoyo") {
      message.channel.send(":eyes:");
    }

    if(message.content === "super-x)") {
      message.channel.send("x)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))")
    }

});

function random(min, max) {
  randnum = Math.floor(Math.random()*(max-min+1)+min);
}
client.login(config.token);
