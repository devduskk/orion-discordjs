const fs = require('fs');
const YAML = require('yaml');
module.exports = function (fileName) {
    return new Promise((resolve) => {
        try {
            resolve(YAML.parse(fs.readFileSync(fileName, 'utf-8')));
        } catch (err) {
            resolve({});
            console.log("ERROR! Debug: " + err);
        }
    })
}
