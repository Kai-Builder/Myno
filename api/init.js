// Loads an extension
module.exports = {
    LoadExtensionHandler: function load_extension(id)
{
    const extension = require(`${id}`)
    extension.init()
    extension.run()
}

}