
// I've been working in the C Community for ages and let me tell you this has been such a reliever
module.exports = {
    init: function onInitialize(PluginDefault) {
        console.log("Loaded")
    },
    run: function onCommandRun(channel, ICommandIO, IMessageAuthor, ArrayArguments) {
        channel.send(ArrayArguments.slice(0).join(' '))
    }
}
