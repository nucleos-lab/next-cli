const vorpal = require('vorpal')();
var mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const dirname = __dirname.split('\\');
let project_name = dirname[dirname.length - 1];

// Templates
const newClassTemplate = require('../templates/newClassTemplate');


module.exports = (args, v) => {
    self = v;
    self.log("--- creating " + args.type +" " + args.name + " ---");
    if (!fs.existsSync(args.type + "s")) {
        mkdirp('src/' + args.type + "s", function (err) {
            if (err) {this.error(err)}
            else{
                self.log(' directory ' + args.type + ' created')
            }
        });
    }

    if (fs.existsSync(args.type + 's/' + args.name + '.js')) {
        self.log(' files already exists');
    } else{
        self.log(' files created');
        const _newClassTemplate = newClassTemplate({name: args.name});
        if(args.options.class)
        {
            fs.appendFile('src/' + args.type + 's/' + args.name + '.js', _newClassTemplate, function (err) {
                if (err) throw err;
            });
        }
        else
        {
            fs.appendFile('src/' + args.type + 's/' + args.name + '.js', 'component', function (err) {
                if (err) throw err;
            });
        }
    }
}