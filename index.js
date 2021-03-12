const discord = require('discord.js');

const client = new discord.Client();

let prefix = "?";
const ExtensionAPI = require('./api/init')
const { exec } = require("child_process");
function system(std) {
    
    exec(std, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
const settings = {
    /**
    Sends Logs to `logchannel`
     @since 1.2021
     */
    SendLogs: false,
    /**
     * LogChannel to send logs to.
     * @since 1.2021
     * @param channel inherits String
     */
    logchannel: null,
    AllowPrefixChanges: false,
    muterole: null,
    verifyrole: null,
    verified_required_to_use_commands: false
}






client.on('message', msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const c = msg.channel
    
    const author = msg.author
    const author_member = msg.member
    const message = msg;
    function add_role(role) {
        author_member.roles.add(role).then(() => {
            console.log("[DEBUG] Verified User")
        });
    }
    function send_message(msg) {
        c.send(msg).then(() => {
            console.log("[DB] Sent message.")
        })
    }
    function send_direct_message(tp, msg) {
        tp.send(msg)
    }
    function react(emoji) {
        msg.react(emoji).then(() => {
            console.log("[DEBUG] Reacted.")
        })
    }
    if (msg.author === client.user) return;
    if (msg.content.startsWith(prefix) && settings.verified_required_to_use_commands === true && msg.member.roles.cache.has(settings.verifyrole) || msg.content.startsWith(prefix) && settings.verified_required_to_use_commands === false) {
        if (command === "help") {
            if (!args[0]) {
                react("✅")
                send_direct_message(msg.author, "`?help` Shows this menu\n\n`?prefix` Changes the prefix.\n\n" +
                    "`?config` Changes the configurations.\n\n" +
                    "`?mod` Shows moderator Tools\n\n" +
                    "`?kick` Kick a user.\n\n" +
                    "`?ban` Ban a user.\n\n`?mute` Mute a user.\n\n" +
                    "`?muterole {role}` Sets the mute role for the `mute` command.\n\n" +
                    "`?command create` Creates a new JavaScript file for custom commands.\n\n" +
                    "`?verify` Verifies user if `verifyrole` is set.\n\n" +
                    "`?verifyrole {role} ||| ?config change verifyrole {role}` Sets the Verify role users get when they verify.\n\n" +
                    "`?extension clone {extension} ||| ?download {extension}` Uses git VCS To download an extension from the MPR (Myno Plugin Repository" +
                    "\n\n" +
                    "Copyright Kai-Builder, MiGames 2021.");
            
            
            }
        } else if (command === "command") { // ?command create code {code} ||| ?command create template {on_run_code}
            let action = args[0];
            if (action === "create_loader") {
                let on_loadname = args[1];
                let on_load_code = args.slice(2).join('|')
                send_message("OnLoadCode: " + on_load_code + "\nFunction name? " + on_loadname )
            }
        } else if (command === "verifyrole") {
        
            if (!args[0])
                send_message("You have to specify a role first, " + author_member.displayName)
            else {
                settings.verifyrole = args[0]
                send_message("Made `" + args[0] + "` a child of `verifyrole`")
            }
        }
        else if (command === "verify" && settings.verifyrole) {
            try {
                let role = msg.member.guild.roles.cache.find(na => na.name === settings.verifyrole);
                add_role(role)
                send_message("Verified!");
            }
            catch (e) {
                send_message("Failed to verify you :(");
            }
        }
        else if (command === "config") { // ?config change verifyrole
            if (!args[0]) send_message("You have to specify an action first.")
            if (!args[1]) send_message("You have to specify a setting!")
            if (!args[2]) send_message("You need to specify a value!")
            else if (args[0] === "change") {
                try {
                    settings[args[1]] = args[2]
                    send_message("Set " + args[1] + " as an alias for " + args[2])
                }
                catch (e) {
                    send_message("Invalid Setting Setup.")
                }
            }
            
        }
        else if (command === "source") {
        
        }
        else {
            try {
                const commandx = require(`./commands/${command}.js`)
                commandx.init(msg.channel)
                commandx.run(msg.channel, command, msg.author, args);
            }
            catch (e) {
                console.log(command + " is not a valid command. " + e)
            }
        }
    }
    else {
        send_message("You do not have permission to do that!")
    }
})
client.on('ready', () => {
    setInterval(() => client.user.setActivity(prefix + "help", {type: "LISTENING"}), 3000);
})
client.login(require('./config.json').token).then(() => {
    console.log("[INIT] Ready!");
   
})
