module.exports = options => (
`{
    "name": "${options.project_name}",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "express": "4.16.3",
        "next": "6.0.3",
        "react": "16.3.2",
        "react-dom": "16.3.2",
        ${options.redux ? '"redux": "4.0.0"' : ''}
    },
    "dev-dependencies": {
        ${options.redux ? '"redux-devtools-extension": "2.13.2"' : ''}
    }
}`);