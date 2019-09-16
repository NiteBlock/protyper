const fs = require("fs")
const path = require("path")

const clearLogger = () => {
    var files = fs.readdirSync(path.join(process.cwd(), '/logs'));
    files.forEach(element => {
        if(element.endsWith(".log")){
        try { fs.unlinkSync(path.join(__dirname, "/logs/", element)); console.log("deleted " + element) }
        catch (ex) {console.log("failed to delete file " + element)}
        }

    });
}
if (require.main == module.exports){ module.exports = clearLogger} else {clearLogger()}