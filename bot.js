const {Client, Attachment, RichEmbed, Guild, GuildMember, MessageMentions, Role} = require('discord.js');
const bot = new Client();
const superagent = require('superagent');
const PREFIX = '​';
const testpre = '-';

bot.on('ready', () =>{
	console.log('Fwidee >~<.');
	bot.user.setActivity('with you. ^-^', { type: ('PLAYING')})
})

bot.on('guildMemberAdd', member =>{

	const channel = member.guild.channels.find(channel => channel.name === "welcome");
	if(!channel) return;
	let role = member.guild.roles.find("name", "Normies");
	member.addRole(role.id);
	channel.sendMessage(`Welcome to my shitty server, ${member}. Please be active and check out <#596132681226518538>.`);
})

bot.on('guildMemberRemove', member =>{

	const channel = member.guild.channels.find(channel => channel.name === "welcome");
	if(!channel) return;
	channel.sendMessage(`I guess my server was too shitty for you, ${member}...`)
})
bot.on('message', msg=>{

	mention = msg.mentions.users.first();

	if(msg.content === '<@596149623400169502> Pwease gimme cookies.'){
		msg.channel.sendMessage("Your cookies has been sent in your DM's.")
		const cookies = new Attachment('https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg');
		msg.author.sendMessage("Here's your cookies! >~<");
		msg.author.sendMessage(cookies);
	}
	if(msg.content === '<@596149623400169502>'){
		msg.channel.sendMessage("OwO?")
	}
	if(msg.content === '<@596149623400169502> Gay.'){
		msg.channel.sendMessage("No you. >~<")
	}
	if(msg.content === '<@596149623400169502> Hi!'){
		msg.channel.sendMessage("Hewwo! ^-^")
	}
	if(msg.content === "ah.mp4"){
		const attachement = new Attachment('https://cdn.discordapp.com/attachments/545281417571991572/595472395159076890/ah.mp4');
		msg.channel.sendMessage(attachement);
	}
	if(msg.content === '...'){
		if(msg.author.id === '333357946744602647'){
			const akame = new Attachment('https://cdn.discordapp.com/attachments/574383177418670080/596809522807439384/1498048478_tumblr_nglsikuDqM1rbrys3o2_r1_500.gif');
			msg.channel.sendMessage('You know what will happen next... :smiling_imp:');
			msg.channel.sendMessage(akame);			}
		else{
			return;
		}
	}
	if(msg.content === "<@596149623400169502> Help."){
		const embed = new RichEmbed()
		.setTitle('Available Commands :')
		.addField('General commands', "'@Fwydee#5983 Help.' : Shows you all available commands.\n'-kick' : Kicks a specific user from the server.\n'-ban' : Ban a specific user from the server.\n'-unban' : Unban a specific user from the server (Only with the discord ID).\n'-purge' : Pruge a specific amount of messages on the channel.\n'-announcement' : Makes a public announcement to the server.")
		.addField('Entertainment commands', "'@Fwydee#5983 Pwease send memes.' : Sends memes.\n'-OwO' : Makes any text in OwO.\n'ah.mp4' (Without the prefix) : Ah! (earrape).\n'@Fwydee#5983 Gay.' : No you?.\n'@Fwidee#5983 Pwease gimme cookies.' : Only when you are in need. >~<\n'@Fwydee#5983 Hi!' : Hewwo?")
		.addField('Current normal prefix', "'-' : It's the current prefix.")
		.setColor(0x160033)
		msg.channel.sendEmbed(embed);
	}
	if(msg.content === "<@596149623400169502> Pwease send memes."){
		const randomPuppy = require('random-puppy');
		const snekfetch = require('snekfetch');
		let reddit = [
			"meme",
			"animemes",
			"MemesOfAnime",
			"animememes",
			"AnimeFunny",
			"dankmemes",
			"dankmeme",
			"wholesomememes",
			"MemeEconomy",
			"meirl",
			"me_irl",
			"2meirl4meirl"
		];
		let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];
		msg.channel.startTyping();
		randomPuppy(subreddit).then(url =>{
			snekfetch.get(url).then(async res =>{
				await msg.channel.sendMessage({
					files: [{
						attachment: res.body,
						name: 'meme.png'
					}]
				}).then(msg.channel.stopTyping());
			});
		});
	}
	let args2 = msg.content.substring(testpre.length - 1).split(" ");
	switch(args2[0]){
		case '-OwO':
			if(!args2[1]) return msg.channel.sendMessage('OwO?');
			const owoMessage = args2.join(" ").slice(5);
			someString = owoMessage
			anotherString = someString.replace(/r/g, 'w');
			s1 = anotherString.replace(/R/g, 'W');
			s2 = s1.replace(/l/g, 'w');
			s3 = s2.replace(/L/g, 'W');
			msg.channel.bulkDelete('1');
			msg.channel.sendMessage(s3);
		break;
	}
	let args = msg.content.substring(PREFIX.length - 1).split(" ");
	switch(args[0]){
		case '-purge':
			const command = args.join(" ");
			if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage("You don't have the permission to purge messages!");
			if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage("I don't have the allowed permission to purge messages!");
			if(!args[1]) return msg.channel.sendMessage('Please specify a number of messages to be purged!');
			msg.channel.bulkDelete(args[1]);
		break;
		case '-announcement':
			if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.sendMessage("You don't have the permission to make an announcement!");
			if(!msg.guild.me.hasPermission("ADMINISTRATOR")) return msg.channel.sendMessage("I don't have the allowed permission to make an announcement!");
			if(!args[1]) return msg.channel.sendMessage('What are you trying to announce?')
			const aMessage = args.join(" ").slice(14);
			const achannel = bot.channels.find(channel => channel.name === "announcements");
			const aAuthor = msg.author.username
			const agif = new Attachment('https://images-gmi-pmc.edge-generalmills.com/087d17eb-500e-4b26-abd1-4f9ffa96a2c6.jpg');
			if(!achannel) return;
			msg.channel.bulkDelete(1);
			achannel.sendMessage('@everyone ' + aMessage + '\n \n' + 'Announcement made by ' + aAuthor + '.')
			achannel.sendMessage(agif)
		break;
		case '-kick':
			const tuser = msg.mentions.users.first();
			const kreason = args.join(" ").slice(28);
			if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to kick someone!");
			if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to kick someone!");
			if(!args[1]) return msg.channel.sendMessage('Please specify a user!')
			if(tuser){
				const member = msg.guild.member(tuser)
				if(member){
					if(!kreason){
						member.kick('You were kicked.');
						const kembed = new RichEmbed()
						.setTitle('User has been kicked!')
						.addField("User's name", tuser)
						.addField("User's ID", tuser.id)
						.addField("Reason", 'No reason specified.');
						msg.channel.sendEmbed(kembed);
					}
					else{
						member.kick(kreason);
						const kembed = new RichEmbed()
						.setTitle('User has been kicked!')
						.addField("User's name", tuser)
						.addField("User's ID", tuser.id)
						.addField("Reason", kreason);
						msg.channel.sendEmbed(kembed);
					}
				}
			}
		break;
		case '-ban':
			if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to ban someone!");
			if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to ban someone!");
			if(!args[1]) return msg.channel.sendMessage('Please specify a user!')
			const user = msg.mentions.users.first();
			const breason = args.join(" ").slice(27);
			if(user){
				const member = msg.guild.member(user)
				if(member){
					if(!breason){
						member.ban('You were banned.');
						const bembed = new RichEmbed()
						.setTitle('User has been banned!')
						.addField("User's name", user)
						.addField("User's ID", user.id)
						.addField("Reason", 'No reason specified.');
						msg.channel.sendEmbed(bembed);
					}
					else{
						member.ban(breason);
						const bembed = new RichEmbed()
						.setTitle('User has been banned!')
						.addField("User's name", user)
						.addField("User's ID", user.id)
						.addField("Reason", breason);
						msg.channel.sendEmbed(bembed);
					}
				}
			}
		break;
		case '-unban':
			if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to unban someone!");
			if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to unban someone!");
			if(!args[1]) return msg.channel.sendMessage('Please specify a user ID!')
			msg.guild.unban(args[1])
			const uembed = new RichEmbed()
			.setTitle('User has been unbanned!')
			msg.channel.sendEmbed(uembed);
		break;
	}
})

bot.login(process.env.BOT_TOKEN);
