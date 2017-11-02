class jokesModule {
	constructor(bot) {
		this.bot = bot;
		this.commands = bot.commands;
		this.perms = bot.commands.perms;
	}

	init() {
		this.registerCommands();
	}

	registerCommands() {
		var self = this;

		self.commands.addCommand({
			trigger: "!alot",
			function: self.alotCommand,
			permCheck: self.perms.pass
		});
		self.commands.addCommand({
			trigger: "!bees",
			function: self.beesCommand,
			permCheck: self.perms.pass
		});
		self.commands.addCommand({
			trigger: "!kittens",
			function: self.kittensCommand,
			permCheck: self.perms.pass
		});
		self.commands.addCommand({
			trigger: ["!lmgtfy", "!google"],
			function: self.kittensCommand,
			permCheck: self.perms.pass
		});
		self.commands.addCommand({
			trigger: "!ping",
			function: self.pingCommand,
			permCheck: self.perms.pass
		});
	}

	alotCommand(msg) {
		msg.channel.send("Read about the alot here: <http://hyperboleandahalf.blogspot.co.uk/2010/04/alot-is-better-than-you-at-everything.html>");
	}

	beesCommand(msg) {
		var self = this;
		self.bot.checkCooldown("bees", function(){
			self.bot.addCooldown("bees");
			msg.channel.send("Bees, you say? https://media.giphy.com/media/dcubXtnbck0RG/giphy.gif");
			msg.delete();
		});
	}

	kittensCommand(msg) {
		var self = this;
		var x = Math.floor(Math.random() * 400) + 800;
		var y = Math.floor(Math.random() * 400) + 800;
		
		self.bot.checkCooldown("kittens", function(){
			self.bot.addCooldown("kittens", 60);
			msg.reply("Sorry, we're out of kittens right now. Have a random animal: https://placeimg.com/"+x+"/"+y+"/animals");
		});
	}

	googleCommand(msg) {
		var req = "<http://lmgtfy.com/?q="+msg.content.substr(msg.content.indexOf(" ") + 1)+">";
		req = req.replace(/ /g,"%20");
		msg.channel.send(req);
		msg.delete();
	}

	pingCommand(msg) {
		var self = this;
		self.bot.checkCooldown("ping", function(){
			self.bot.addCooldown("ping", 60);
			msg.react("🇵").then(function(){
				msg.react("🇴").then(function(){
					msg.react("🇳").then(function(){
						msg.react("🇬").then().catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		});
	}
}
module.exports = jokesModule;
