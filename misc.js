class miscModule {
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
			trigger: "!restart",
			function: self.restartCommand,
			permCheck: self.perms.isInAdminRoom
		});
		self.commands.addCommand({
			trigger: "!listgames",
			function: self.listGamesCommand,
			permCheck: self.perms.isInAdminRoom
		});
	}

	restartCommand(msg) {
		var self = this;
		self.bot.logMessage(msg.guild, "Restarting 👋").then(function(){
			process.exit(0);
		});
	}

	listGamesCommand(msg) {
		var self = this;
		self.bot.dclient.guilds.map(function(guild) {
			var allMembers = guild.members;
			var playing = {};
			var streaming = {};
			var memberStats = {};
			allMembers.map(function(member){
				if (member.presence.game) {
					memberStats[member.id] = member.presence.game.name;
					playing[member.presence.game.name] = ++playing[member.presence.game.name] || 1;
					if (member.presence.game.streaming) {
						streaming[member.presence.game.name] = ++streaming[member.presence.game.name] || 1;
					}
				}
			});
			var msg = [];
			for (var x in playing) {
				msg.push(x+": "+playing[x]+" player(s)");
			}
			self.bot.logMessage(guild, msg);

		});
	}
}
module.exports = miscModule;
