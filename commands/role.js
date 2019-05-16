exports.run = async (client, message, args, level) => {

  const role = message.member.roles.has("382703090455019521") ? "Council"
    : message.member.roles.has("382705157709758466") ? "Moderator"
    : message.member.roles.has("382710482232016896") ? "Contributor"
    : message.member.roles.has("519713756759195676") ? "Welcomer"
    : undefined;

  if (!role) return;

  const roles = {};
  // 519713756759195676
  roles.Welcomer = {
    "382710741725347850": ["Trimmed Completionist"],
    "382711127718494210": ["Master Quest Cape"],
    "382711161713590272": ["Completionist"],
    "383563659391270912": ["Maxed"],
    "403987258404765697": ["Hardcore Ironman"],
    "403987115743903786": ["Ironman"],
    "485804031449497601": ["Clan Member"]
  };
  // 382710482232016896
  roles.Contributor = {
    "399992483154755585": ["Achievement Master"],
    "400738052512940043": ["Master of All"],
    "400739452663758850": ["Insane Final Boss"],
    "408381118920917012": ["Max EXP"],
    "409917475157704704": ["Virtually Maxed"],
    "436706353856249869": ["Team Player"],
    ...roles.Welcomer
  };
  // 382705157709758466
  roles.Moderator = {
    "399291635898253333": ["Affiliate"],
    "382955253764718592": ["Jagex Moderator"],
    "399992283488845845": ["Verified Streamer"],
    "415885607626211338": ["Reaper Crew"],
    "382711210044555264": ["True Trim"],
    "426857028221140994": ["True Achievement Master"],
    "399992602658603008": ["Insane Achievement Master"],
    ...roles.Contributor
  };
  // 382703090455019521
  roles.Council = {
    "382705157709758466": ["Moderator"],
    "382710482232016896": ["Contributor"],
    "452447822353268737": ["Reaper Coordinator"],
    "456091063703044106": ["AHelper"],
    "519713756759195676": ["Welcomer"],
    "431238109817208842": ["GaMeBrEaKeR"],
    "431238030716698626": ["Achievement Champion"],
    ...roles.Moderator
  };

  const send = msg => message.channel.send(msg);
  const guild = client.guilds.get("382696689812766720");
  const log = guild.channels.get("547042848609140737");
  const member = message.mentions.members.first();
  if (!args[0]) return send("Please specify a user to update roles for.");
  if (!/<@!?\d{17,18}>/g.test(args[0]) || !member) return send("Please mention a valid user to update roles for.");
  const data = message.content.split(", ").map(d => d.trim());
  const action = data[0].split(" ")[2];
  const apply = data[0].split(" ")[3] ? [data[0].split(" ")[3], ...data.slice(1)] : undefined;
  if (!["add", "a", "remove", "r"].includes(action)) return send("Please specify a valid action. **(add/remove)**");
  if (!apply) return send("Please specify one or more roles to update for the user.");
  const num = apply.length;
  const range = roles[role];
  const roleIDs = [];
  const roleNames = [];
  let roleWarn = "";

  // add case insensitivity to role check

                 // apply, range
  const getRoles = (app, rng) => {
    app.forEach(a => {
      Object.getOwnPropertyNames(rng).forEach(r => {
        if (rng[r].includes(a)) {
          roleIDs.push(r);
          roleNames.push(guild.roles.get(r).name);
        }
        // add check for user having roles already
        else {
          // this should not check for every role in $range
          roleWarn += `ERROR: **${a}** is not a valid role.\n`;
        }
      });
    });
  }

  if (["add", "a"].includes(action)) {
    if (roleNames.length > 1) {
      // addRoles
      getRoles(apply, range);
      send(roleWarn);
      member.addRoles(roleIDs, `${message.member.user.tag} used the role command.`);
      log.send(`${message.member.id}: **${message.member.user.tag}** gave the following roles to ${member}: **${roleNames.join("**, **")}**`);
    }
    else if (roleNames.length == 1) {
      // addRole
      getRoles(apply, range);
      send(roleWarn);
      member.addRole(roleIDs[0], `${message.member.user.tag} used the role command.`);
      log.send(`${message.member.id}: **${message.member.user.tag}** gave the following role to ${member}: **${apply}**`);
    }
  }

  if (["remove", "r"].includes(action)) {
    if (roleNames.length > 1) {
      // removeRoles
      getRoles(apply, range);
      send(roleWarn);
      member.removeRoles(roleIDs, `${message.member.user.tag} used the role command.`);
      log.send(`${message.member.id}: **${message.member.user.tag}** removed the following roles from ${member}: **${roleNames.join("**, **")}**`);
    }
    else if (roleNames.length == 1) {
      // removeRole
      getRoles(apply, range);
      send(roleWarn);
      member.removeRole(roleIDs[0], `${message.member.user.tag} used the role command.`);
      log.send(`${message.member.id}: **${message.member.user.tag}** removed the following role from ${member}: **${apply}**`);
    }
  }

};



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r"],
  permLevel: "Bot Admin",
  guilds: ["382696689812766720"]
};

exports.help = {
  name: "role",
  category: "System",
  description: "Update roles for members.",
  usage: "role <add/a/remove/r> <user> <role(s)>"
};
