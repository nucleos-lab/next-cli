const vorpal = require('vorpal')();
var mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const dirname = __dirname.split('\\');
let project_name = dirname[dirname.length - 1];

const options = {
    project_name,
    static: true,
    redux: false,
    multilang: false,
    available_lang: ['fr'],
    ga: true,
    ga_api_key: 'GA_XXXXXX',
    sitemap: true,
    test_suit: false,
    test_engine: 'jest',
    post_css: true,
    post_css_engine: 'scss',
    docker: true,
    // heroku: false,
};


function createFile(args, v) {
    self = v;
    self.log("--- creating " + args.type +" " + args.name + " ---");
    if (!fs.existsSync(args.type + "s")) {
        mkdirp(args.type + "s", function (err) {
            if (err) {this.error(err)}
            else{
                self.log(' directory ' + args.type + ' created')
            }
        });
    }

    if (fs.existsSync(args.type + 's/' + args.name + '.js')) {
        self.log(' files already exists');
    } else{
        self.log(' files created')
        fs.appendFile(args.type + 's/' + args.name + '.js', 'Hello content!', function (err) {
            if (err) throw err;
        });
    }
}

vorpal
    .command('init', 'Initialize a new project')
    .action( function (args, done) {
        this.prompt();
    });

vorpal
    .command('create <type> [name]', 'Add a new react element to the project')
    .action( function (args, done) {
        const self = this;
        if(args.type === "page" || args.type ===  "component" || args.type ===  "screen"){
           createFile(args, self)
        }
        else {
            this.log("type non connu");
        }
    });

vorpal
    .command('add <type>', 'Add a new element to the project');


vorpal
    .delimiter('next-cli> ')
    .show();