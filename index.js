const vorpal = require('vorpal')();
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

vorpal
    .command('init', 'Initialize a new project')
    .action( function (args, done) {
        this.prompt();
    });

vorpal
    .command('create <type>', 'Add a new react element to the project');

vorpal
    .command('add <type>', 'Add a new element to the project');


vorpal
    .delimiter('next-cli> ')
    .show();