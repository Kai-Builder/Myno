const discord = require('discord.js');
// -*sqlite-nodb*- \\
const client = new discord.Client();
const rimraf = require("rimraf");
let prefix = "?";
const ExtensionAPI = require('./api/init')
const { exec } = require("child_process");
const fs = require('fs')
function dir(pathNSResolver) {
    fs.mkdirSync(pathNSResolver);
}
function ManipulateJSON(pathEvaluatorBase, filename) {
    fs.writeFile(filename, JSON.stringify(pathEvaluatorBase), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(pathEvaluatorBase));
        console.log('writing to ' + pathEvaluatorBase);
    });
}
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
const settingsb = {
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
    verified_required_to_use_commands: false,
    max_give_rep: 9999
}
function iter(array, T) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === T)
            return true
    }
}
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Bot listening at http://localhost:${port}`));

let speed = 0.6;


basic_dm = false;
client.on('message', msg => {
    if (msg.author === client.user) return;
    let args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const c = msg.channel
    
    const author = msg.author
    
    author.basic_dm = false;
    const author_member = msg.member
    const message = msg;
    
    
    
    author.rep = 0
    discord.User.basic_dm = false
    discord.User.prototype.basic_dm = false
    
    discord.User.prototype.reputation = 0;
    discord.User.prototype.points = 0;
    discord.GuildMember.prototype.reputation = 0;
    discord.GuildMember.prototype.points = 0;
    author.basic_dm = false
    function makeChannel(c, d="No Reason."){
        let server = require('./port.json').server
        let stS = client.guilds.cache.find(k => k.name === server)
        
        stS.channels.create(c, { reason: d , nsfw: false})
            .then(console.log)
            .catch(console.error);
    }
    // Connection
    if (msg.guild === null) {
        send_message("Requesting...")
        makeChannel()
    }
    
    author.is_afk = false
   
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
    
   
    try {
        if (msg.content.startsWith(prefix) || msg.content.startsWith(require('./caches/' + author_member.guild.name + "/prefix.json").prefix) && fs.existsSync('./caches/' + author_member.guild.name + '/prefix.json')) {
            console.log("message starts with server prefix or prefix")
            try {
                require("./caches/" + msg.member.guild.name + "/configurations/config.json")
            }catch (e){
                console.log("The Settings for the server are not working. " + e)
            }
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
                        "`?run` Runs a system command in server cache. View `?cache` To learn how.\n\n" +
                        "`?cache` Creates a server in ServerCache.\n\n" +
                        "`?prefix` Changes the current \"?\" symbol to another 1 character constant. (!, > < @ # $ % ^ & * )\n\n" +
                        "`?push || ?commit || ?updateconfig` Updates the server config and gets it even.\n\n" +
                        "`?web_download e` Downloads an extension from Github Separated by :. API Problems :(\n\n" +
                        "Copyright Kai-Builder, Other Lambda contributors. . .");
                
                
                }
            } else if (command === "command") { // ?command create code {code} ||| ?command create template {on_run_code}
                let action = args[0];
                if (action === "create_loader") {
                    let on_loadname = args[1];
                    let on_load_code = args.slice(2).join('|')
                    send_message("OnLoadCode: " + on_load_code + "\nFunction name? " + on_loadname)
                }
            } else if (command === "verifyrole") {
            
                if (!args[0])
                    send_message("You have to specify a role first, " + author_member.displayName)
                else {
                    require("./caches/" + msg.member.guild.name + "/configurations/config.json").verifyrole = args[0]
                    send_message("Made `" + args[0] + "` a child of `verifyrole`")
                }
            } else if (command === "verify" && require("./caches/" + msg.member.guild.name + "/configurations/config.json").verifyrole) {
                try {
                    let role = msg.member.guild.roles.cache.find(na => na.name === require("./caches/" + msg.member.guild.name + "/configurations/config.json").verifyrole);
                    add_role(role)
                    send_message("Verified!");
                } catch (e) {
                    send_message("Failed to verify you :(");
                }
            } else if (command === "config" || command === "settings" || command === "set") { // ?config change verifyrole
                if (!args[0]) send_message("You have to specify an action first.")
                if (!args[1]) send_message("You have to specify a setting!")
                if (!args[2]) send_message("You need to specify a value!")
                else if (args[0] === "change") {
                    try {
                        require("./caches/" + msg.member.guild.name + "/configurations/config.json")[args[1]] = args[2]
                        send_message("Set " + args[1] + " as an alias for " + args[2])
                    } catch (e) {
                        send_message("Invalid Setting Setup.")
                    }
                }
            
            } else if (command === "rep" || command === "points") {
                if (args[0] === "give") {
                    let user = msg.mentions.members.first();
                    
                    if (parseInt(args[2]) > require("./caches/" + msg.member.guild.name + "/configurations/config.json").max_give_rep)
                        send_message("Chill out on the points! The maximum for this server is `" + require("./caches/" + msg.member.guild.name + "/configurations/config.json").max_give_rep + "`")
                    else
                        user.reputation += parseInt(args[2]);
                        send_message(args[2] + " reputation has been added to " + args[1] + "'s profile.")
                }
                else if (args[0] === "show") {
                    let user = msg.mentions.members.first();
                    if (user.reputation === 0)
                        send_message(user.displayName + " has " + user.reputation + " Points / Rep.  They need to start earning!")
                    else if (user.reputation < 10 && user.reputation > 5)
                        send_message(user.displayName + " has " + user.reputation + " Points / Rep. Almost at 10!")
                    else
                        send_message(user.displayName + " has " + user.reputation + " Points / Rep. ")
                }
            }
            else if (command === "afk") {
                author.is_afk = true
                afk_ppl.push(msg.author.username);
                send_message("Your status has been set as `afk`.")
            }
            else if (command === "unafk") {
                author.is_afk = false
                
                send_message("your status has been set as `not afk`.")
            }
            else if (command === "run") {
                try {
                    send_message('Running `cd caches` .')
                    system("cd caches")
                    send_message("Running `cd " + msg.member.guild.name)
                    system('cd ' + msg.member.guild.name)
                    send_message("Running Your Command in ~/Cache/" + msg.member.guild.name + "/")
                    system(args.slice(0).join(' '))
                }catch (e) {
                    send_message("Your Server Is not cached :( Cache it now by typing `?cache`.")
                }
            }
        else if (command === "source") {
                send_message("Source Repository can be found on github: https://www.github.com/Kai-Builder/Myno\n")
            } else if (command === "cache") {
                if (!fs.existsSync('./caches/' + msg.member.guild.name)) {
                    let scache = "./caches/" + msg.member.guild.name
                    fs.mkdirSync(scache);
                    dir(scache + "/commands")
                    dir(scache + "/plugins")
                    dir(scache + "/configurations")
                    fs.writeFileSync(scache + '/prefix.json', "{\n" +
                        "  \"prefix\": \"?\"\n" +
                        "}")
                    fs.writeFileSync(scache + '/configurations/config.json', JSON.stringify(settingsb))
                } else {
                    send_message('Your server is already cached! Type ?help to learn about server config.')
                }
            } else if (command === "invite") {
                send_direct_message(msg.author, "Want to invite me to your server? Be sure to get permission first: https://discord.com/oauth2/authorize?client_id=819769171024805908&scope=bot&permissions=8")
            }
            else if (command === "prefix") {
                try {
                    const spref = require('./caches/' + msg.member.guild.name + "/prefix.json")
                    spref.prefix = args[0]
                    ManipulateJSON(spref, './caches/' + msg.member.guild.name + '/prefix.json');
                    send_message("Updated Server Prefix to `" + args[0] + "`. If you ever get lost and can't remember your prefix, I've made a secondary prefix that starts with `?`. ")
                }
                catch (e) {
                    send_message("Your server Is not cached. Cache it now by running `(serverprefix)cache` or ?cache. Then, Type ?help for more information on server cache. Error: " + e)
                }
            }
            else if (command === "updateconfig" || command === "push_config" || command === "push" || command === "commit") {
                ManipulateJSON(require("./caches/" + msg.member.guild.name + "/configurations/config.json"), './caches/' + msg.member.guild.name + '/configurations/config.json')
                send_message("Updated ServerConfig! It may take a while to show up here, But don't worry! It'll fix up in time.")
            }
            else if (command === "web_download") {
                send_message("Downloading extension " + args[0])
                system("git clone " + args[0] + " \"caches/" + author_member.guild.name + "/plugins/" + args[0] + "\"")
            }
           
            else {
                try {
                    const commandx = require(`./commands/${command}.js`)
                    commandx.init(msg.channel)
                    commandx.run(msg.channel, command, msg.author, args);
                } catch (e) {
                    console.log(command + " is not a valid system command. Checking For Server Custom Now.")
                    try {
                        require(`./caches/${msg.member.guild.name}/commands/${command}.js`).init(msg.channel)
                        require(`./caches/${msg.member.guild.name}/commands/${command}.js`).run(msg.channel, command, msg.author, args);
                    } catch (e) {
                        console.log(command + " is not a valid system nor server command. Or server is not cached.")
                    }
                }
            }
        
        }
    }
    catch (e) {
        if (msg.content.startsWith("?")) {
            send_message("Cache Myno First! This gives myno the ability to give users a full experience such as:\n- Custom Prefixes\n- Custom Server Commands\n- Server Plugins\n- And More!")
        }
    }
   
})
client.on('ready', () => {
    setInterval(() => client.user.setActivity(prefix + "help", {type: "LISTENING"}), 3000);
})
client.login(require('./config.json').token).then(() => {
    console.log("[INIT] Ready!");
   
})
