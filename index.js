const vorpal = require('vorpal')();
var mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const dirname = __dirname.split('\\');
let project_name = dirname[dirname.length - 1];

// Templates
const json = require('./templates/package');

const options = {
    project_name,
    dynamic: false,
    redux: false,
    multilang: false,
    available_lang: ['fr'],
    ga: true,
    ga_api_key: 'UA-XXXXXXXX-X',
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
    .action( async function (args, done) {
        try {

            // Project name
            const {project_name} = await this.prompt({
                message: 'Project name :',
                name: 'project_name',
                default: options.project_name
            });

            if( typeof project_name === 'string' && project_name.length > 0) {
                options.project_name = project_name;
            }

            // Project type
            const { dynamic } = await this.prompt({
                message: 'Is this a static project? : ',
                type: 'confirm',
                name: 'dynamic',
                default: true
            });
            options.dynamic = !dynamic;

            if(options.dynamic) {
                // Redux
                const { redux } = await this.prompt({
                    message: 'User redux a state management ? ',
                    type: 'confirm',
                    name: 'redux',
                    default: options.redux
                });
                options.redux = redux;
            }

            // Language
            const { multilang } = await this.prompt({
                message: 'Does your site has multiple language? ',
                type: 'confirm',
                name: 'multilang',
                default: options.multilang
            });
            options.multilang = multilang;

            if(options.multilang) {
                // Available Language
                const { available_lang } = await this.prompt({
                    message: 'Which language would you like to support? ',
                    type: 'checkbox',
                    name: 'available_lang',
                    choices: ['fr', 'en', 'de', 'it'],
                    default: options.available_lang
                });
                options.available_lang = available_lang;
            }

            // Google Analytics
            const { ga } = await this.prompt({
                message: 'Add Google Analytics? ',
                type: 'confirm',
                name: 'ga',
                default: options.ga
            });
            options.ga = ga;

            if(options.ga) {
                // Google Analytics API key
                let pass = false;

                do {
                    const { ga_api_key } = await this.prompt({
                        message: 'What is your api? ',
                        name: 'ga_api_key',
                        default: options.ga_api_key
                    });

                    const reg = /^UA-\d{8}-\d$/;
                    if(reg.test(ga_api_key)) {
                        options.ga_api_key = ga_api_key;
                        pass = true;
                    } else if( ga_api_key === options.ga_api_key) {
                        pass = true;
                    }
                } while (!pass)
            }

            // Sitemap
            const { sitemap } = await this.prompt({
                message: 'Do you want to add a sitemap? ',
                type: 'confirm',
                name: 'sitemap',
                default: options.sitemap
            });
            options.sitemap = sitemap;

            // Test suit
            const { test_suit } = await this.prompt({
                message: 'Would you like to add a test suit? ',
                type: 'confirm',
                name: 'test_suit',
                default: options.test_suit
            });
            options.test_suit = test_suit;

            if(options.test_suit) {
                const { test_engine } = await this.prompt({
                    message: 'Which test engine do you use? ',
                    type: 'list',
                    name: 'test_engine',
                    choices: ['jest', 'mocha'],
                    default: options.test_engine
                });
                options.test_engine = test_engine;
            }

            // Post css
            const { post_css } = await this.prompt({
                message: 'Would you like to add post css? ',
                type: 'confirm',
                name: 'post_css',
                default: options.post_css
            });
            options.post_css = post_css;

            if(options.post_css) {
                const { post_css_engine } = await this.prompt({
                    message: 'Which post css engine do you use? ',
                    type: 'list',
                    name: 'post_css_engine',
                    choices: ['scss', 'less'],
                    default: options.post_css_engine
                });
                options.post_css_engine = post_css_engine;
            }

            // Docker
            const { docker } = await this.prompt({
                message: 'Will you use docker? ',
                type: 'confirm',
                name: 'docker',
                default: options.docker
            });
            options.docker = docker;

            this.log(options);
        } catch(e) {

        }
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